import { createS3Client } from "@/lib/aws"
import { PutObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3"
import { AWS_BUCKET_NAME } from "@/lib/config"
import { 
  ProgressTracker,
  UploadStatus,
  SelectedPhoto
} from "@/lib/types"
import { generateUUID, getVideoDuration, getVideoThumbnailBlob } from "@/lib/utils"

// Create S3 client - shared between files
export const s3 = createS3Client()

// Debug logging helper function
export const createLogger = (setDebugMessages: React.Dispatch<React.SetStateAction<string[]>>) => {
  return (message: string) => {
    console.log(message)
    
    // Only add to debug messages if it's an error or warning
    if (message.includes("❌") || message.includes("⚠️")) {
      setDebugMessages(prev => [...prev, message])
    }
  }
}

// Update photo status helper
export const createPhotoStatusUpdater = (
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>
) => {
  return (index: number, status: UploadStatus, progress: number, errorMessage?: string) => {
    setSelectedPhotos(prev => 
      prev.map((photo, i) => 
        i === index 
          ? { ...photo, status, progress, errorMessage } 
          : photo
      )
    )
  }
}

// Update progress tracker
export const updateProgressTracker = (
  selectedPhotos: SelectedPhoto[],
  setProgressTracker: React.Dispatch<React.SetStateAction<ProgressTracker>>
) => {
  if (selectedPhotos.length === 0) {
    setProgressTracker({
      totalFiles: 0,
      filesComplete: 0,
      filesUploading: 0,
      filesProcessing: 0,
      filesWithError: 0,
      overallProgress: 0
    })
    return
  }

  const filesUploading = selectedPhotos.filter(p => p.status === 'uploading').length
  const filesProcessing = selectedPhotos.filter(p => p.status === 'processing').length
  const filesComplete = selectedPhotos.filter(p => p.status === 'complete').length
  const filesWithError = selectedPhotos.filter(p => p.status === 'error').length
  
  // Calculate overall progress as a percentage
  const totalProgress = selectedPhotos.reduce((sum, photo) => sum + photo.progress, 0)
  const overallProgress = Math.round((totalProgress / selectedPhotos.length) * 100) / 100

  setProgressTracker({
    totalFiles: selectedPhotos.length,
    filesComplete,
    filesUploading,
    filesProcessing, 
    filesWithError,
    overallProgress
  })
}

// Process files for upload
export const processFiles = async (
  files: File[],
  cognitoUsername: string,
  updatePhotoStatus: (index: number, status: UploadStatus, progress: number, errorMessage?: string) => void,
  log: (message: string) => void
): Promise<SelectedPhoto[]> => {
  log(`📁 Files selected: ${files.length}`)
  
  if (!cognitoUsername) {
    log("❌ Missing Cognito Username")
    throw new Error("Missing Cognito Username")
  }

  try {
    log("🔄 Starting file processing...")
    
    // First, add files to state with pending status
    const initialPhotos = files.map(file => {
      const type: string = file.type
      const fileExt = file.name.split('.').pop() || "jpg"
      const uuidFileName = `${generateUUID()}.${fileExt}`
      
      return {
        fileName: uuidFileName,
        s3PreviewUrl: URL.createObjectURL(file), // Use local object URL initially
        type,
        size: file.size,
        status: 'pending' as UploadStatus,
        progress: 0
      } as SelectedPhoto
    })
    
    // Array to collect processed photos info
    const processedPhotos: SelectedPhoto[] = []
    
    // Process each file one by one, updating its status as we go
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const photo = initialPhotos[i]
      
      try {
        updatePhotoStatus(i, 'uploading', 0.1)
        log(`📝 Processing file ${i + 1}/${files.length}: ${file.name} (${file.type})`)
        
        const type: string = file.type
        const uuidFileName = photo.fileName
        log(`🆔 Generated UUID filename: ${uuidFileName}`)
        
        const baseKey = type.startsWith("video")
          ? `Input/Video/${uuidFileName}`
          : `Input/Image/${uuidFileName}`
        
        // Generate S3 key locations
        const tempS3Key = `temp/${baseKey}`
        
        // Convert file to ArrayBuffer for S3 upload
        const arrayBuffer = await file.arrayBuffer()
        log(`📦 Converted file to ArrayBuffer`)
        updatePhotoStatus(i, 'uploading', 0.3)
        
        // Upload to temp folder
        try {
          log(`⬆️ Uploading to ${tempS3Key}...`)
          await s3.send(new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: tempS3Key,
            Body: new Uint8Array(arrayBuffer),
            ContentType: file.type || "application/octet-stream"
          }))
          log(`✅ Upload to ${tempS3Key} successful`)
          updatePhotoStatus(i, 'uploading', 0.6)
        } catch (uploadErr) {
          log(`❌ S3 upload error: ${String(uploadErr)}`)
          updatePhotoStatus(i, 'error', 0, String(uploadErr))
          continue
        }
        
        // Create S3 preview URL
        const s3PreviewUrl = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${tempS3Key}`
        log(`🔗 Generated S3 preview URL: ${s3PreviewUrl}`)
        
        let duration: number | null = null
        let thumbnailDataKey: string | null = null
        let thumbnailSize: number | null = null
        let tempThumbnailKey: string | null = null

        if (type.startsWith("video")) {
          updatePhotoStatus(i, 'processing', 0.7)
          try {
            log(`🎬 Processing video metadata...`)
            duration = Math.round(await getVideoDuration(file))
            log(`⏱️ Video duration: ${duration} seconds`)
            
            log(`🎬 Generating video thumbnail...`)
            const thumbnailBlob = await getVideoThumbnailBlob(file)
            
            // Extract the base filename without extension
            const baseFileName = uuidFileName.split('.').slice(0, -1).join('.');
            
            // Set the thumbnail key with the proper jpg extension
            thumbnailDataKey = `Input/Image/${baseFileName}-thumbnail.jpg`;
            tempThumbnailKey = `temp/${thumbnailDataKey}`;
            
            thumbnailSize = Math.round(thumbnailBlob.size)
            log(`🎬 Thumbnail generated: ${thumbnailSize} bytes, path: ${thumbnailDataKey}`)
            updatePhotoStatus(i, 'processing', 0.8)
        
            // Convert thumbnail blob to ArrayBuffer
            const thumbnailArrayBuffer = await thumbnailBlob.arrayBuffer()
            log(`📦 Converted thumbnail to ArrayBuffer`)
            
            log(`⬆️ Uploading thumbnail to ${tempThumbnailKey}...`)
            await s3.send(new PutObjectCommand({
              Bucket: AWS_BUCKET_NAME,
              Key: tempThumbnailKey,
              Body: new Uint8Array(thumbnailArrayBuffer),
              ContentType: "image/jpeg"
            }))
            log(`✅ Thumbnail upload successful`)
            updatePhotoStatus(i, 'processing', 0.9)
          } catch (videoErr) {
            log(`⚠️ Video processing error: ${String(videoErr)}`)
            // Don't fail the whole upload if just the thumbnail fails
          }
        }

        // Update the photo status to complete
        updatePhotoStatus(i, 'complete', 1)
        
        // Add processed photo info to our collection
        processedPhotos.push({
          fileName: uuidFileName,
          s3PreviewUrl, 
          type,
          size: file.size,
          duration,
          thumbnailDataKey,
          thumbnailSize,
          tempKey: tempS3Key,
          tempThumbnailKey,
          status: 'complete',
          progress: 1
        })
        
        log(`✅ File ${i + 1} processing complete`)
      } catch (fileErr) {
        log(`❌ Error processing file ${i + 1}: ${String(fileErr)}`)
        updatePhotoStatus(i, 'error', 0, String(fileErr))
      }
    }
  
    log(`✅ All files processed`)
    
    // Revoke object URLs to prevent memory leaks
    initialPhotos.forEach(photo => {
      if (photo.s3PreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(photo.s3PreviewUrl)
      }
    })
    
    return processedPhotos
  } catch (error) {
    log(`❌ Fatal error in processFiles: ${String(error)}`)
    throw error
  }
}

// Move files from temp to public S3 location
export const moveFilesToPublic = async (
  validPhotos: SelectedPhoto[],
  updateProgress: (progress: number) => void,
  log: (message: string) => void
): Promise<void> => {
  log("🔄 Starting to copy files from temp to public...")
  
  let completedMoves = 0
  const totalMoves = validPhotos.length
  
  for (let index = 0; index < validPhotos.length; index++) {
    const photo = validPhotos[index]
    log(`📝 Processing photo ${index + 1}/${validPhotos.length}: ${photo.fileName}`)
    
    if (photo.tempKey) {
      try {
        // Move main file from temp to public
        const publicKey = `public/${photo.tempKey.substring(5)}`
        log(`⬆️ Copying from ${photo.tempKey} to ${publicKey}...`)
        
        await s3.send(new CopyObjectCommand({
          Bucket: AWS_BUCKET_NAME,
          CopySource: `${AWS_BUCKET_NAME}/${photo.tempKey}`,
          Key: publicKey
        }))
        log(`✅ Copy successful`)
        
        // Skip the delete step for now as it's causing issues
        log(`⏩ Skipping deletion of temp files to avoid errors`)
        
        // Move thumbnail if exists
        if (photo.tempThumbnailKey) {
          const publicThumbnailKey = `public/${photo.tempThumbnailKey.substring(5)}`
          log(`⬆️ Copying thumbnail from ${photo.tempThumbnailKey} to ${publicThumbnailKey}...`)
          
          await s3.send(new CopyObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            CopySource: `${AWS_BUCKET_NAME}/${photo.tempThumbnailKey}`,
            Key: publicThumbnailKey
          }))
          log(`✅ Thumbnail copy successful`)
        }
        
        completedMoves++
        // Update progress
        const moveProgress = (completedMoves / totalMoves) * 100
        updateProgress(moveProgress)
      } catch (moveErr) {
        log(`❌ Error copying files: ${String(moveErr)}`)
        throw moveErr
      }
    } else {
      log(`⚠️ Photo ${index + 1} has no tempKey, skipping`)
    }
    
    log(`✅ Photo ${index + 1} processing complete`)
  }
  log("✅ All files copied successfully")
}

// General clear album data function
export const clearAlbumData = (
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>,
  setProgressTracker: React.Dispatch<React.SetStateAction<ProgressTracker>>,
  storageClearKeys: string[] = [],
  log: (message: string) => void
) => {
  log("🧹 Clearing all album data...")
  
  // Clear selected photos from localStorage for any provided keys
  storageClearKeys.forEach(key => {
    localStorage.removeItem(key)
  })
  
  // Also clear any session storage that might be holding state
  storageClearKeys.forEach(key => {
    sessionStorage.removeItem(key)
  })
  
  // Reset states
  setSelectedPhotos([])
  setProgressTracker({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  })
  
  log("✅ Album data cleared successfully")
}
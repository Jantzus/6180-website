import { createS3Client } from "@/lib/s3"
import { PutObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3"
import { AWS_BUCKET_NAME } from "@/lib/config"
import { 
  ProgressTracker,
  UploadStatus,
  SelectedPhoto
} from "@/lib/types"
import { generateUUID, getVideoDuration, createResizedThumbnail, getVideoThumbnailBlob } from "@/lib/utils"

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

// SIMPLIFIED: Update photo status helper - remove complex logging that was causing issues
export const createPhotoStatusUpdater = (
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>
) => {
  return (index: number, status: UploadStatus, progress: number, errorMessage?: string) => {
    console.log(`File ${index + 1}: ${status} - ${Math.round(progress * 100)}%`);
    
    setSelectedPhotos(prev => 
      prev.map((photo, i) => 
        i === index 
          ? { ...photo, status, progress, errorMessage } 
          : photo
      )
    )
  }
}

// SIMPLIFIED: Update progress tracker - keep it simple to avoid blocking
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
  
  // Keep it simple - average progress as percentage
  const totalProgress = selectedPhotos.reduce((sum, photo) => sum + photo.progress, 0)
  const overallProgress = selectedPhotos.length > 0 ? Math.round((totalProgress / selectedPhotos.length) * 100) : 0

  setProgressTracker({
    totalFiles: selectedPhotos.length,
    filesComplete,
    filesUploading,
    filesProcessing, 
    filesWithError,
    overallProgress
  })
}

// SIMPLIFIED: Process files with better error handling and clearer progress steps
export const processFilesBeforeUploadingToS3 = async (
  files: File[],
  cognitoUsername: string,
  updatePhotoStatus: (index: number, status: UploadStatus, progress: number, errorMessage?: string) => void,
  log: (message: string) => void
): Promise<SelectedPhoto[]> => {
  log(`📁 Processing ${files.length} files...`)
  
  if (!cognitoUsername) {
    log("❌ Missing Cognito Username")
    throw new Error("Missing Cognito Username")
  }

  try {
    log("🔄 Starting file processing with original filename preservation...")
    
    // Array to collect processed photos info
    const processedPhotos: SelectedPhoto[] = []
    
    // Process each file one by one, updating its status as we go
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      try {
        log(`📝 Processing file ${i + 1}/${files.length}: ${file.name} (${file.type})`)
        
        // Start processing
        updatePhotoStatus(i, 'processing', 0.1)
        
        const type: string = file.type
        const originalFileName = file.name  // Preserve original filename
        
        // Generate UUID filename for S3 storage (to avoid conflicts and ensure uniqueness)
        const fileExt = file.name.split('.').pop() || "jpg"
        const uuidFileName = `${generateUUID()}.${fileExt}`
        
        log(`🆔 Original filename: ${originalFileName}`)
        log(`🆔 Generated UUID filename for S3: ${uuidFileName}`)
        
        const baseKey = type.startsWith("video")
          ? `Input/Video/${uuidFileName}`
          : `Input/Image/${uuidFileName}`
        
        // Generate S3 key locations
        const tempS3Key = `temp/${baseKey}`
        
        // Extract the base filename without extension
        const baseFileName = uuidFileName.split('.').slice(0, -1).join('.');
        // Set the thumbnail key with the proper jpg extension
        const thumbnailDataKey = `Input/Image/${baseFileName}-thumbnail.jpg`;
        const tempThumbnailKey = `temp/${thumbnailDataKey}`;
        
        let thumbnailBlob: Blob | null = null;
        let thumbnailSize: number | null = null;
        let duration: number | null = null;
        
        // Update progress
        updatePhotoStatus(i, 'processing', 0.3)
        
        // For images, create a resized thumbnail version
        if (type.startsWith("image")) {
          log(`🖼️ Creating resized thumbnail for image...`)
          
          try {
            // Create a Blob from the File to ensure type safety
            const fileBlob = new Blob([file], { type: file.type });
            const resizedBlob = await createResizedThumbnail(fileBlob, 800, 0.6);
            thumbnailBlob = resizedBlob;
            if (thumbnailBlob) {
              thumbnailSize = thumbnailBlob.size;
              log(`🖼️ Thumbnail generated: ${thumbnailSize} bytes, path: ${thumbnailDataKey}`)
            }
          } catch (imageErr) {
            log(`⚠️ Image resize error: ${String(imageErr)}`)
            // Continue without thumbnail if resize fails
          }
        }
        
        // Process video files - extract duration and thumbnail
        if (type.startsWith("video")) {
          try {
            log(`🎬 Processing video metadata...`)
            duration = Math.round(await getVideoDuration(file))
            log(`⏱️ Video duration: ${duration} seconds`)
            
            log(`🎬 Generating video thumbnail...`)
            thumbnailBlob = await getVideoThumbnailBlob(file)
            thumbnailSize = Math.round(thumbnailBlob.size)
            log(`🎬 Thumbnail generated: ${thumbnailSize} bytes, path: ${thumbnailDataKey}`)
          } catch (videoErr) {
            log(`⚠️ Video processing error: ${String(videoErr)}`)
            // Continue without thumbnail if it fails
          }
        }
        
        // Convert original file to ArrayBuffer for S3 upload
        updatePhotoStatus(i, 'uploading', 0.5)
        const arrayBuffer = await file.arrayBuffer()
        log(`📦 Converted file to ArrayBuffer`)
        
        // Upload original file to temp folder
        try {
          log(`⬆️ Uploading to ${tempS3Key}...`)
          await s3.send(new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: tempS3Key,
            Body: new Uint8Array(arrayBuffer),
            ContentType: file.type || "application/octet-stream"
          }))
          log(`✅ Upload to ${tempS3Key} successful`)
          updatePhotoStatus(i, 'uploading', 0.8)
        } catch (uploadErr) {
          log(`❌ S3 upload error: ${String(uploadErr)}`)
          updatePhotoStatus(i, 'error', 0, String(uploadErr))
          continue
        }
        
        // Create S3 preview URL
        const s3PreviewUrl = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${tempS3Key}`
        log(`🔗 Generated S3 preview URL: ${s3PreviewUrl}`)
        
        // Upload thumbnail if we have one (for both images and videos)
        if (thumbnailBlob) {
          try {
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
          } catch (thumbnailErr) {
            log(`⚠️ Thumbnail upload error: ${String(thumbnailErr)}`)
            // Don't fail the whole upload if just the thumbnail fails
          }
        }

        // Update the photo status to complete
        updatePhotoStatus(i, 'complete', 1.0)
        
        // Add processed photo info to our collection
        processedPhotos.push({
          fileName: uuidFileName,  // UUID filename for S3 storage
          originalFileName: originalFileName,  // Original filename from user's system
          s3PreviewUrl, 
          type,
          size: file.size,
          duration,
          thumbnailDataKey,
          thumbnailSize,
          tempKey: tempS3Key,
          tempThumbnailKey,
          status: 'complete',
          progress: 1.0
        })
        
        log(`✅ File ${i + 1} processing complete (original: ${originalFileName}, S3: ${uuidFileName})`)
        
      } catch (fileErr) {
        log(`❌ Error processing file ${i + 1}: ${String(fileErr)}`)
        updatePhotoStatus(i, 'error', 0, String(fileErr))
        
        // Add error photo to maintain index consistency
        processedPhotos.push({
          fileName: file.name,
          originalFileName: file.name,
          s3PreviewUrl: '',
          type: file.type,
          size: file.size,
          status: 'error',
          progress: 0,
          errorMessage: String(fileErr)
        })
      }
    }
  
    log(`✅ All files processed with original filenames preserved`)
    log(`✅ Processing complete: ${processedPhotos.filter(p => p.status === 'complete').length}/${files.length} successful`)
    
    return processedPhotos
  } catch (error) {
    log(`❌ Fatal error in processFilesBeforeUploadingToS3: ${String(error)}`)
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
    log(`📝 Processing photo ${index + 1}/${validPhotos.length}: ${photo.originalFileName || photo.fileName}`)
    
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
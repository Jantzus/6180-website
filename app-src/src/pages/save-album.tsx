import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { PutObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3"

import { BUCKET_NAME, GRAPHQL_ENDPOINT, STORAGE_KEYS } from "@/lib/config"
import { createS3Client } from "@/lib/aws"
import { 
  ProgressTracker,
  UploadStatus,
  LanguageCode,
  SelectedPhoto
} from "@/lib/types"

import { generateUUID } from "@/lib/utils"
import { getVideoDuration, getVideoThumbnailBlob, checkLoginOrRedirect } from "@/lib/utils"
import {  } from "@/lib/languages"

// Create S3 client
let s3 = createS3Client()

// Define file upload status types



// Translation interface
interface Translations {
  // Navigation
  myAlbums: string;
  logOut: string;
  
  // Progress Tracking
  uploadProgress: string;
  overallProgress: string;
  ofComplete: string;
  uploading: string;
  processing: string;
  complete: string;
  failed: string;
  
  // Save Album Progress
  savingAlbum: string;
  movingFiles: string;
  
  // Media info
  video: string;
  image: string;
  error: string;
  remove: string;
  
  // Buttons
  saveAlbum: string;
  savingAlbumProgress: string;
  addMorePhotos: string;
  
  // Username prompt
  enterUsername: string;
  usernameExample: string;
  selectUsername: string;
  selectUsernameDigits: string;
  usernameError: string;
  usernameTakenError: string;
  
  // Photo summary
  photoSelected: string;
  photosSelected: string;
  
  // Debug
  debugLog: string;
}

// Translations for all supported languages
const translations: Record<LanguageCode, Translations> = {
  // English - United States & Generic English
  'en-US': {
    myAlbums: "My Albums",
    logOut: "Log Out",
    uploadProgress: "Upload Progress",
    overallProgress: "Overall Progress",
    ofComplete: "of",
    uploading: "Uploading",
    processing: "Processing",
    complete: "Complete",
    failed: "Failed",
    savingAlbum: "Saving Album",
    movingFiles: "Moving files to permanent storage...",
    video: "Video",
    image: "Image",
    error: "Error",
    remove: "Remove",
    saveAlbum: "Save Album",
    savingAlbumProgress: "Saving Album...",
    addMorePhotos: "Add More Photos",
    enterUsername: "Enter a publicly visible username.",
    usernameExample: "For example, you can use your first name or another name.",
    selectUsername: "Select Username",
    selectUsernameDigits: "Select Username + 6 Digits",
    usernameError: "Public profile usernames can only use English letters, numbers or -.",
    usernameTakenError: "Public profile username already taken. Please choose another one.",
    photoSelected: "photo selected",
    photosSelected: "photos selected",
    debugLog: "Debug Log"
  },
  'en': {
    myAlbums: "My Albums",
    logOut: "Log Out",
    uploadProgress: "Upload Progress",
    overallProgress: "Overall Progress",
    ofComplete: "of",
    uploading: "Uploading",
    processing: "Processing",
    complete: "Complete",
    failed: "Failed",
    savingAlbum: "Saving Album",
    movingFiles: "Moving files to permanent storage...",
    video: "Video",
    image: "Image",
    error: "Error",
    remove: "Remove",
    saveAlbum: "Save Album",
    savingAlbumProgress: "Saving Album...",
    addMorePhotos: "Add More Photos",
    enterUsername: "Enter a publicly visible username.",
    usernameExample: "For example, you can use your first name or another name.",
    selectUsername: "Select Username",
    selectUsernameDigits: "Select Username + 6 Digits",
    usernameError: "Public profile usernames can only use English letters, numbers or -.",
    usernameTakenError: "Public profile username already taken. Please choose another one.",
    photoSelected: "photo selected",
    photosSelected: "photos selected",
    debugLog: "Debug Log"
  },
  // Chinese - Simplified & Generic Chinese
  'zh-CN': {
    myAlbums: "我的相册",
    logOut: "登出",
    uploadProgress: "上传进度",
    overallProgress: "总体进度",
    ofComplete: "共",
    uploading: "上传中",
    processing: "处理中",
    complete: "完成",
    failed: "失败",
    savingAlbum: "保存相册",
    movingFiles: "正在将文件移至永久存储...",
    video: "视频",
    image: "图片",
    error: "错误",
    remove: "删除",
    saveAlbum: "保存相册",
    savingAlbumProgress: "正在保存相册...",
    addMorePhotos: "添加更多照片",
    enterUsername: "输入一个公开可见的用户名。",
    usernameExample: "例如，您可以使用您的名字或其他名称。",
    selectUsername: "选择用户名",
    selectUsernameDigits: "选择用户名 + 6位数字",
    usernameError: "公开个人资料用户名只能使用英文字母、数字或-。",
    usernameTakenError: "公开个人资料用户名已被占用。请选择其他用户名。",
    photoSelected: "张照片已选择",
    photosSelected: "张照片已选择",
    debugLog: "调试日志"
  },
  'zh': {
    myAlbums: "我的相册",
    logOut: "登出",
    uploadProgress: "上传进度",
    overallProgress: "总体进度",
    ofComplete: "共",
    uploading: "上传中",
    processing: "处理中",
    complete: "完成",
    failed: "失败",
    savingAlbum: "保存相册",
    movingFiles: "正在将文件移至永久存储...",
    video: "视频",
    image: "图片",
    error: "错误",
    remove: "删除",
    saveAlbum: "保存相册",
    savingAlbumProgress: "正在保存相册...",
    addMorePhotos: "添加更多照片",
    enterUsername: "输入一个公开可见的用户名。",
    usernameExample: "例如，您可以使用您的名字或其他名称。",
    selectUsername: "选择用户名",
    selectUsernameDigits: "选择用户名 + 6位数字",
    usernameError: "公开个人资料用户名只能使用英文字母、数字或-。",
    usernameTakenError: "公开个人资料用户名已被占用。请选择其他用户名。",
    photoSelected: "张照片已选择",
    photosSelected: "张照片已选择",
    debugLog: "调试日志"
  },
  // French - France & Generic French
  'fr-FR': {
    myAlbums: "Mes Albums",
    logOut: "Déconnexion",
    uploadProgress: "Progression du téléchargement",
    overallProgress: "Progression globale",
    ofComplete: "sur",
    uploading: "Téléchargement",
    processing: "Traitement",
    complete: "Terminé",
    failed: "Échoué",
    savingAlbum: "Enregistrement de l'album",
    movingFiles: "Déplacement des fichiers vers le stockage permanent...",
    video: "Vidéo",
    image: "Image",
    error: "Erreur",
    remove: "Supprimer",
    saveAlbum: "Enregistrer l'album",
    savingAlbumProgress: "Enregistrement de l'album...",
    addMorePhotos: "Ajouter plus de photos",
    enterUsername: "Entrez un nom d'utilisateur visible publiquement.",
    usernameExample: "Par exemple, vous pouvez utiliser votre prénom ou un autre nom.",
    selectUsername: "Sélectionner un nom d'utilisateur",
    selectUsernameDigits: "Sélectionner un nom d'utilisateur + 6 chiffres",
    usernameError: "Les noms d'utilisateur de profil public ne peuvent utiliser que des lettres anglaises, des chiffres ou -.",
    usernameTakenError: "Nom d'utilisateur de profil public déjà pris. Veuillez en choisir un autre.",
    photoSelected: "photo sélectionnée",
    photosSelected: "photos sélectionnées",
    debugLog: "Journal de débogage"
  },
  'fr': {
    myAlbums: "Mes Albums",
    logOut: "Déconnexion",
    uploadProgress: "Progression du téléchargement",
    overallProgress: "Progression globale",
    ofComplete: "sur",
    uploading: "Téléchargement",
    processing: "Traitement",
    complete: "Terminé",
    failed: "Échoué",
    savingAlbum: "Enregistrement de l'album",
    movingFiles: "Déplacement des fichiers vers le stockage permanent...",
    video: "Vidéo",
    image: "Image",
    error: "Erreur",
    remove: "Supprimer",
    saveAlbum: "Enregistrer l'album",
    savingAlbumProgress: "Enregistrement de l'album...",
    addMorePhotos: "Ajouter plus de photos",
    enterUsername: "Entrez un nom d'utilisateur visible publiquement.",
    usernameExample: "Par exemple, vous pouvez utiliser votre prénom ou un autre nom.",
    selectUsername: "Sélectionner un nom d'utilisateur",
    selectUsernameDigits: "Sélectionner un nom d'utilisateur + 6 chiffres",
    usernameError: "Les noms d'utilisateur de profil public ne peuvent utiliser que des lettres anglaises, des chiffres ou -.",
    usernameTakenError: "Nom d'utilisateur de profil public déjà pris. Veuillez en choisir un autre.",
    photoSelected: "photo sélectionnée",
    photosSelected: "photos sélectionnées",
    debugLog: "Journal de débogage"
  },
  // German - Germany & Generic German
  'de-DE': {
    myAlbums: "Meine Alben",
    logOut: "Abmelden",
    uploadProgress: "Upload-Fortschritt",
    overallProgress: "Gesamtfortschritt",
    ofComplete: "von",
    uploading: "Hochladen",
    processing: "Verarbeitung",
    complete: "Abgeschlossen",
    failed: "Fehlgeschlagen",
    savingAlbum: "Album speichern",
    movingFiles: "Dateien werden in den permanenten Speicher verschoben...",
    video: "Video",
    image: "Bild",
    error: "Fehler",
    remove: "Entfernen",
    saveAlbum: "Album speichern",
    savingAlbumProgress: "Album wird gespeichert...",
    addMorePhotos: "Weitere Fotos hinzufügen",
    enterUsername: "Geben Sie einen öffentlich sichtbaren Benutzernamen ein.",
    usernameExample: "Sie können zum Beispiel Ihren Vornamen oder einen anderen Namen verwenden.",
    selectUsername: "Benutzername auswählen",
    selectUsernameDigits: "Benutzername + 6 Ziffern auswählen",
    usernameError: "Öffentliche Profilbenutzernamen können nur englische Buchstaben, Zahlen oder - verwenden.",
    usernameTakenError: "Öffentlicher Profilbenutzername bereits vergeben. Bitte wählen Sie einen anderen.",
    photoSelected: "Foto ausgewählt",
    photosSelected: "Fotos ausgewählt",
    debugLog: "Debug-Protokoll"
  },
  'de': {
    myAlbums: "Meine Alben",
    logOut: "Abmelden",
    uploadProgress: "Upload-Fortschritt",
    overallProgress: "Gesamtfortschritt",
    ofComplete: "von",
    uploading: "Hochladen",
    processing: "Verarbeitung",
    complete: "Abgeschlossen",
    failed: "Fehlgeschlagen",
    savingAlbum: "Album speichern",
    movingFiles: "Dateien werden in den permanenten Speicher verschoben...",
    video: "Video",
    image: "Bild",
    error: "Fehler",
    remove: "Entfernen",
    saveAlbum: "Album speichern",
    savingAlbumProgress: "Album wird gespeichert...",
    addMorePhotos: "Weitere Fotos hinzufügen",
    enterUsername: "Geben Sie einen öffentlich sichtbaren Benutzernamen ein.",
    usernameExample: "Sie können zum Beispiel Ihren Vornamen oder einen anderen Namen verwenden.",
    selectUsername: "Benutzername auswählen",
    selectUsernameDigits: "Benutzername + 6 Ziffern auswählen",
    usernameError: "Öffentliche Profilbenutzernamen können nur englische Buchstaben, Zahlen oder - verwenden.",
    usernameTakenError: "Öffentlicher Profilbenutzername bereits vergeben. Bitte wählen Sie einen anderen.",
    photoSelected: "Foto ausgewählt",
    photosSelected: "Fotos ausgewählt",
    debugLog: "Debug-Protokoll"
  },
  // Spanish - Spain & Generic Spanish
  'es-ES': {
    myAlbums: "Mis Álbumes",
    logOut: "Cerrar Sesión",
    uploadProgress: "Progreso de Carga",
    overallProgress: "Progreso General",
    ofComplete: "de",
    uploading: "Subiendo",
    processing: "Procesando",
    complete: "Completado",
    failed: "Fallido",
    savingAlbum: "Guardando Álbum",
    movingFiles: "Moviendo archivos al almacenamiento permanente...",
    video: "Video",
    image: "Imagen",
    error: "Error",
    remove: "Eliminar",
    saveAlbum: "Guardar Álbum",
    savingAlbumProgress: "Guardando Álbum...",
    addMorePhotos: "Añadir Más Fotos",
    enterUsername: "Introduce un nombre de usuario visible públicamente.",
    usernameExample: "Por ejemplo, puedes usar tu nombre o cualquier otro nombre.",
    selectUsername: "Seleccionar Nombre de Usuario",
    selectUsernameDigits: "Seleccionar Nombre de Usuario + 6 Dígitos",
    usernameError: "Los nombres de usuario de perfil público solo pueden usar letras inglesas, números o -.",
    usernameTakenError: "Nombre de usuario de perfil público ya está en uso. Por favor, elige otro.",
    photoSelected: "foto seleccionada",
    photosSelected: "fotos seleccionadas",
    debugLog: "Registro de Depuración"
  },
  'es': {
    myAlbums: "Mis Álbumes",
    logOut: "Cerrar Sesión",
    uploadProgress: "Progreso de Carga",
    overallProgress: "Progreso General",
    ofComplete: "de",
    uploading: "Subiendo",
    processing: "Procesando",
    complete: "Completado",
    failed: "Fallido",
    savingAlbum: "Guardando Álbum",
    movingFiles: "Moviendo archivos al almacenamiento permanente...",
    video: "Video",
    image: "Imagen",
    error: "Error",
    remove: "Eliminar",
    saveAlbum: "Guardar Álbum",
    savingAlbumProgress: "Guardando Álbum...",
    addMorePhotos: "Añadir Más Fotos",
    enterUsername: "Introduce un nombre de usuario visible públicamente.",
    usernameExample: "Por ejemplo, puedes usar tu nombre o cualquier otro nombre.",
    selectUsername: "Seleccionar Nombre de Usuario",
    selectUsernameDigits: "Seleccionar Nombre de Usuario + 6 Dígitos",
    usernameError: "Los nombres de usuario de perfil público solo pueden usar letras inglesas, números o -.",
    usernameTakenError: "Nombre de usuario de perfil público ya está en uso. Por favor, elige otro.",
    photoSelected: "foto seleccionada",
    photosSelected: "fotos seleccionadas",
    debugLog: "Registro de Depuración"
  },
  // Russian
  'ru': {
    myAlbums: "Мои Альбомы",
    logOut: "Выйти",
    uploadProgress: "Прогресс Загрузки",
    overallProgress: "Общий Прогресс",
    ofComplete: "из",
    uploading: "Загрузка",
    processing: "Обработка",
    complete: "Завершено",
    failed: "Ошибка",
    savingAlbum: "Сохранение Альбома",
    movingFiles: "Перемещение файлов в постоянное хранилище...",
    video: "Видео",
    image: "Изображение",
    error: "Ошибка",
    remove: "Удалить",
    saveAlbum: "Сохранить Альбом",
    savingAlbumProgress: "Сохранение Альбома...",
    addMorePhotos: "Добавить Еще Фотографии",
    enterUsername: "Введите публично видимое имя пользователя.",
    usernameExample: "Например, можете использовать свое имя или другое имя.",
    selectUsername: "Выбрать Имя Пользователя",
    selectUsernameDigits: "Выбрать Имя Пользователя + 6 Цифр",
    usernameError: "Имена пользователей публичного профиля могут содержать только английские буквы, цифры или -.",
    usernameTakenError: "Имя пользователя публичного профиля уже занято. Пожалуйста, выберите другое.",
    photoSelected: "выбрана фотография",
    photosSelected: "выбрано фотографий",
    debugLog: "Журнал Отладки"
  },
  // Japanese
  'ja': {
    myAlbums: "マイアルバム",
    logOut: "ログアウト",
    uploadProgress: "アップロード進捗",
    overallProgress: "全体の進捗",
    ofComplete: "完了",
    uploading: "アップロード中",
    processing: "処理中",
    complete: "完了",
    failed: "失敗",
    savingAlbum: "アルバムを保存中",
    movingFiles: "ファイルを永続的なストレージに移動中...",
    video: "動画",
    image: "画像",
    error: "エラー",
    remove: "削除",
    saveAlbum: "アルバムを保存",
    savingAlbumProgress: "アルバムを保存中...",
    addMorePhotos: "写真を追加",
    enterUsername: "公開されるユーザー名を入力してください。",
    usernameExample: "例えば、名前や別の名前を使用できます。",
    selectUsername: "ユーザー名を選択",
    selectUsernameDigits: "ユーザー名 + 6桁の数字を選択",
    usernameError: "公開プロフィールのユーザー名には英字、数字、または - のみ使用できます。",
    usernameTakenError: "公開プロフィールのユーザー名は既に使用されています。別のものを選択してください。",
    photoSelected: "枚の写真が選択されました",
    photosSelected: "枚の写真が選択されました",
    debugLog: "デバッグログ"
  },
  // Portuguese - Brazil & Generic Portuguese
  'pt-BR': {
    myAlbums: "Meus Álbuns",
    logOut: "Sair",
    uploadProgress: "Progresso do Upload",
    overallProgress: "Progresso Geral",
    ofComplete: "de",
    uploading: "Enviando",
    processing: "Processando",
    complete: "Concluído",
    failed: "Falha",
    savingAlbum: "Salvando Álbum",
    movingFiles: "Movendo arquivos para armazenamento permanente...",
    video: "Vídeo",
    image: "Imagem",
    error: "Erro",
    remove: "Remover",
    saveAlbum: "Salvar Álbum",
    savingAlbumProgress: "Salvando Álbum...",
    addMorePhotos: "Adicionar Mais Fotos",
    enterUsername: "Digite um nome de usuário visível publicamente.",
    usernameExample: "Por exemplo, você pode usar seu primeiro nome ou outro nome.",
    selectUsername: "Selecionar Nome de Usuário",
    selectUsernameDigits: "Selecionar Nome de Usuário + 6 Dígitos",
    usernameError: "Nomes de usuário de perfil público só podem usar letras inglesas, números ou -.",
    usernameTakenError: "Nome de usuário de perfil público já está em uso. Por favor, escolha outro.",
    photoSelected: "foto selecionada",
    photosSelected: "fotos selecionadas",
    debugLog: "Log de Depuração"
  },
  'pt': {
    myAlbums: "Meus Álbuns",
    logOut: "Sair",
    uploadProgress: "Progresso do Upload",
    overallProgress: "Progresso Geral",
    ofComplete: "de",
    uploading: "Enviando",
    processing: "Processando",
    complete: "Concluído",
    failed: "Falha",
    savingAlbum: "Salvando Álbum",
    movingFiles: "Movendo arquivos para armazenamento permanente...",
    video: "Vídeo",
    image: "Imagem",
    error: "Erro",
    remove: "Remover",
    saveAlbum: "Salvar Álbum",
    savingAlbumProgress: "Salvando Álbum...",
    addMorePhotos: "Adicionar Mais Fotos",
    enterUsername: "Digite um nome de usuário visível publicamente.",
    usernameExample: "Por exemplo, você pode usar seu primeiro nome ou outro nome.",
    selectUsername: "Selecionar Nome de Usuário",
    selectUsernameDigits: "Selecionar Nome de Usuário + 6 Dígitos",
    usernameError: "Nomes de usuário de perfil público só podem usar letras inglesas, números ou -.",
    usernameTakenError: "Nome de usuário de perfil público já está em uso. Por favor, escolha outro.",
    photoSelected: "foto selecionada",
    photosSelected: "fotos selecionadas",
    debugLog: "Log de Depuração"
  },
  // Italian
  'it': {
    myAlbums: "I Miei Album",
    logOut: "Disconnetti",
    uploadProgress: "Avanzamento Caricamento",
    overallProgress: "Avanzamento Complessivo",
    ofComplete: "di",
    uploading: "Caricamento",
    processing: "Elaborazione",
    complete: "Completato",
    failed: "Fallito",
    savingAlbum: "Salvataggio Album",
    movingFiles: "Spostamento file nell'archiviazione permanente...",
    video: "Video",
    image: "Immagine",
    error: "Errore",
    remove: "Rimuovi",
    saveAlbum: "Salva Album",
    savingAlbumProgress: "Salvataggio Album...",
    addMorePhotos: "Aggiungi Altre Foto",
    enterUsername: "Inserisci un nome utente visibile pubblicamente.",
    usernameExample: "Ad esempio, puoi usare il tuo nome o un altro nome.",
    selectUsername: "Seleziona Nome Utente",
    selectUsernameDigits: "Seleziona Nome Utente + 6 Cifre",
    usernameError: "I nomi utente del profilo pubblico possono utilizzare solo lettere inglesi, numeri o -.",
    usernameTakenError: "Nome utente del profilo pubblico già in uso. Si prega di sceglierne un altro.",
    photoSelected: "foto selezionata",
    photosSelected: "foto selezionate",
    debugLog: "Registro Debug"
  },
  // Korean
  'ko': {
    myAlbums: "내 앨범",
    logOut: "로그아웃",
    uploadProgress: "업로드 진행 상황",
    overallProgress: "전체 진행 상황",
    ofComplete: "중",
    uploading: "업로드 중",
    processing: "처리 중",
    complete: "완료",
    failed: "실패",
    savingAlbum: "앨범 저장 중",
    movingFiles: "파일을 영구 저장소로 이동하는 중...",
    video: "비디오",
    image: "이미지",
    error: "오류",
    remove: "제거",
    saveAlbum: "앨범 저장",
    savingAlbumProgress: "앨범 저장 중...",
    addMorePhotos: "더 많은 사진 추가",
    enterUsername: "공개적으로 표시될 사용자 이름을 입력하세요.",
    usernameExample: "예를 들어, 당신의 이름이나 다른 이름을 사용할 수 있습니다.",
    selectUsername: "사용자 이름 선택",
    selectUsernameDigits: "사용자 이름 + 6자리 숫자 선택",
    usernameError: "공개 프로필 사용자 이름은 영문 문자, 숫자 또는 -만 사용할 수 있습니다.",
    usernameTakenError: "공개 프로필 사용자 이름이 이미 사용 중입니다. 다른 이름을 선택해 주세요.",
    photoSelected: "장의 사진이 선택됨",
    photosSelected: "장의 사진이 선택됨",
    debugLog: "디버그 로그"
  },
  // Arabic
  'ar': {
    myAlbums: "ألبوماتي",
    logOut: "تسجيل الخروج",
    uploadProgress: "تقدم الرفع",
    overallProgress: "التقدم الإجمالي",
    ofComplete: "من",
    uploading: "جاري الرفع",
    processing: "جاري المعالجة",
    complete: "مكتمل",
    failed: "فشل",
    savingAlbum: "حفظ الألبوم",
    movingFiles: "نقل الملفات إلى التخزين الدائم...",
    video: "فيديو",
    image: "صورة",
    error: "خطأ",
    remove: "إزالة",
    saveAlbum: "حفظ الألبوم",
    savingAlbumProgress: "جاري حفظ الألبوم...",
    addMorePhotos: "إضافة المزيد من الصور",
    enterUsername: "أدخل اسم مستخدم مرئي للعامة.",
    usernameExample: "على سبيل المثال، يمكنك استخدام اسمك الأول أو اسم آخر.",
    selectUsername: "اختيار اسم المستخدم",
    selectUsernameDigits: "اختيار اسم المستخدم + 6 أرقام",
    usernameError: "يمكن لأسماء المستخدمين للملف الشخصي العام استخدام الأحرف الإنجليزية والأرقام أو - فقط.",
    usernameTakenError: "اسم المستخدم للملف الشخصي العام مستخدم بالفعل. الرجاء اختيار اسم آخر.",
    photoSelected: "صورة محددة",
    photosSelected: "صور محددة",
    debugLog: "سجل التصحيح"
  },
  // Dutch
  'nl': {
    myAlbums: "Mijn Albums",
    logOut: "Uitloggen",
    uploadProgress: "Uploadvoortgang",
    overallProgress: "Algehele Voortgang",
    ofComplete: "van",
    uploading: "Uploaden",
    processing: "Verwerken",
    complete: "Voltooid",
    failed: "Mislukt",
    savingAlbum: "Album Opslaan",
    movingFiles: "Bestanden worden verplaatst naar permanente opslag...",
    video: "Video",
    image: "Afbeelding",
    error: "Fout",
    remove: "Verwijderen",
    saveAlbum: "Album Opslaan",
    savingAlbumProgress: "Album Opslaan...",
    addMorePhotos: "Meer Foto's Toevoegen",
    enterUsername: "Voer een openbaar zichtbare gebruikersnaam in.",
    usernameExample: "Je kunt bijvoorbeeld je voornaam of een andere naam gebruiken.",
    selectUsername: "Gebruikersnaam Selecteren",
    selectUsernameDigits: "Gebruikersnaam + 6 Cijfers Selecteren",
    usernameError: "Openbare profielgebruikersnamen mogen alleen Engelse letters, cijfers of - bevatten.",
    usernameTakenError: "Openbare profielgebruikersnaam is al in gebruik. Kies een andere naam.",
    photoSelected: "foto geselecteerd",
    photosSelected: "foto's geselecteerd",
    debugLog: "Debug Logboek"
  },
  // Turkish
  'tr': {
    myAlbums: "Albümlerim",
    logOut: "Çıkış Yap",
    uploadProgress: "Yükleme İlerlemesi",
    overallProgress: "Genel İlerleme",
    ofComplete: "/",
    uploading: "Yükleniyor",
    processing: "İşleniyor",
    complete: "Tamamlandı",
    failed: "Başarısız",
    savingAlbum: "Albüm Kaydediliyor",
    movingFiles: "Dosyalar kalıcı depolamaya taşınıyor...",
    video: "Video",
    image: "Resim",
    error: "Hata",
    remove: "Kaldır",
    saveAlbum: "Albümü Kaydet",
    savingAlbumProgress: "Albüm Kaydediliyor...",
    addMorePhotos: "Daha Fazla Fotoğraf Ekle",
    enterUsername: "Herkese açık görünür bir kullanıcı adı girin.",
    usernameExample: "Örneğin, adınızı veya başka bir isim kullanabilirsiniz.",
    selectUsername: "Kullanıcı Adını Seç",
    selectUsernameDigits: "Kullanıcı Adı + 6 Rakam Seç",
    usernameError: "Herkese açık profil kullanıcı adları yalnızca İngilizce harfler, rakamlar veya - kullanabilir.",
    usernameTakenError: "Herkese açık profil kullanıcı adı zaten alınmış. Lütfen başka bir tane seçin.",
    photoSelected: "fotoğraf seçildi",
    photosSelected: "fotoğraf seçildi",
    debugLog: "Hata Ayıklama Günlüğü"
  },
  // Polish
  'pl': {
    myAlbums: "Moje Albumy",
    logOut: "Wyloguj",
    uploadProgress: "Postęp Przesyłania",
    overallProgress: "Ogólny Postęp",
    ofComplete: "z",
    uploading: "Przesyłanie",
    processing: "Przetwarzanie",
    complete: "Ukończone",
    failed: "Niepowodzenie",
    savingAlbum: "Zapisywanie Albumu",
    movingFiles: "Przenoszenie plików do stałego magazynu...",
    video: "Wideo",
    image: "Obraz",
    error: "Błąd",
    remove: "Usuń",
    saveAlbum: "Zapisz Album",
    savingAlbumProgress: "Zapisywanie Albumu...",
    addMorePhotos: "Dodaj Więcej Zdjęć",
    enterUsername: "Wprowadź publicznie widoczną nazwę użytkownika.",
    usernameExample: "Na przykład, możesz użyć swojego imienia lub innej nazwy.",
    selectUsername: "Wybierz Nazwę Użytkownika",
    selectUsernameDigits: "Wybierz Nazwę Użytkownika + 6 Cyfr",
    usernameError: "Nazwy użytkownika profilu publicznego mogą zawierać tylko angielskie litery, cyfry lub -.",
    usernameTakenError: "Nazwa użytkownika profilu publicznego jest już zajęta. Proszę wybrać inną.",
    photoSelected: "wybrane zdjęcie",
    photosSelected: "wybranych zdjęć",
    debugLog: "Dziennik Debugowania"
  },
  'sv-SE': {
  myAlbums: "Mina Album",
  logOut: "Logga ut",
  uploadProgress: "Uppladdningsframsteg",
  overallProgress: "Totalt framsteg",
  ofComplete: "av",
  uploading: "Laddar upp",
  processing: "Bearbetar",
  complete: "Slutförd",
  failed: "Misslyckades",
  savingAlbum: "Sparar album",
  movingFiles: "Flyttar filer till permanent lagring...",
  video: "Video",
  image: "Bild",
  error: "Fel",
  remove: "Ta bort",
  saveAlbum: "Spara album",
  savingAlbumProgress: "Sparar album...",
  addMorePhotos: "Lägg till fler foton",
  enterUsername: "Ange ett offentligt synligt användarnamn.",
  usernameExample: "Du kan till exempel använda ditt förnamn eller ett annat namn.",
  selectUsername: "Välj användarnamn",
  selectUsernameDigits: "Välj användarnamn + 6 siffror",
  usernameError: "Offentliga profilanvändarnamn kan endast använda engelska bokstäver, siffror eller -.",
  usernameTakenError: "Offentligt profilanvändarnamn används redan. Välj ett annat.",
  photoSelected: "foto valt",
  photosSelected: "foton valda",
  debugLog: "Felsökningslogg"
},
'sv': {
  myAlbums: "Mina Album",
  logOut: "Logga ut",
  uploadProgress: "Uppladdningsframsteg",
  overallProgress: "Totalt framsteg",
  ofComplete: "av",
  uploading: "Laddar upp",
  processing: "Bearbetar",
  complete: "Slutförd",
  failed: "Misslyckades",
  savingAlbum: "Sparar album",
  movingFiles: "Flyttar filer till permanent lagring...",
  video: "Video",
  image: "Bild",
  error: "Fel",
  remove: "Ta bort",
  saveAlbum: "Spara album",
  savingAlbumProgress: "Sparar album...",
  addMorePhotos: "Lägg till fler foton",
  enterUsername: "Ange ett offentligt synligt användarnamn.",
  usernameExample: "Du kan till exempel använda ditt förnamn eller ett annat namn.",
  selectUsername: "Välj användarnamn",
  selectUsernameDigits: "Välj användarnamn + 6 siffror",
  usernameError: "Offentliga profilanvändarnamn kan endast använda engelska bokstäver, siffror eller -.",
  usernameTakenError: "Offentligt profilanvändarnamn används redan. Välj ett annat.",
  photoSelected: "foto valt",
  photosSelected: "foton valda",
  debugLog: "Felsökningslogg"
},
// Hebrew
'he': {
  myAlbums: "האלבומים שלי",
  logOut: "התנתק",
  uploadProgress: "התקדמות העלאה",
  overallProgress: "התקדמות כללית",
  ofComplete: "מתוך",
  uploading: "מעלה",
  processing: "מעבד",
  complete: "הושלם",
  failed: "נכשל",
  savingAlbum: "שומר אלבום",
  movingFiles: "מעביר קבצים לאחסון קבוע...",
  video: "וידאו",
  image: "תמונה",
  error: "שגיאה",
  remove: "הסר",
  saveAlbum: "שמור אלבום",
  savingAlbumProgress: "שומר אלבום...",
  addMorePhotos: "הוסף עוד תמונות",
  enterUsername: "הזן שם משתמש גלוי לציבור.",
  usernameExample: "לדוגמה, אתה יכול להשתמש בשמך הפרטי או בשם אחר.",
  selectUsername: "בחר שם משתמש",
  selectUsernameDigits: "בחר שם משתמש + 6 ספרות",
  usernameError: "שמות משתמש לפרופיל ציבורי יכולים להשתמש רק באותיות אנגליות, מספרים או -.",
  usernameTakenError: "שם המשתמש לפרופיל הציבורי כבר תפוס. נא לבחור אחר.",
  photoSelected: "תמונה נבחרה",
  photosSelected: "תמונות נבחרו",
  debugLog: "יומן ניפוי באגים"
},
// Ukrainian
'uk': {
  myAlbums: "Мої Альбоми",
  logOut: "Вийти",
  uploadProgress: "Прогрес Завантаження",
  overallProgress: "Загальний Прогрес",
  ofComplete: "з",
  uploading: "Завантаження",
  processing: "Обробка",
  complete: "Завершено",
  failed: "Невдача",
  savingAlbum: "Збереження Альбому",
  movingFiles: "Переміщення файлів до постійного сховища...",
  video: "Відео",
  image: "Зображення",
  error: "Помилка",
  remove: "Видалити",
  saveAlbum: "Зберегти Альбом",
  savingAlbumProgress: "Збереження Альбому...",
  addMorePhotos: "Додати Більше Фото",
  enterUsername: "Введіть публічно видиме ім'я користувача.",
  usernameExample: "Наприклад, ви можете використовувати своє ім'я або інше ім'я.",
  selectUsername: "Вибрати Ім'я Користувача",
  selectUsernameDigits: "Вибрати Ім'я Користувача + 6 Цифр",
  usernameError: "Імена користувачів публічного профілю можуть використовувати лише англійські літери, цифри або -.",
  usernameTakenError: "Ім'я користувача публічного профілю вже зайнято. Будь ласка, виберіть інше.",
  photoSelected: "фото вибрано",
  photosSelected: "фото вибрано",
  debugLog: "Журнал Налагодження"
},
// Thai
'th': {
  myAlbums: "อัลบั้มของฉัน",
  logOut: "ออกจากระบบ",
  uploadProgress: "ความคืบหน้าการอัปโหลด",
  overallProgress: "ความคืบหน้าโดยรวม",
  ofComplete: "จาก",
  uploading: "กำลังอัปโหลด",
  processing: "กำลังประมวลผล",
  complete: "เสร็จสิ้น",
  failed: "ล้มเหลว",
  savingAlbum: "กำลังบันทึกอัลบั้ม",
  movingFiles: "กำลังย้ายไฟล์ไปยังที่เก็บถาวร...",
  video: "วิดีโอ",
  image: "รูปภาพ",
  error: "ข้อผิดพลาด",
  remove: "ลบ",
  saveAlbum: "บันทึกอัลบั้ม",
  savingAlbumProgress: "กำลังบันทึกอัลบั้ม...",
  addMorePhotos: "เพิ่มรูปภาพอีก",
  enterUsername: "ป้อนชื่อผู้ใช้ที่มองเห็นได้ในที่สาธารณะ",
  usernameExample: "ตัวอย่างเช่น คุณสามารถใช้ชื่อจริงหรือชื่ออื่นได้",
  selectUsername: "เลือกชื่อผู้ใช้",
  selectUsernameDigits: "เลือกชื่อผู้ใช้ + 6 หลัก",
  usernameError: "ชื่อผู้ใช้โปรไฟล์สาธารณะสามารถใช้ตัวอักษรภาษาอังกฤษ ตัวเลข หรือ - เท่านั้น",
  usernameTakenError: "ชื่อผู้ใช้โปรไฟล์สาธารณะถูกใช้ไปแล้ว โปรดเลือกชื่ออื่น",
  photoSelected: "รูปภาพที่เลือก",
  photosSelected: "รูปภาพที่เลือก",
  debugLog: "บันทึกการแก้ไขข้อบกพร่อง"
},
// Vietnamese
'vi': {
  myAlbums: "Album Của Tôi",
  logOut: "Đăng Xuất",
  uploadProgress: "Tiến Trình Tải Lên",
  overallProgress: "Tiến Trình Tổng Thể",
  ofComplete: "trong số",
  uploading: "Đang Tải Lên",
  processing: "Đang Xử Lý",
  complete: "Hoàn Thành",
  failed: "Thất Bại",
  savingAlbum: "Đang Lưu Album",
  movingFiles: "Đang di chuyển tệp vào bộ nhớ vĩnh viễn...",
  video: "Video",
  image: "Hình Ảnh",
  error: "Lỗi",
  remove: "Xóa",
  saveAlbum: "Lưu Album",
  savingAlbumProgress: "Đang Lưu Album...",
  addMorePhotos: "Thêm Ảnh",
  enterUsername: "Nhập tên người dùng hiển thị công khai.",
  usernameExample: "Ví dụ, bạn có thể sử dụng tên hoặc tên khác của mình.",
  selectUsername: "Chọn Tên Người Dùng",
  selectUsernameDigits: "Chọn Tên Người Dùng + 6 Chữ Số",
  usernameError: "Tên người dùng hồ sơ công khai chỉ có thể sử dụng chữ cái tiếng Anh, số hoặc -.",
  usernameTakenError: "Tên người dùng hồ sơ công khai đã được sử dụng. Vui lòng chọn tên khác.",
  photoSelected: "ảnh đã chọn",
  photosSelected: "ảnh đã chọn",
  debugLog: "Nhật Ký Gỡ Lỗi"
},
// Czech
'cs': {
  myAlbums: "Moje Alba",
  logOut: "Odhlásit se",
  uploadProgress: "Průběh Nahrávání",
  overallProgress: "Celkový Průběh",
  ofComplete: "z",
  uploading: "Nahrávání",
  processing: "Zpracování",
  complete: "Dokončeno",
  failed: "Selhalo",
  savingAlbum: "Ukládání Alba",
  movingFiles: "Přesouvání souborů do trvalého úložiště...",
  video: "Video",
  image: "Obrázek",
  error: "Chyba",
  remove: "Odstranit",
  saveAlbum: "Uložit Album",
  savingAlbumProgress: "Ukládání Alba...",
  addMorePhotos: "Přidat Další Fotky",
  enterUsername: "Zadejte veřejně viditelné uživatelské jméno.",
  usernameExample: "Například můžete použít své křestní jméno nebo jiné jméno.",
  selectUsername: "Vybrat Uživatelské Jméno",
  selectUsernameDigits: "Vybrat Uživatelské Jméno + 6 Číslic",
  usernameError: "Uživatelská jména veřejného profilu mohou používat pouze anglická písmena, číslice nebo -.",
  usernameTakenError: "Uživatelské jméno veřejného profilu je již obsazeno. Prosím, vyberte jiné.",
  photoSelected: "vybraná fotka",
  photosSelected: "vybraných fotek",
  debugLog: "Protokol Ladění"
},
// Romanian
'ro': {
  myAlbums: "Albumele Mele",
  logOut: "Deconectare",
  uploadProgress: "Progres Încărcare",
  overallProgress: "Progres General",
  ofComplete: "din",
  uploading: "Se Încarcă",
  processing: "Se Procesează",
  complete: "Finalizat",
  failed: "Eșuat",
  savingAlbum: "Se Salvează Albumul",
  movingFiles: "Se mută fișierele în stocare permanentă...",
  video: "Video",
  image: "Imagine",
  error: "Eroare",
  remove: "Elimină",
  saveAlbum: "Salvează Albumul",
  savingAlbumProgress: "Se Salvează Albumul...",
  addMorePhotos: "Adaugă Mai Multe Fotografii",
  enterUsername: "Introduceți un nume de utilizator vizibil public.",
  usernameExample: "De exemplu, puteți folosi prenumele dvs. sau un alt nume.",
  selectUsername: "Selectați Numele de Utilizator",
  selectUsernameDigits: "Selectați Numele de Utilizator + 6 Cifre",
  usernameError: "Numele de utilizator pentru profilul public pot utiliza doar litere englezești, cifre sau -.",
  usernameTakenError: "Numele de utilizator pentru profilul public este deja folosit. Vă rugăm să alegeți altul.",
  photoSelected: "fotografie selectată",
  photosSelected: "fotografii selectate",
  debugLog: "Jurnal de Depanare"
},
// Finnish
'fi': {
  myAlbums: "Albumini",
  logOut: "Kirjaudu ulos",
  uploadProgress: "Latauksen edistyminen",
  overallProgress: "Kokonaisedistyminen",
  ofComplete: "/",
  uploading: "Lataa",
  processing: "Käsittelee",
  complete: "Valmis",
  failed: "Epäonnistui",
  savingAlbum: "Tallentaa albumia",
  movingFiles: "Siirtää tiedostoja pysyvään tallennustilaan...",
  video: "Video",
  image: "Kuva",
  error: "Virhe",
  remove: "Poista",
  saveAlbum: "Tallenna albumi",
  savingAlbumProgress: "Tallentaa albumia...",
  addMorePhotos: "Lisää kuvia",
  enterUsername: "Syötä julkisesti näkyvä käyttäjänimi.",
  usernameExample: "Voit käyttää esimerkiksi etunimeäsi tai muuta nimeä.",
  selectUsername: "Valitse käyttäjänimi",
  selectUsernameDigits: "Valitse käyttäjänimi + 6 numeroa",
  usernameError: "Julkisen profiilin käyttäjänimet voivat käyttää vain englanninkielisiä kirjaimia, numeroita tai -.",
  usernameTakenError: "Julkisen profiilin käyttäjänimi on jo käytössä. Valitse toinen.",
  photoSelected: "kuva valittu",
  photosSelected: "kuvaa valittu",
  debugLog: "Virheenkorjausloki"
},
// Danish
'da': {
  myAlbums: "Mine Albums",
  logOut: "Log ud",
  uploadProgress: "Upload fremskridt",
  overallProgress: "Samlet fremskridt",
  ofComplete: "af",
  uploading: "Uploader",
  processing: "Behandler",
  complete: "Afsluttet",
  failed: "Mislykkedes",
  savingAlbum: "Gemmer album",
  movingFiles: "Flytter filer til permanent opbevaring...",
  video: "Video",
  image: "Billede",
  error: "Fejl",
  remove: "Fjern",
  saveAlbum: "Gem album",
  savingAlbumProgress: "Gemmer album...",
  addMorePhotos: "Tilføj flere billeder",
  enterUsername: "Indtast et offentligt synligt brugernavn.",
  usernameExample: "For eksempel kan du bruge dit fornavn eller et andet navn.",
  selectUsername: "Vælg brugernavn",
  selectUsernameDigits: "Vælg brugernavn + 6 cifre",
  usernameError: "Offentlige profilbrugernavne kan kun bruge engelske bogstaver, tal eller -.",
  usernameTakenError: "Offentligt profilbrugernavn er allerede taget. Vælg venligst et andet.",
  photoSelected: "billede valgt",
  photosSelected: "billeder valgt",
  debugLog: "Fejlfindingslog"
},
// Hungarian
'hu': {
  myAlbums: "Albumaim",
  logOut: "Kijelentkezés",
  uploadProgress: "Feltöltési folyamat",
  overallProgress: "Teljes folyamat",
  ofComplete: "/",
  uploading: "Feltöltés",
  processing: "Feldolgozás",
  complete: "Kész",
  failed: "Sikertelen",
  savingAlbum: "Album mentése",
  movingFiles: "Fájlok áthelyezése állandó tárolóba...",
  video: "Videó",
  image: "Kép",
  error: "Hiba",
  remove: "Eltávolítás",
  saveAlbum: "Album mentése",
  savingAlbumProgress: "Album mentése...",
  addMorePhotos: "Több fénykép hozzáadása",
  enterUsername: "Adjon meg egy nyilvánosan látható felhasználónevet.",
  usernameExample: "Például használhatja a keresztnevét vagy egy másik nevet.",
  selectUsername: "Felhasználónév kiválasztása",
  selectUsernameDigits: "Felhasználónév + 6 számjegy kiválasztása",
  usernameError: "A nyilvános profil felhasználónevei csak angol betűket, számokat vagy - használhatnak.",
  usernameTakenError: "A nyilvános profil felhasználóneve már foglalt. Kérjük, válasszon másikat.",
  photoSelected: "kiválasztott fénykép",
  photosSelected: "kiválasztott fénykép",
  debugLog: "Hibakeresési napló"
},
// Indonesian
'id': {
  myAlbums: "Album Saya",
  logOut: "Keluar",
  uploadProgress: "Kemajuan Unggah",
  overallProgress: "Kemajuan Keseluruhan",
  ofComplete: "dari",
  uploading: "Mengunggah",
  processing: "Memproses",
  complete: "Selesai",
  failed: "Gagal",
  savingAlbum: "Menyimpan Album",
  movingFiles: "Memindahkan file ke penyimpanan permanen...",
  video: "Video",
  image: "Gambar",
  error: "Kesalahan",
  remove: "Hapus",
  saveAlbum: "Simpan Album",
  savingAlbumProgress: "Menyimpan Album...",
  addMorePhotos: "Tambah Foto Lainnya",
  enterUsername: "Masukkan nama pengguna yang terlihat publik.",
  usernameExample: "Misalnya, Anda dapat menggunakan nama depan atau nama lain.",
  selectUsername: "Pilih Nama Pengguna",
  selectUsernameDigits: "Pilih Nama Pengguna + 6 Digit",
  usernameError: "Nama pengguna profil publik hanya dapat menggunakan huruf bahasa Inggris, angka, atau -.",
  usernameTakenError: "Nama pengguna profil publik sudah digunakan. Silakan pilih yang lain.",
  photoSelected: "foto dipilih",
  photosSelected: "foto dipilih",
  debugLog: "Log Debug"
},
// Norwegian
'no': {
  myAlbums: "Mine Album",
  logOut: "Logg ut",
  uploadProgress: "Opplastingsfremgang",
  overallProgress: "Total fremgang",
  ofComplete: "av",
  uploading: "Laster opp",
  processing: "Behandler",
  complete: "Fullført",
  failed: "Mislykket",
  savingAlbum: "Lagrer album",
  movingFiles: "Flytter filer til permanent lagring...",
  video: "Video",
  image: "Bilde",
  error: "Feil",
  remove: "Fjern",
  saveAlbum: "Lagre album",
  savingAlbumProgress: "Lagrer album...",
  addMorePhotos: "Legg til flere bilder",
  enterUsername: "Skriv inn et offentlig synlig brukernavn.",
  usernameExample: "For eksempel kan du bruke fornavnet ditt eller et annet navn.",
  selectUsername: "Velg brukernavn",
  selectUsernameDigits: "Velg brukernavn + 6 sifre",
  usernameError: "Offentlige profilbrukernavn kan bare bruke engelske bokstaver, tall eller -.",
  usernameTakenError: "Offentlig profilbrukernavn er allerede tatt. Vennligst velg et annet.",
  photoSelected: "bilde valgt",
  photosSelected: "bilder valgt",
  debugLog: "Feilsøkingslogg"
},
// Norwegian Bokmål
'nb': {
  myAlbums: "Mine Album",
  logOut: "Logg ut",
  uploadProgress: "Opplastingsfremgang",
  overallProgress: "Total fremgang",
  ofComplete: "av",
  uploading: "Laster opp",
  processing: "Behandler",
  complete: "Fullført",
  failed: "Mislykket",
  savingAlbum: "Lagrer album",
  movingFiles: "Flytter filer til permanent lagring...",
  video: "Video",
  image: "Bilde",
  error: "Feil",
  remove: "Fjern",
  saveAlbum: "Lagre album",
  savingAlbumProgress: "Lagrer album...",
  addMorePhotos: "Legg til flere bilder",
  enterUsername: "Skriv inn et offentlig synlig brukernavn.",
  usernameExample: "For eksempel kan du bruke fornavnet ditt eller et annet navn.",
  selectUsername: "Velg brukernavn",
  selectUsernameDigits: "Velg brukernavn + 6 sifre",
  usernameError: "Offentlige profilbrukernavn kan bare bruke engelske bokstaver, tall eller -.",
  usernameTakenError: "Offentlig profilbrukernavn er allerede tatt. Vennligst velg et annet.",
  photoSelected: "bilde valgt",
  photosSelected: "bilder valgt",
  debugLog: "Feilsøkingslogg"
},
// Slovak
'sk': {
  myAlbums: "Moje Albumy",
  logOut: "Odhlásiť sa",
  uploadProgress: "Priebeh Nahrávania",
  overallProgress: "Celkový Priebeh",
  ofComplete: "z",
  uploading: "Nahrávam",
  processing: "Spracúvam",
  complete: "Dokončené",
  failed: "Zlyhalo",
  savingAlbum: "Ukladám Album",
  movingFiles: "Presúvam súbory do trvalého úložiska...",
  video: "Video",
  image: "Obrázok",
  error: "Chyba",
  remove: "Odstrániť",
  saveAlbum: "Uložiť Album",
  savingAlbumProgress: "Ukladám Album...",
  addMorePhotos: "Pridať Ďalšie Fotografie",
  enterUsername: "Zadajte verejne viditeľné používateľské meno.",
  usernameExample: "Napríklad môžete použiť svoje krstné meno alebo iné meno.",
  selectUsername: "Vybrať Používateľské Meno",
  selectUsernameDigits: "Vybrať Používateľské Meno + 6 Číslic",
  usernameError: "Používateľské mená verejného profilu môžu používať iba anglické písmená, číslice alebo -.",
  usernameTakenError: "Používateľské meno verejného profilu je už obsadené. Prosím, vyberte iné.",
  photoSelected: "vybraná fotografia",
  photosSelected: "vybraných fotografií",
  debugLog: "Protokol Ladenia"
},
// Greek
'el': {
  myAlbums: "Τα Άλμπουμ Μου",
  logOut: "Αποσύνδεση",
  uploadProgress: "Πρόοδος Μεταφόρτωσης",
  overallProgress: "Συνολική Πρόοδος",
  ofComplete: "από",
  uploading: "Μεταφόρτωση",
  processing: "Επεξεργασία",
  complete: "Ολοκληρώθηκε",
  failed: "Αποτυχία",
  savingAlbum: "Αποθήκευση Άλμπουμ",
  movingFiles: "Μετακίνηση αρχείων σε μόνιμη αποθήκευση...",
  video: "Βίντεο",
  image: "Εικόνα",
  error: "Σφάλμα",
  remove: "Αφαίρεση",
  saveAlbum: "Αποθήκευση Άλμπουμ",
  savingAlbumProgress: "Αποθήκευση Άλμπουμ...",
  addMorePhotos: "Προσθήκη Περισσότερων Φωτογραφιών",
  enterUsername: "Εισαγάγετε ένα δημόσια ορατό όνομα χρήστη.",
  usernameExample: "Για παράδειγμα, μπορείτε να χρησιμοποιήσετε το όνομά σας ή κάποιο άλλο όνομα.",
  selectUsername: "Επιλογή Ονόματος Χρήστη",
  selectUsernameDigits: "Επιλογή Ονόματος Χρήστη + 6 Ψηφία",
  usernameError: "Τα ονόματα χρήστη δημόσιου προφίλ μπορούν να χρησιμοποιούν μόνο αγγλικά γράμματα, αριθμούς ή -.",
  usernameTakenError: "Το όνομα χρήστη δημόσιου προφίλ χρησιμοποιείται ήδη. Παρακαλώ επιλέξτε άλλο.",
  photoSelected: "φωτογραφία επιλεγμένη",
  photosSelected: "φωτογραφίες επιλεγμένες",
  debugLog: "Αρχείο Καταγραφής Εντοπισμού Σφαλμάτων"
},
// Hindi
'hi': {
  myAlbums: "मेरे एल्बम",
  logOut: "लॉग आउट",
  uploadProgress: "अपलोड प्रगति",
  overallProgress: "कुल प्रगति",
  ofComplete: "में से",
  uploading: "अपलोड हो रहा है",
  processing: "प्रसंस्करण हो रहा है",
  complete: "पूर्ण",
  failed: "विफल",
  savingAlbum: "एल्बम सहेजा जा रहा है",
  movingFiles: "फ़ाइलों को स्थायी स्टोरेज में ले जाया जा रहा है...",
  video: "वीडियो",
  image: "छवि",
  error: "त्रुटि",
  remove: "हटाएं",
  saveAlbum: "एल्बम सहेजें",
  savingAlbumProgress: "एल्बम सहेजा जा रहा है...",
  addMorePhotos: "अधिक फोटो जोड़ें",
  enterUsername: "सार्वजनिक रूप से दिखाई देने वाला उपयोगकर्ता नाम दर्ज करें।",
  usernameExample: "उदाहरण के लिए, आप अपना पहला नाम या कोई अन्य नाम उपयोग कर सकते हैं।",
  selectUsername: "उपयोगकर्ता नाम चुनें",
  selectUsernameDigits: "उपयोगकर्ता नाम + 6 अंक चुनें",
  usernameError: "सार्वजनिक प्रोफाइल उपयोगकर्ता नाम केवल अंग्रेजी अक्षर, संख्या या - का उपयोग कर सकते हैं।",
  usernameTakenError: "सार्वजनिक प्रोफाइल उपयोगकर्ता नाम पहले से ही लिया गया है। कृपया दूसरा चुनें।",
  photoSelected: "फोटो चयनित",
  photosSelected: "फोटो चयनित",
  debugLog: "डीबग लॉग"
},
// Persian
'fa': {
  myAlbums: "آلبوم‌های من",
  logOut: "خروج",
  uploadProgress: "پیشرفت بارگذاری",
  overallProgress: "پیشرفت کلی",
  ofComplete: "از",
  uploading: "در حال بارگذاری",
  processing: "در حال پردازش",
  complete: "کامل شد",
  failed: "ناموفق",
  savingAlbum: "ذخیره آلبوم",
  movingFiles: "در حال انتقال فایل‌ها به فضای ذخیره‌سازی دائمی...",
  video: "ویدیو",
  image: "تصویر",
  error: "خطا",
  remove: "حذف",
  saveAlbum: "ذخیره آلبوم",
  savingAlbumProgress: "در حال ذخیره آلبوم...",
  addMorePhotos: "افزودن عکس‌های بیشتر",
  enterUsername: "یک نام کاربری قابل مشاهده عمومی وارد کنید.",
  usernameExample: "برای مثال، می‌توانید از نام کوچک خود یا نام دیگری استفاده کنید.",
  selectUsername: "انتخاب نام کاربری",
  selectUsernameDigits: "انتخاب نام کاربری + 6 رقم",
  usernameError: "نام‌های کاربری پروفایل عمومی فقط می‌توانند از حروف انگلیسی، اعداد یا - استفاده کنند.",
  usernameTakenError: "نام کاربری پروفایل عمومی قبلاً گرفته شده است. لطفاً یکی دیگر انتخاب کنید.",
  photoSelected: "عکس انتخاب شده",
  photosSelected: "عکس انتخاب شده",
  debugLog: "گزارش اشکال‌زدایی"
},
// Bengali
'bn': {
  myAlbums: "আমার অ্যালবাম",
  logOut: "লগ আউট",
  uploadProgress: "আপলোড অগ্রগতি",
  overallProgress: "সামগ্রিক অগ্রগতি",
  ofComplete: "এর মধ্যে",
  uploading: "আপলোড হচ্ছে",
  processing: "প্রক্রিয়াকরণ হচ্ছে",
  complete: "সম্পূর্ণ",
  failed: "ব্যর্থ",
  savingAlbum: "অ্যালবাম সংরক্ষণ করা হচ্ছে",
  movingFiles: "ফাইলগুলি স্থায়ী স্টোরেজে সরানো হচ্ছে...",
  video: "ভিডিও",
  image: "ছবি",
  error: "ত্রুটি",
  remove: "অপসারণ",
  saveAlbum: "অ্যালবাম সংরক্ষণ করুন",
  savingAlbumProgress: "অ্যালবাম সংরক্ষণ করা হচ্ছে...",
  addMorePhotos: "আরও ফটো যোগ করুন",
  enterUsername: "একটি সর্বজনীনভাবে দৃশ্যমান ব্যবহারকারীর নাম লিখুন।",
  usernameExample: "উদাহরণস্বরূপ, আপনি আপনার প্রথম নাম বা অন্য কোন নাম ব্যবহার করতে পারেন।",
  selectUsername: "ব্যবহারকারীর নাম নির্বাচন করুন",
  selectUsernameDigits: "ব্যবহারকারীর নাম + 6 সংখ্যা নির্বাচন করুন",
  usernameError: "পাবলিক প্রোফাইল ব্যবহারকারীর নামগুলি কেবল ইংরেজি অক্ষর, সংখ্যা বা - ব্যবহার করতে পারে।",
  usernameTakenError: "পাবলিক প্রোফাইল ব্যবহারকারীর নাম ইতিমধ্যে নেওয়া হয়েছে। অনুগ্রহ করে অন্য একটি চয়ন করুন।",
  photoSelected: "ফটো নির্বাচিত",
  photosSelected: "ফটো নির্বাচিত",
  debugLog: "ডিবাগ লগ"
},
// Tamil
'ta': {
  myAlbums: "எனது ஆல்பங்கள்",
  logOut: "வெளியேறு",
  uploadProgress: "பதிவேற்ற முன்னேற்றம்",
  overallProgress: "ஒட்டுமொத்த முன்னேற்றம்",
  ofComplete: "இல்",
  uploading: "பதிவேற்றுகிறது",
  processing: "செயலாக்குகிறது",
  complete: "முடிந்தது",
  failed: "தோல்வி",
  savingAlbum: "ஆல்பத்தை சேமிக்கிறது",
  movingFiles: "கோப்புகளை நிரந்தர சேமிப்பகத்திற்கு நகர்த்துகிறது...",
  video: "வீடியோ",
  image: "படம்",
  error: "பிழை",
  remove: "அகற்று",
  saveAlbum: "ஆல்பத்தை சேமி",
  savingAlbumProgress: "ஆல்பத்தை சேமிக்கிறது...",
  addMorePhotos: "மேலும் புகைப்படங்களைச் சேர்க்கவும்",
  enterUsername: "பொதுவாகக் காணக்கூடிய பயனர்பெயரை உள்ளிடவும்.",
  usernameExample: "எடுத்துக்காட்டாக, உங்கள் முதல் பெயரையோ அல்லது வேறு பெயரையோ பயன்படுத்தலாம்.",
  selectUsername: "பயனர்பெயரைத் தேர்ந்தெடுக்கவும்",
  selectUsernameDigits: "பயனர்பெயர் + 6 இலக்கங்களைத் தேர்ந்தெடுக்கவும்",
  usernameError: "பொது சுயவிவரப் பயனர்பெயர்கள் ஆங்கில எழுத்துக்கள், எண்கள் அல்லது - மட்டுமே பயன்படுத்த முடியும்.",
  usernameTakenError: "பொது சுயவிவரப் பயனர்பெயர் ஏற்கனவே எடுக்கப்பட்டுள்ளது. தயவுசெய்து வேறொன்றைத் தேர்ந்தெடுக்கவும்.",
  photoSelected: "புகைப்படம் தேர்ந்தெடுக்கப்பட்டது",
  photosSelected: "புகைப்படங்கள் தேர்ந்தெடுக்கப்பட்டன",
  debugLog: "பிழைத்திருத்த பதிவு"
},
// Telugu
'te': {
  myAlbums: "నా ఆల్బమ్స్",
  logOut: "లాగ్ అవుట్",
  uploadProgress: "అప్‌లోడ్ పురోగతి",
  overallProgress: "మొత్తం పురోగతి",
  ofComplete: "లో",
  uploading: "అప్‌లోడ్ చేస్తోంది",
  processing: "ప్రాసెస్ చేస్తోంది",
  complete: "పూర్తయింది",
  failed: "విఫలమైంది",
  savingAlbum: "ఆల్బమ్‌ని సేవ్ చేస్తోంది",
  movingFiles: "ఫైల్స్‌ని శాశ్వత నిల్వకు తరలిస్తోంది...",
  video: "వీడియో",
  image: "చిత్రం",
  error: "లోపం",
  remove: "తొలగించు",
  saveAlbum: "ఆల్బమ్‌ని సేవ్ చేయి",
  savingAlbumProgress: "ఆల్బమ్‌ని సేవ్ చేస్తోంది...",
  addMorePhotos: "మరిన్ని ఫోటోలు జోడించండి",
  enterUsername: "బహిరంగంగా కనిపించే వినియోగదారు పేరును నమోదు చేయండి.",
  usernameExample: "ఉదాహరణకు, మీరు మీ మొదటి పేరు లేదా మరొక పేరును ఉపయోగించవచ్చు.",
  selectUsername: "వినియోగదారు పేరును ఎంచుకోండి",
  selectUsernameDigits: "వినియోగదారు పేరు + 6 అంకెలను ఎంచుకోండి",
  usernameError: "పబ్లిక్ ప్రొఫైల్ వినియోగదారు పేర్లు ఆంగ్ల అక్షరాలు, సంఖ్యలు లేదా - మాత్రమే ఉపయోగించగలవు.",
  usernameTakenError: "పబ్లిక్ ప్రొఫైల్ వినియోగదారు పేరు ఇప్పటికే తీసుకోబడింది. దయచేసి మరొకదాన్ని ఎంచుకోండి.",
  photoSelected: "ఫోటో ఎంచుకోబడింది",
  photosSelected: "ఫోటోలు ఎంచుకోబడ్డాయి",
  debugLog: "డీబగ్ లాగ్"
},
// Kannada
'kn': {
  myAlbums: "ನನ್ನ ಆಲ್ಬಮ್‌ಗಳು",
  logOut: "ಲಾಗ್ ಔಟ್",
  uploadProgress: "ಅಪ್‌ಲೋಡ್ ಪ್ರಗತಿ",
  overallProgress: "ಒಟ್ಟಾರೆ ಪ್ರಗತಿ",
  ofComplete: "ರಲ್ಲಿ",
  uploading: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ",
  processing: "ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ",
  complete: "ಪೂರ್ಣಗೊಂಡಿದೆ",
  failed: "ವಿಫಲವಾಗಿದೆ",
  savingAlbum: "ಆಲ್ಬಮ್ ಉಳಿಸಲಾಗುತ್ತಿದೆ",
  movingFiles: "ಫೈಲ್‌ಗಳನ್ನು ಶಾಶ್ವತ ಸಂಗ್ರಹಣೆಗೆ ಸರಿಸಲಾಗುತ್ತಿದೆ...",
  video: "ವೀಡಿಯೊ",
  image: "ಚಿತ್ರ",
  error: "ದೋಷ",
  remove: "ತೆಗೆದುಹಾಕಿ",
  saveAlbum: "ಆಲ್ಬಮ್ ಉಳಿಸಿ",
  savingAlbumProgress: "ಆಲ್ಬಮ್ ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
  addMorePhotos: "ಹೆಚ್ಚಿನ ಫೋಟೋಗಳನ್ನು ಸೇರಿಸಿ",
  enterUsername: "ಸಾರ್ವಜನಿಕವಾಗಿ ಗೋಚರಿಸುವ ಬಳಕೆದಾರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
  usernameExample: "ಉದಾಹರಣೆಗೆ, ನೀವು ನಿಮ್ಮ ಮೊದಲ ಹೆಸರು ಅಥವಾ ಬೇರೆ ಹೆಸರನ್ನು ಬಳಸಬಹುದು.",
  selectUsername: "ಬಳಕೆದಾರ ಹೆಸರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  selectUsernameDigits: "ಬಳಕೆದಾರ ಹೆಸರು + 6 ಅಂಕಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  usernameError: "ಸಾರ್ವಜನಿಕ ಪ್ರೊಫೈಲ್ ಬಳಕೆದಾರ ಹೆಸರುಗಳು ಇಂಗ್ಲಿಷ್ ಅಕ್ಷರಗಳು, ಸಂಖ್ಯೆಗಳು ಅಥವಾ - ಮಾತ್ರ ಬಳಸಬಹುದು.",
  usernameTakenError: "ಸಾರ್ವಜನಿಕ ಪ್ರೊಫೈಲ್ ಬಳಕೆದಾರ ಹೆಸರು ಈಗಾಗಲೇ ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  photoSelected: "ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ",
  photosSelected: "ಫೋಟೋಗಳು ಆಯ್ಕೆ ಮಾಡಲಾಗಿವೆ",
  debugLog: "ಡೀಬಗ್ ಲಾಗ್"
},
// Malayalam
'ml': {
  myAlbums: "എന്റെ ആൽബങ്ങൾ",
  logOut: "ലോഗ് ഔട്ട്",
  uploadProgress: "അപ്‌ലോഡ് പുരോഗതി",
  overallProgress: "മൊത്തത്തിലുള്ള പുരോഗതി",
  ofComplete: "ൽ നിന്ന്",
  uploading: "അപ്‌ലോഡ് ചെയ്യുന്നു",
  processing: "പ്രോസസ്സ് ചെയ്യുന്നു",
  complete: "പൂർത്തിയായി",
  failed: "പരാജയപ്പെട്ടു",
  savingAlbum: "ആൽബം സേവ് ചെയ്യുന്നു",
  movingFiles: "ഫയലുകൾ സ്ഥിരമായ സംഭരണത്തിലേക്ക് നീക്കുന്നു...",
  video: "വീഡിയോ",
  image: "ചിത്രം",
  error: "പിശക്",
  remove: "നീക്കം ചെയ്യുക",
  saveAlbum: "ആൽബം സേവ് ചെയ്യുക",
  savingAlbumProgress: "ആൽബം സേവ് ചെയ്യുന്നു...",
  addMorePhotos: "കൂടുതൽ ഫോട്ടോകൾ ചേർക്കുക",
  enterUsername: "പൊതുവായി കാണാവുന്ന ഒരു ഉപയോക്തൃനാമം നൽകുക.",
  usernameExample: "ഉദാഹരണത്തിന്, നിങ്ങളുടെ പേരോ മറ്റൊരു പേരോ ഉപയോഗിക്കാം.",
  selectUsername: "ഉപയോക്തൃനാമം തിരഞ്ഞെടുക്കുക",
  selectUsernameDigits: "ഉപയോക്തൃനാമം + 6 അക്കങ്ങൾ തിരഞ്ഞെടുക്കുക",
  usernameError: "പൊതു പ്രൊഫൈൽ ഉപയോക്തൃനാമങ്ങൾക്ക് ഇംഗ്ലീഷ് അക്ഷരങ്ങൾ, അക്കങ്ങൾ അല്ലെങ്കിൽ - മാത്രമേ ഉപയോഗിക്കാൻ കഴിയൂ.",
  usernameTakenError: "പൊതു പ്രൊഫൈൽ ഉപയോക്തൃനാമം ഇതിനകം എടുത്തിരിക്കുന്നു. ദയവായി മറ്റൊന്ന് തിരഞ്ഞെടുക്കുക.",
  photoSelected: "ഫോട്ടോ തിരഞ്ഞെടുത്തു",
  photosSelected: "ഫോട്ടോകൾ തിരഞ്ഞെടുത്തു",
  debugLog: "ഡീബഗ് ലോഗ്"
},
// Marathi
'mr': {
  myAlbums: "माझे अल्बम",
  logOut: "लॉग आउट",
  uploadProgress: "अपलोड प्रगती",
  overallProgress: "एकूण प्रगती",
  ofComplete: "पैकी",
  uploading: "अपलोड करत आहे",
  processing: "प्रक्रिया करत आहे",
  complete: "पूर्ण",
  failed: "अयशस्वी",
  savingAlbum: "अल्बम साठवत आहे",
  movingFiles: "फाईल्स कायमस्वरूपी स्टोरेजमध्ये हलवत आहे...",
  video: "व्हिडिओ",
  image: "प्रतिमा",
  error: "त्रुटी",
  remove: "काढा",
  saveAlbum: "अल्बम साठवा",
  savingAlbumProgress: "अल्बम साठवत आहे...",
  addMorePhotos: "अधिक फोटो जोडा",
  enterUsername: "सार्वजनिकरित्या दिसणारे वापरकर्तानाव प्रविष्ट करा.",
  usernameExample: "उदाहरणार्थ, आपण आपले पहिले नाव किंवा अन्य नाव वापरू शकता.",
  selectUsername: "वापरकर्तानाव निवडा",
  selectUsernameDigits: "वापरकर्तानाव + 6 अंक निवडा",
  usernameError: "सार्वजनिक प्रोफाइल वापरकर्तानावे फक्त इंग्रजी अक्षरे, संख्या किंवा - वापरू शकतात.",
  usernameTakenError: "सार्वजनिक प्रोफाइल वापरकर्तानाव आधीच घेतले आहे. कृपया दुसरे निवडा.",
  photoSelected: "फोटो निवडला",
  photosSelected: "फोटो निवडले",
  debugLog: "डीबग लॉग"
},
// Urdu
'ur': {
  myAlbums: "میرے البمز",
  logOut: "لاگ آؤٹ",
  uploadProgress: "اپلوڈ کی ترقی",
  overallProgress: "مجموعی ترقی",
  ofComplete: "میں سے",
  uploading: "اپلوڈ ہو رہا ہے",
  processing: "پروسیسنگ ہو رہی ہے",
  complete: "مکمل",
  failed: "ناکام",
  savingAlbum: "البم محفوظ ہو رہا ہے",
  movingFiles: "فائلوں کو مستقل اسٹوریج میں منتقل کیا جا رہا ہے...",
  video: "ویڈیو",
  image: "تصویر",
  error: "خرابی",
  remove: "ہٹائیں",
  saveAlbum: "البم محفوظ کریں",
  savingAlbumProgress: "البم محفوظ ہو رہا ہے...",
  addMorePhotos: "مزید تصاویر شامل کریں",
  enterUsername: "ایک عوامی طور پر نظر آنے والا صارف نام درج کریں۔",
  usernameExample: "مثال کے طور پر، آپ اپنا پہلا نام یا کوئی اور نام استعمال کر سکتے ہیں۔",
  selectUsername: "صارف نام منتخب کریں",
  selectUsernameDigits: "صارف نام + 6 ہندسے منتخب کریں",
  usernameError: "عوامی پروفائل صارف ناموں میں صرف انگریزی حروف، نمبر یا - استعمال کیے جا سکتے ہیں۔",
  usernameTakenError: "عوامی پروفائل صارف نام پہلے سے لیا جا چکا ہے۔ براہ کرم کوئی اور منتخب کریں۔",
  photoSelected: "تصویر منتخب کی گئی",
  photosSelected: "تصاویر منتخب کی گئیں",
  debugLog: "ڈیبگ لاگ"
},
'zh-HK': {
  myAlbums: "我的相簿",
  logOut: "登出",
  uploadProgress: "上傳進度",
  overallProgress: "整體進度",
  ofComplete: "共",
  uploading: "上傳中",
  processing: "處理中",
  complete: "完成",
  failed: "失敗",
  savingAlbum: "儲存相簿",
  movingFiles: "正在將檔案移至永久儲存位置...",
  video: "影片",
  image: "圖片",
  error: "錯誤",
  remove: "移除",
  saveAlbum: "儲存相簿",
  savingAlbumProgress: "正在儲存相簿...",
  addMorePhotos: "新增更多照片",
  enterUsername: "輸入一個公開顯示的用戶名稱。",
  usernameExample: "例如，您可以使用您的名字或其他名稱。",
  selectUsername: "選擇用戶名稱",
  selectUsernameDigits: "選擇用戶名稱 + 6位數字",
  usernameError: "公開個人檔案用戶名稱只能使用英文字母、數字或-。",
  usernameTakenError: "公開個人檔案用戶名稱已被佔用。請選擇其他用戶名稱。",
  photoSelected: "張照片已選擇",
  photosSelected: "張照片已選擇",
  debugLog: "偵錯日誌"
},
// Chinese - Traditional
'zh-TW': {
  myAlbums: "我的相簿",
  logOut: "登出",
  uploadProgress: "上傳進度",
  overallProgress: "整體進度",
  ofComplete: "共",
  uploading: "上傳中",
  processing: "處理中",
  complete: "完成",
  failed: "失敗",
  savingAlbum: "儲存相簿",
  movingFiles: "正在將檔案移至永久儲存位置...",
  video: "影片",
  image: "圖片",
  error: "錯誤",
  remove: "移除",
  saveAlbum: "儲存相簿",
  savingAlbumProgress: "正在儲存相簿...",
  addMorePhotos: "新增更多照片",
  enterUsername: "輸入一個公開顯示的用戶名稱。",
  usernameExample: "例如，您可以使用您的名字或其他名稱。",
  selectUsername: "選擇用戶名稱",
  selectUsernameDigits: "選擇用戶名稱 + 6位數字",
  usernameError: "公開個人檔案用戶名稱只能使用英文字母、數字或-。",
  usernameTakenError: "公開個人檔案用戶名稱已被佔用。請選擇其他用戶名稱。",
  photoSelected: "張照片已選擇",
  photosSelected: "張照片已選擇",
  debugLog: "偵錯日誌"
},
// Afrikaans
'af': {
  myAlbums: "My Albums",
  logOut: "Teken Uit",
  uploadProgress: "Oplaai Vordering",
  overallProgress: "Algehele Vordering",
  ofComplete: "van",
  uploading: "Laai tans op",
  processing: "Verwerk tans",
  complete: "Voltooi",
  failed: "Misluk",
  savingAlbum: "Stoor Album",
  movingFiles: "Skuif lêers na permanente berging...",
  video: "Video",
  image: "Beeld",
  error: "Fout",
  remove: "Verwyder",
  saveAlbum: "Stoor Album",
  savingAlbumProgress: "Stoor Album...",
  addMorePhotos: "Voeg Meer Foto's by",
  enterUsername: "Voer 'n openbaar sigbare gebruikersnaam in.",
  usernameExample: "Byvoorbeeld, jy kan jou voornaam of 'n ander naam gebruik.",
  selectUsername: "Kies Gebruikersnaam",
  selectUsernameDigits: "Kies Gebruikersnaam + 6 Syfers",
  usernameError: "Openbare profiel gebruikersname kan slegs Engelse letters, syfers of - gebruik.",
  usernameTakenError: "Openbare profiel gebruikersnaam is reeds geneem. Kies asseblief 'n ander een.",
  photoSelected: "foto gekies",
  photosSelected: "foto's gekies",
  debugLog: "Ontfoutlogboek"
},
// Azerbaijani
'az': {
  myAlbums: "Mənim Albomlarım",
  logOut: "Çıxış",
  uploadProgress: "Yükləmə Proqresi",
  overallProgress: "Ümumi Proqres",
  ofComplete: "/",
  uploading: "Yüklənir",
  processing: "İşlənir",
  complete: "Tamamlandı",
  failed: "Uğursuz",
  savingAlbum: "Albom Saxlanılır",
  movingFiles: "Fayllar daimi yaddaşa köçürülür...",
  video: "Video",
  image: "Şəkil",
  error: "Xəta",
  remove: "Sil",
  saveAlbum: "Albomu Saxla",
  savingAlbumProgress: "Albom Saxlanılır...",
  addMorePhotos: "Daha Çox Şəkil Əlavə Et",
  enterUsername: "İctimai görünən istifadəçi adı daxil edin.",
  usernameExample: "Məsələn, adınızı və ya başqa bir adı istifadə edə bilərsiniz.",
  selectUsername: "İstifadəçi Adı Seçin",
  selectUsernameDigits: "İstifadəçi Adı + 6 Rəqəm Seçin",
  usernameError: "İctimai profil istifadəçi adları yalnız ingilis hərfləri, rəqəmlər və ya - istifadə edə bilər.",
  usernameTakenError: "İctimai profil istifadəçi adı artıq götürülüb. Lütfən, başqasını seçin.",
  photoSelected: "şəkil seçildi",
  photosSelected: "şəkil seçildi",
  debugLog: "Səhv ayıklama jurnalı"
},
// Basque
'eu': {
  myAlbums: "Nire Albumak",
  logOut: "Saioa Itxi",
  uploadProgress: "Kargatze Aurrerapena",
  overallProgress: "Aurrerapen Orokorra",
  ofComplete: "/",
  uploading: "Kargatzen",
  processing: "Prozesatzen",
  complete: "Osatuta",
  failed: "Huts egin du",
  savingAlbum: "Albuma Gordetzen",
  movingFiles: "Fitxategiak biltegiratze iraunkorrera mugitzen...",
  video: "Bideoa",
  image: "Irudia",
  error: "Errorea",
  remove: "Kendu",
  saveAlbum: "Gorde Albuma",
  savingAlbumProgress: "Albuma Gordetzen...",
  addMorePhotos: "Gehitu Argazki Gehiago",
  enterUsername: "Sartu publikoki ikusgai den erabiltzaile-izen bat.",
  usernameExample: "Adibidez, zure izena edo beste izen bat erabil dezakezu.",
  selectUsername: "Hautatu Erabiltzaile-izena",
  selectUsernameDigits: "Hautatu Erabiltzaile-izena + 6 Digito",
  usernameError: "Profil publikoko erabiltzaile-izenek ingelesezko letrak, zenbakiak edo - bakarrik erabil ditzakete.",
  usernameTakenError: "Profil publikoko erabiltzaile-izena hartuta dago. Mesedez, aukeratu beste bat.",
  photoSelected: "argazki hautatuta",
  photosSelected: "argazki hautatuta",
  debugLog: "Arazketa Erregistroa"
},
// Bulgarian
'bg': {
  myAlbums: "Моите Албуми",
  logOut: "Изход",
  uploadProgress: "Напредък на Качването",
  overallProgress: "Общ Напредък",
  ofComplete: "от",
  uploading: "Качване",
  processing: "Обработване",
  complete: "Завършено",
  failed: "Неуспешно",
  savingAlbum: "Запазване на Албума",
  movingFiles: "Преместване на файловете в постоянно хранилище...",
  video: "Видео",
  image: "Изображение",
  error: "Грешка",
  remove: "Премахване",
  saveAlbum: "Запази Албума",
  savingAlbumProgress: "Запазване на Албума...",
  addMorePhotos: "Добави Още Снимки",
  enterUsername: "Въведете публично видимо потребителско име.",
  usernameExample: "Например, можете да използвате собственото си име или друго име.",
  selectUsername: "Изберете Потребителско Име",
  selectUsernameDigits: "Изберете Потребителско Име + 6 Цифри",
  usernameError: "Потребителските имена за публичен профил могат да използват само английски букви, цифри или -.",
  usernameTakenError: "Потребителското име за публичен профил вече е заето. Моля, изберете друго.",
  photoSelected: "избрана снимка",
  photosSelected: "избрани снимки",
  debugLog: "Дневник за Отстраняване на Грешки"
},
// Catalan
'ca': {
  myAlbums: "Els Meus Àlbums",
  logOut: "Tancar Sessió",
  uploadProgress: "Progrés de Càrrega",
  overallProgress: "Progrés General",
  ofComplete: "de",
  uploading: "Carregant",
  processing: "Processant",
  complete: "Completat",
  failed: "Fallit",
  savingAlbum: "Desant l'Àlbum",
  movingFiles: "Movent arxius a l'emmagatzematge permanent...",
  video: "Vídeo",
  image: "Imatge",
  error: "Error",
  remove: "Eliminar",
  saveAlbum: "Desar Àlbum",
  savingAlbumProgress: "Desant l'Àlbum...",
  addMorePhotos: "Afegir Més Fotos",
  enterUsername: "Introdueix un nom d'usuari visible públicament.",
  usernameExample: "Per exemple, pots utilitzar el teu nom o un altre nom.",
  selectUsername: "Seleccionar Nom d'Usuari",
  selectUsernameDigits: "Seleccionar Nom d'Usuari + 6 Dígits",
  usernameError: "Els noms d'usuari de perfil públic només poden utilitzar lletres angleses, números o -.",
  usernameTakenError: "El nom d'usuari de perfil públic ja està en ús. Si us plau, escull-ne un altre.",
  photoSelected: "foto seleccionada",
  photosSelected: "fotos seleccionades",
  debugLog: "Registre de Depuració"
},
// Estonian
'et': {
  myAlbums: "Minu Albumid",
  logOut: "Logi Välja",
  uploadProgress: "Üleslaadimise Edenemine",
  overallProgress: "Üldine Edenemine",
  ofComplete: "/",
  uploading: "Üleslaadimine",
  processing: "Töötlemine",
  complete: "Lõpetatud",
  failed: "Ebaõnnestus",
  savingAlbum: "Albumi Salvestamine",
  movingFiles: "Failide liigutamine püsihoidlasse...",
  video: "Video",
  image: "Pilt",
  error: "Viga",
  remove: "Eemalda",
  saveAlbum: "Salvesta Album",
  savingAlbumProgress: "Albumi Salvestamine...",
  addMorePhotos: "Lisa Rohkem Fotosid",
  enterUsername: "Sisesta avalikult nähtav kasutajanimi.",
  usernameExample: "Näiteks võid kasutada oma eesnime või muud nime.",
  selectUsername: "Vali Kasutajanimi",
  selectUsernameDigits: "Vali Kasutajanimi + 6 Numbrit",
  usernameError: "Avaliku profiili kasutajanimed võivad kasutada ainult inglise tähti, numbreid või -.",
  usernameTakenError: "Avaliku profiili kasutajanimi on juba võetud. Palun vali teine.",
  photoSelected: "foto valitud",
  photosSelected: "fotot valitud",
  debugLog: "Silumislogi"
},
// Galician
'gl': {
  myAlbums: "Os Meus Álbums",
  logOut: "Pechar Sesión",
  uploadProgress: "Progreso de Carga",
  overallProgress: "Progreso Xeral",
  ofComplete: "de",
  uploading: "Cargando",
  processing: "Procesando",
  complete: "Completado",
  failed: "Fallido",
  savingAlbum: "Gardando Álbum",
  movingFiles: "Movendo arquivos ao almacenamento permanente...",
  video: "Vídeo",
  image: "Imaxe",
  error: "Erro",
  remove: "Eliminar",
  saveAlbum: "Gardar Álbum",
  savingAlbumProgress: "Gardando Álbum...",
  addMorePhotos: "Engadir Máis Fotos",
  enterUsername: "Introduce un nome de usuario visible publicamente.",
  usernameExample: "Por exemplo, podes usar o teu nome ou outro nome.",
  selectUsername: "Seleccionar Nome de Usuario",
  selectUsernameDigits: "Seleccionar Nome de Usuario + 6 Díxitos",
  usernameError: "Os nomes de usuario de perfil público só poden usar letras inglesas, números ou -.",
  usernameTakenError: "O nome de usuario de perfil público xa está en uso. Por favor, escolle outro.",
  photoSelected: "foto seleccionada",
  photosSelected: "fotos seleccionadas",
  debugLog: "Rexistro de Depuración"
},
// Gujarati
'gu': {
  myAlbums: "મારા આલ્બમ્સ",
  logOut: "લોગ આઉટ",
  uploadProgress: "અપલોડ પ્રગતિ",
  overallProgress: "સમગ્ર પ્રગતિ",
  ofComplete: "માંથી",
  uploading: "અપલોડ થઈ રહ્યું છે",
  processing: "પ્રક્રિયા થઈ રહી છે",
  complete: "પૂર્ણ",
  failed: "નિષ્ફળ",
  savingAlbum: "આલ્બમ સાચવી રહ્યું છે",
  movingFiles: "ફાઇલોને કાયમી સ્ટોરેજમાં ખસેડી રહ્યું છે...",
  video: "વિડિઓ",
  image: "છબી",
  error: "ભૂલ",
  remove: "દૂર કરો",
  saveAlbum: "આલ્બમ સાચવો",
  savingAlbumProgress: "આલ્બમ સાચવી રહ્યું છે...",
  addMorePhotos: "વધુ ફોટા ઉમેરો",
  enterUsername: "જાહેરમાં દૃશ્યમાન વપરાશકર્તા નામ દાખલ કરો.",
  usernameExample: "ઉદાહરણ તરીકે, તમે તમારું પ્રથમ નામ અથવા અન્ય નામનો ઉપયોગ કરી શકો છો.",
  selectUsername: "વપરાશકર્તા નામ પસંદ કરો",
  selectUsernameDigits: "વપરાશકર્તા નામ + 6 અંક પસંદ કરો",
  usernameError: "જાહેર પ્રોફાઇલ વપરાશકર્તા નામો માત્ર અંગ્રેજી અક્ષરો, સંખ્યાઓ અથવા - નો ઉપયોગ કરી શકે છે.",
  usernameTakenError: "જાહેર પ્રોફાઇલ વપરાશકર્તા નામ પહેલેથી લેવામાં આવ્યું છે. કૃપા કરીને બીજું પસંદ કરો.",
  photoSelected: "ફોટો પસંદ કર્યો",
  photosSelected: "ફોટા પસંદ કર્યા",
  debugLog: "ડીબગ લોગ"
},
// Icelandic
'is': {
  myAlbums: "Albúmin Mín",
  logOut: "Útskrá",
  uploadProgress: "Framvinda Upphleðslu",
  overallProgress: "Heildarframvinda",
  ofComplete: "af",
  uploading: "Hleður upp",
  processing: "Vinnur",
  complete: "Lokið",
  failed: "Mistókst",
  savingAlbum: "Vistar Albúm",
  movingFiles: "Færir skrár í varanlega geymslu...",
  video: "Myndband",
  image: "Mynd",
  error: "Villa",
  remove: "Fjarlægja",
  saveAlbum: "Vista Albúm",
  savingAlbumProgress: "Vistar Albúm...",
  addMorePhotos: "Bæta við Fleiri Myndum",
  enterUsername: "Sláðu inn notandanafn sem er sýnilegt öllum.",
  usernameExample: "Til dæmis geturðu notað fornafnið þitt eða annað nafn.",
  selectUsername: "Veldu Notandanafn",
  selectUsernameDigits: "Veldu Notandanafn + 6 Tölustafir",
  usernameError: "Opinber prófílnotandanöfn geta aðeins notað ensk bókstafi, tölustafi eða -.",
  usernameTakenError: "Opinbert prófílnotandanafn er þegar tekið. Vinsamlegast veldu annað.",
  photoSelected: "mynd valin",
  photosSelected: "myndir valdar",
  debugLog: "Aflúsunarskrá"
},
// Kazakh
'kk': {
  myAlbums: "Менің Альбомдарым",
  logOut: "Шығу",
  uploadProgress: "Жүктеу Барысы",
  overallProgress: "Жалпы Барыс",
  ofComplete: "/",
  uploading: "Жүктелуде",
  processing: "Өңделуде",
  complete: "Аяқталды",
  failed: "Сәтсіз",
  savingAlbum: "Альбомды Сақтау",
  movingFiles: "Файлдарды тұрақты сақтау орнына жылжытуда...",
  video: "Бейне",
  image: "Сурет",
  error: "Қате",
  remove: "Жою",
  saveAlbum: "Альбомды Сақтау",
  savingAlbumProgress: "Альбомды Сақтауда...",
  addMorePhotos: "Тағы Фотосуреттер Қосу",
  enterUsername: "Жалпыға көрінетін пайдаланушы атын енгізіңіз.",
  usernameExample: "Мысалы, сіз өз атыңызды немесе басқа атты қолдана аласыз.",
  selectUsername: "Пайдаланушы Атын Таңдау",
  selectUsernameDigits: "Пайдаланушы Аты + 6 Сан Таңдау",
  usernameError: "Жалпы профильдегі пайдаланушы аттары тек ағылшын әріптерін, сандарды немесе - қолдана алады.",
  usernameTakenError: "Жалпы профиль пайдаланушы аты қазірдің өзінде алынған. Басқасын таңдаңыз.",
  photoSelected: "фотосурет таңдалды",
  photosSelected: "фотосурет таңдалды",
  debugLog: "Жөндеу Журналы"
},
// Kyrgyz
'ky': {
  myAlbums: "Менин Альбомдорум",
  logOut: "Чыгуу",
  uploadProgress: "Жүктөө Прогресси",
  overallProgress: "Жалпы Прогресс",
  ofComplete: "/",
  uploading: "Жүктөлүүдө",
  processing: "Иштетилүүдө",
  complete: "Аяктады",
  failed: "Ийгиликсиз",
  savingAlbum: "Альбом Сакталууда",
  movingFiles: "Файлдар туруктуу сактагычка жылдырылууда...",
  video: "Видео",
  image: "Сүрөт",
  error: "Ката",
  remove: "Алып салуу",
  saveAlbum: "Альбомду Сактоо",
  savingAlbumProgress: "Альбом Сакталууда...",
  addMorePhotos: "Дагы Сүрөттөрдү Кошуу",
  enterUsername: "Ачык көрүнгөн колдонуучу атын киргизиңиз.",
  usernameExample: "Мисалы, сиз өз атыңызды же башка атты колдоно аласыз.",
  selectUsername: "Колдонуучу Атын Тандоо",
  selectUsernameDigits: "Колдонуучу Аты + 6 Сан Тандоо",
  usernameError: "Ачык профилдин колдонуучу аттары англис тамгаларын, сандарды же - гана колдоно алат.",
  usernameTakenError: "Ачык профилдин колдонуучу аты мурунтан эле алынган. Сураныч, башкасын тандаңыз.",
  photoSelected: "сүрөт тандалды",
  photosSelected: "сүрөт тандалды",
  debugLog: "Мүчүлүштүктөрдү Оңдоо Журналы"
},
// Lao
'lo': {
  myAlbums: "ອະລະບ້ຳຂອງຂ້ອຍ",
  logOut: "ອອກຈາກລະບົບ",
  uploadProgress: "ຄວາມຄືບໜ້າການອັບໂຫຼດ",
  overallProgress: "ຄວາມຄືບໜ້າທັງໝົດ",
  ofComplete: "ຈາກ",
  uploading: "ກຳລັງອັບໂຫຼດ",
  processing: "ກຳລັງປະມວນຜົນ",
  complete: "ສຳເລັດ",
  failed: "ລົ້ມເຫລວ",
  savingAlbum: "ກຳລັງບັນທຶກອະລະບ້ຳ",
  movingFiles: "ກຳລັງຍ້າຍໄຟລ໌ໄປຍັງບ່ອນເກັບຖາວອນ...",
  video: "ວິດີໂອ",
  image: "ຮູບພາບ",
  error: "ຂໍ້ຜິດພາດ",
  remove: "ລຶບ",
  saveAlbum: "ບັນທຶກອະລະບ້ຳ",
  savingAlbumProgress: "ກຳລັງບັນທຶກອະລະບ້ຳ...",
  addMorePhotos: "ເພີ່ມຮູບພາບອີກ",
  enterUsername: "ໃສ່ຊື່ຜູ້ໃຊ້ທີ່ເຫັນໄດ້ໃນທີ່ສາທາລະນະ.",
  usernameExample: "ຕົວຢ່າງ, ທ່ານສາມາດໃຊ້ຊື່ຂອງທ່ານຫຼືຊື່ອື່ນໄດ້.",
  selectUsername: "ເລືອກຊື່ຜູ້ໃຊ້",
  selectUsernameDigits: "ເລືອກຊື່ຜູ້ໃຊ້ + 6 ຕົວເລກ",
  usernameError: "ຊື່ຜູ້ໃຊ້ໂປຣໄຟລ໌ສາທາລະນະສາມາດໃຊ້ພຽງແຕ່ຕົວອັກສອນພາສາອັງກິດ, ຕົວເລກ, ຫຼື -.",
  usernameTakenError: "ຊື່ຜູ້ໃຊ້ໂປຣໄຟລ໌ສາທາລະນະຖືກໃຊ້ແລ້ວ. ກະລຸນາເລືອກຊື່ອື່ນ.",
  photoSelected: "ຮູບພາບທີ່ເລືອກ",
  photosSelected: "ຮູບພາບທີ່ເລືອກ",
  debugLog: "ບັນທຶກການແກ້ໄຂຂໍ້ຜິດພາດ"
},
// Lithuanian
'lt': {
  myAlbums: "Mano Albumai",
  logOut: "Atsijungti",
  uploadProgress: "Įkėlimo Progresas",
  overallProgress: "Bendras Progresas",
  ofComplete: "iš",
  uploading: "Įkeliama",
  processing: "Apdorojama",
  complete: "Baigta",
  failed: "Nepavyko",
  savingAlbum: "Išsaugomas Albumas",
  movingFiles: "Perkeliami failai į nuolatinę saugyklą...",
  video: "Vaizdo įrašas",
  image: "Nuotrauka",
  error: "Klaida",
  remove: "Pašalinti",
  saveAlbum: "Išsaugoti Albumą",
  savingAlbumProgress: "Išsaugomas Albumas...",
  addMorePhotos: "Pridėti Daugiau Nuotraukų",
  enterUsername: "Įveskite viešai matomą vartotojo vardą.",
  usernameExample: "Pavyzdžiui, galite naudoti savo vardą ar kitą vardą.",
  selectUsername: "Pasirinkti Vartotojo Vardą",
  selectUsernameDigits: "Pasirinkti Vartotojo Vardą + 6 Skaitmenys",
  usernameError: "Viešo profilio vartotojo varduose galima naudoti tik angliškas raides, skaičius arba -.",
  usernameTakenError: "Viešo profilio vartotojo vardas jau užimtas. Prašome pasirinkti kitą.",
  photoSelected: "pasirinkta nuotrauka",
  photosSelected: "pasirinktos nuotraukos",
  debugLog: "Derinimo Žurnalas"
},
// Latvian
'lv': {
  myAlbums: "Mani Albumi",
  logOut: "Iziet",
  uploadProgress: "Augšupielādes Progress",
  overallProgress: "Kopējais Progress",
  ofComplete: "no",
  uploading: "Augšupielādē",
  processing: "Apstrādā",
  complete: "Pabeigts",
  failed: "Neizdevās",
  savingAlbum: "Saglabā Albumu",
  movingFiles: "Pārvieto failus uz pastāvīgo krātuvi...",
  video: "Video",
  image: "Attēls",
  error: "Kļūda",
  remove: "Noņemt",
  saveAlbum: "Saglabāt Albumu",
  savingAlbumProgress: "Saglabā Albumu...",
  addMorePhotos: "Pievienot Vairāk Fotoattēlu",
  enterUsername: "Ievadiet publiski redzamu lietotājvārdu.",
  usernameExample: "Piemēram, varat izmantot savu vārdu vai citu vārdu.",
  selectUsername: "Izvēlēties Lietotājvārdu",
  selectUsernameDigits: "Izvēlēties Lietotājvārdu + 6 Cipari",
  usernameError: "Publiskā profila lietotājvārdi var izmantot tikai angļu burtus, ciparus vai -.",
  usernameTakenError: "Publiskā profila lietotājvārds jau ir aizņemts. Lūdzu, izvēlieties citu.",
  photoSelected: "fotoattēls atlasīts",
  photosSelected: "fotoattēli atlasīti",
  debugLog: "Atkļūdošanas Žurnāls"
},
// Macedonian
'mk': {
  myAlbums: "Мои Албуми",
  logOut: "Одјава",
  uploadProgress: "Напредок на Прикачување",
  overallProgress: "Вкупен Напредок",
  ofComplete: "од",
  uploading: "Се прикачува",
  processing: "Се обработува",
  complete: "Завршено",
  failed: "Неуспешно",
  savingAlbum: "Зачувување на Албумот",
  movingFiles: "Преместување на датотеки во трајно складиште...",
  video: "Видео",
  image: "Слика",
  error: "Грешка",
  remove: "Отстрани",
  saveAlbum: "Зачувај Албум",
  savingAlbumProgress: "Зачувување на Албумот...",
  addMorePhotos: "Додај Уште Фотографии",
  enterUsername: "Внесете јавно видливо корисничко име.",
  usernameExample: "На пример, можете да го користите вашето име или друго име.",
  selectUsername: "Избери Корисничко Име",
  selectUsernameDigits: "Избери Корисничко Име + 6 Бројки",
  usernameError: "Корисничките имиња на јавниот профил може да користат само англиски букви, броеви или -.",
  usernameTakenError: "Корисничкото име на јавниот профил е веќе зафатено. Ве молиме изберете друго.",
  photoSelected: "избрана фотографија",
  photosSelected: "избрани фотографии",
  debugLog: "Дневник за Дебагирање"
},
// Mongolian
'mn': {
  myAlbums: "Миний Цомгууд",
  logOut: "Гарах",
  uploadProgress: "Байршуулалтын Явц",
  overallProgress: "Нийт Явц",
  ofComplete: "/",
  uploading: "Байршуулж байна",
  processing: "Боловсруулж байна",
  complete: "Дууссан",
  failed: "Амжилтгүй",
  savingAlbum: "Цомог Хадгалж Байна",
  movingFiles: "Файлуудыг байнгын хадгалах руу зөөж байна...",
  video: "Видео",
  image: "Зураг",
  error: "Алдаа",
  remove: "Устгах",
  saveAlbum: "Цомог Хадгалах",
  savingAlbumProgress: "Цомог Хадгалж Байна...",
  addMorePhotos: "Илүү Олон Зураг Нэмэх",
  enterUsername: "Нийтэд харагдах хэрэглэгчийн нэрийг оруулна уу.",
  usernameExample: "Жишээлбэл, та өөрийн нэр эсвэл өөр нэрийг ашиглаж болно.",
  selectUsername: "Хэрэглэгчийн Нэр Сонгох",
  selectUsernameDigits: "Хэрэглэгчийн Нэр + 6 Тоо Сонгох",
  usernameError: "Нийтийн профайлын хэрэглэгчийн нэр нь зөвхөн англи үсэг, тоо эсвэл - ашиглаж болно.",
  usernameTakenError: "Нийтийн профайлын хэрэглэгчийн нэр аль хэдийн авагдсан байна. Өөр нэр сонгоно уу.",
  photoSelected: "зураг сонгогдсон",
  photosSelected: "зураг сонгогдсон",
  debugLog: "Дебаг Лог"
},
// Nepali
'ne': {
  myAlbums: "मेरा एल्बमहरू",
  logOut: "लग आउट",
  uploadProgress: "अपलोड प्रगति",
  overallProgress: "समग्र प्रगति",
  ofComplete: "मध्ये",
  uploading: "अपलोड गर्दै",
  processing: "प्रशोधन गर्दै",
  complete: "पूरा भयो",
  failed: "असफल",
  savingAlbum: "एल्बम बचत गर्दै",
  movingFiles: "फाइलहरू स्थायी भण्डारणमा सार्दै...",
  video: "भिडियो",
  image: "चित्र",
  error: "त्रुटि",
  remove: "हटाउनुहोस्",
  saveAlbum: "एल्बम बचत गर्नुहोस्",
  savingAlbumProgress: "एल्बम बचत गर्दै...",
  addMorePhotos: "थप फोटोहरू थप्नुहोस्",
  enterUsername: "सार्वजनिक रूपमा देखिने प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्।",
  usernameExample: "उदाहरणका लागि, तपाईं आफ्नो नाम वा अर्को नाम प्रयोग गर्न सक्नुहुन्छ।",
  selectUsername: "प्रयोगकर्ता नाम चयन गर्नुहोस्",
  selectUsernameDigits: "प्रयोगकर्ता नाम + 6 अंक चयन गर्नुहोस्",
  usernameError: "सार्वजनिक प्रोफाइल प्रयोगकर्ता नामहरूले अंग्रेजी अक्षरहरू, नम्बरहरू वा - मात्र प्रयोग गर्न सक्छन्।",
  usernameTakenError: "सार्वजनिक प्रोफाइल प्रयोगकर्ता नाम पहिले नै लिइएको छ। कृपया अर्को चयन गर्नुहोस्।",
  photoSelected: "फोटो चयन गरिएको",
  photosSelected: "फोटोहरू चयन गरिएको",
  debugLog: "डिबग लग"
},
// Punjabi
'pa': {
  myAlbums: "ਮੇਰੇ ਐਲਬਮ",
  logOut: "ਲੌਗ ਆਉਟ",
  uploadProgress: "ਅਪਲੋਡ ਪ੍ਰਗਤੀ",
  overallProgress: "ਕੁੱਲ ਪ੍ਰਗਤੀ",
  ofComplete: "ਵਿੱਚੋਂ",
  uploading: "ਅਪਲੋਡ ਕਰ ਰਿਹਾ ਹੈ",
  processing: "ਪ੍ਰੋਸੈਸਿੰਗ ਕਰ ਰਿਹਾ ਹੈ",
  complete: "ਪੂਰਾ",
  failed: "ਅਸਫਲ",
  savingAlbum: "ਐਲਬਮ ਸੁਰੱਖਿਅਤ ਕਰ ਰਿਹਾ ਹੈ",
  movingFiles: "ਫਾਈਲਾਂ ਨੂੰ ਸਥਾਈ ਸਟੋਰੇਜ ਵਿੱਚ ਭੇਜ ਰਿਹਾ ਹੈ...",
  video: "ਵੀਡੀਓ",
  image: "ਚਿੱਤਰ",
  error: "ਗਲਤੀ",
  remove: "ਹਟਾਓ",
  saveAlbum: "ਐਲਬਮ ਸੁਰੱਖਿਅਤ ਕਰੋ",
  savingAlbumProgress: "ਐਲਬਮ ਸੁਰੱਖਿਅਤ ਕਰ ਰਿਹਾ ਹੈ...",
  addMorePhotos: "ਹੋਰ ਫੋਟੋਆਂ ਸ਼ਾਮਲ ਕਰੋ",
  enterUsername: "ਜਨਤਕ ਤੌਰ 'ਤੇ ਦਿਖਾਈ ਦੇਣ ਵਾਲਾ ਵਰਤੋਂਕਾਰ ਨਾਮ ਦਰਜ ਕਰੋ।",
  usernameExample: "ਉਦਾਹਰਨ ਲਈ, ਤੁਸੀਂ ਆਪਣਾ ਪਹਿਲਾ ਨਾਮ ਜਾਂ ਕੋਈ ਹੋਰ ਨਾਮ ਵਰਤ ਸਕਦੇ ਹੋ।",
  selectUsername: "ਵਰਤੋਂਕਾਰ ਨਾਮ ਚੁਣੋ",
  selectUsernameDigits: "ਵਰਤੋਂਕਾਰ ਨਾਮ + 6 ਅੰਕ ਚੁਣੋ",
  usernameError: "ਜਨਤਕ ਪ੍ਰੋਫਾਈਲ ਵਰਤੋਂਕਾਰ ਨਾਮਾਂ ਵਿੱਚ ਸਿਰਫ਼ ਅੰਗਰੇਜ਼ੀ ਅੱਖਰ, ਨੰਬਰ ਜਾਂ - ਵਰਤੇ ਜਾ ਸਕਦੇ ਹਨ।",
  usernameTakenError: "ਜਨਤਕ ਪ੍ਰੋਫਾਈਲ ਵਰਤੋਂਕਾਰ ਨਾਮ ਪਹਿਲਾਂ ਹੀ ਲਿਆ ਜਾ ਚੁੱਕਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਚੁਣੋ।",
  photoSelected: "ਫੋਟੋ ਚੁਣੀ ਗਈ",
  photosSelected: "ਫੋਟੋਆਂ ਚੁਣੀਆਂ ਗਈਆਂ",
  debugLog: "ਡੀਬੱਗ ਲੌਗ"
},
// Sinhala
'si': {
  myAlbums: "මගේ ඇල්බම",
  logOut: "ඉවත් වන්න",
  uploadProgress: "උඩුගත කිරීමේ ප්‍රගතිය",
  overallProgress: "සමස්ත ප්‍රගතිය",
  ofComplete: "න්",
  uploading: "උඩුගත කරමින්",
  processing: "සැකසීම",
  complete: "සම්පූර්ණයි",
  failed: "අසාර්ථකයි",
  savingAlbum: "ඇල්බමය සුරකිමින්",
  movingFiles: "ගොනු ස්ථිර ගබඩාවට ගෙන යමින්...",
  video: "වීඩියෝ",
  image: "රූපය",
  error: "දෝෂය",
  remove: "ඉවත් කරන්න",
  saveAlbum: "ඇල්බමය සුරකින්න",
  savingAlbumProgress: "ඇල්බමය සුරකිමින්...",
  addMorePhotos: "තවත් ඡායාරූප එකතු කරන්න",
  enterUsername: "පොදුවේ පෙනෙන පරිශීලක නාමයක් ඇතුළත් කරන්න.",
  usernameExample: "උදාහරණයක් ලෙස, ඔබට ඔබේ මුල් නම හෝ වෙනත් නමක් භාවිතා කළ හැකිය.",
  selectUsername: "පරිශීලක නාමය තෝරන්න",
  selectUsernameDigits: "පරිශීලක නාමය + අංක 6ක් තෝරන්න",
  usernameError: "පොදු පැතිකඩ පරිශීලක නාමවලට ඉංග්‍රීසි අකුරු, අංක හෝ - පමණක් භාවිතා කළ හැකිය.",
  usernameTakenError: "පොදු පැතිකඩ පරිශීලක නාමය දැනටමත් ලබාගෙන ඇත. කරුණාකර වෙනත් එකක් තෝරන්න.",
  photoSelected: "ඡායාරූපය තෝරා ඇත",
  photosSelected: "ඡායාරූප තෝරා ඇත",
  debugLog: "නිදොස් කිරීමේ ලොගය"
},
// Slovenian
'sl': {
  myAlbums: "Moji Albumi",
  logOut: "Odjava",
  uploadProgress: "Napredek Nalaganja",
  overallProgress: "Skupni Napredek",
  ofComplete: "od",
  uploading: "Nalaganje",
  processing: "Obdelava",
  complete: "Končano",
  failed: "Neuspešno",
  savingAlbum: "Shranjevanje Albuma",
  movingFiles: "Premikanje datotek v trajno shrambo...",
  video: "Video",
  image: "Slika",
  error: "Napaka",
  remove: "Odstrani",
  saveAlbum: "Shrani Album",
  savingAlbumProgress: "Shranjevanje Albuma...",
  addMorePhotos: "Dodaj Več Fotografij",
  enterUsername: "Vnesite javno vidno uporabniško ime.",
  usernameExample: "Na primer, lahko uporabite svoje ime ali drugo ime.",
  selectUsername: "Izberi Uporabniško Ime",
  selectUsernameDigits: "Izberi Uporabniško Ime + 6 Številk",
  usernameError: "Uporabniška imena javnega profila lahko uporabljajo samo angleške črke, številke ali -.",
  usernameTakenError: "Uporabniško ime javnega profila je že zasedeno. Prosimo, izberite drugo.",
  photoSelected: "izbrana fotografija",
  photosSelected: "izbranih fotografij",
  debugLog: "Dnevnik Razhroščevanja"
},
// Albanian
'sq': {
  myAlbums: "Albumet e Mia",
  logOut: "Dilni",
  uploadProgress: "Progresi i Ngarkimit",
  overallProgress: "Progresi i Përgjithshëm",
  ofComplete: "nga",
  uploading: "Duke Ngarkuar",
  processing: "Duke Përpunuar",
  complete: "Përfunduar",
  failed: "Dështoi",
  savingAlbum: "Duke Ruajtur Albumin",
  movingFiles: "Duke zhvendosur skedarët në ruajtje të përhershme...",
  video: "Video",
  image: "Imazh",
  error: "Gabim",
  remove: "Hiq",
  saveAlbum: "Ruaj Albumin",
  savingAlbumProgress: "Duke Ruajtur Albumin...",
  addMorePhotos: "Shto Më Shumë Foto",
  enterUsername: "Futni një emër përdoruesi të dukshëm publikisht.",
  usernameExample: "Për shembull, mund të përdorni emrin tuaj të parë ose një emër tjetër.",
  selectUsername: "Zgjidhni Emrin e Përdoruesit",
  selectUsernameDigits: "Zgjidhni Emrin e Përdoruesit + 6 Shifra",
  usernameError: "Emrat e përdoruesve të profilit publik mund të përdorin vetëm shkronja angleze, numra ose -.",
  usernameTakenError: "Emri i përdoruesit të profilit publik është marrë tashmë. Ju lutemi zgjidhni një tjetër.",
  photoSelected: "foto e zgjedhur",
  photosSelected: "foto të zgjedhura",
  debugLog: "Regjistri i Korrigjimit të Gabimeve"
},
// Serbian
'sr': {
  myAlbums: "Моји Албуми",
  logOut: "Одјава",
  uploadProgress: "Напредак Отпремања",
  overallProgress: "Укупни Напредак",
  ofComplete: "од",
  uploading: "Отпремање",
  processing: "Обрада",
  complete: "Завршено",
  failed: "Неуспешно",
  savingAlbum: "Чување Албума",
  movingFiles: "Премештање датотека у трајно складиште...",
  video: "Видео",
  image: "Слика",
  error: "Грешка",
  remove: "Уклони",
  saveAlbum: "Сачувај Албум",
  savingAlbumProgress: "Чување Албума...",
  addMorePhotos: "Додај Још Фотографија",
  enterUsername: "Унесите јавно видљиво корисничко име.",
  usernameExample: "На пример, можете користити своје име или друго име.",
  selectUsername: "Изаберите Корисничко Име",
  selectUsernameDigits: "Изаберите Корисничко Име + 6 Цифара",
  usernameError: "Корисничка имена јавног профила могу користити само енглеска слова, бројеве или -.",
  usernameTakenError: "Корисничко име јавног профила је већ заузето. Молимо изаберите друго.",
  photoSelected: "изабрана фотографија",
  photosSelected: "изабраних фотографија",
  debugLog: "Дневник Отклањања Грешака"
},
// Swahili
'sw': {
  myAlbums: "Albamu Zangu",
  logOut: "Toka",
  uploadProgress: "Maendeleo ya Kupakia",
  overallProgress: "Maendeleo ya Jumla",
  ofComplete: "kati ya",
  uploading: "Inapakia",
  processing: "Inachakata",
  complete: "Imekamilika",
  failed: "Imeshindwa",
  savingAlbum: "Inahifadhi Albamu",
  movingFiles: "Inahamisha faili kwenye hifadhi ya kudumu...",
  video: "Video",
  image: "Picha",
  error: "Hitilafu",
  remove: "Ondoa",
  saveAlbum: "Hifadhi Albamu",
  savingAlbumProgress: "Inahifadhi Albamu...",
  addMorePhotos: "Ongeza Picha Zaidi",
  enterUsername: "Ingiza jina la mtumiaji linaloonekana hadharani.",
  usernameExample: "Kwa mfano, unaweza kutumia jina lako la kwanza au jina lingine.",
  selectUsername: "Chagua Jina la Mtumiaji",
  selectUsernameDigits: "Chagua Jina la Mtumiaji + Tarakimu 6",
  usernameError: "Majina ya watumiaji ya wasifu wa umma yanaweza kutumia herufi za Kiingereza, nambari au - pekee.",
  usernameTakenError: "Jina la mtumiaji la wasifu wa umma tayari limechukuliwa. Tafadhali chagua jingine.",
  photoSelected: "picha imechaguliwa",
  photosSelected: "picha zimechaguliwa",
  debugLog: "Kumbukumbu ya Utatuzi"
},
// Tajik
'tg': {
  myAlbums: "Албомҳои Ман",
  logOut: "Баромадан",
  uploadProgress: "Пешрафти Боргузорӣ",
  overallProgress: "Пешрафти Умумӣ",
  ofComplete: "аз",
  uploading: "Боргузорӣ",
  processing: "Коркард",
  complete: "Анҷомёфта",
  failed: "Ноком",
  savingAlbum: "Сабти Албом",
  movingFiles: "Интиқоли файлҳо ба захирасозии доимӣ...",
  video: "Видео",
  image: "Тасвир",
  error: "Хато",
  remove: "Хориҷ кардан",
  saveAlbum: "Сабти Албом",
  savingAlbumProgress: "Сабти Албом...",
  addMorePhotos: "Иловаи Аксҳои Бештар",
  enterUsername: "Номи корбарии ошкоро воридкунед.",
  usernameExample: "Масалан, шумо метавонед номи аввали худ ё номи дигареро истифода баред.",
  selectUsername: "Интихоби Номи Корбарӣ",
  selectUsernameDigits: "Интихоби Номи Корбарӣ + 6 Рақам",
  usernameError: "Номҳои корбарии профили оммавӣ метавонанд танҳо ҳарфҳои англисӣ, рақамҳо ё - истифода баранд.",
  usernameTakenError: "Номи корбарии профили оммавӣ аллакай гирифта шудааст. Лутфан дигареро интихоб кунед.",
  photoSelected: "акс интихоб шудааст",
  photosSelected: "акс интихоб шудааст",
  debugLog: "Сабти Ислоҳи Хатогиҳо"
},
// Tagalog / Filipino
'tl': {
  myAlbums: "Aking mga Album",
  logOut: "Mag-logout",
  uploadProgress: "Progreso ng Pag-upload",
  overallProgress: "Kabuuang Progreso",
  ofComplete: "ng",
  uploading: "Nag-a-upload",
  processing: "Nagpoproseso",
  complete: "Kumpleto",
  failed: "Nabigo",
  savingAlbum: "Nag-sasave ng Album",
  movingFiles: "Naglilipat ng mga file sa permanenteng storage...",
  video: "Video",
  image: "Larawan",
  error: "Error",
  remove: "Alisin",
  saveAlbum: "I-save ang Album",
  savingAlbumProgress: "Nag-sasave ng Album...",
  addMorePhotos: "Magdagdag ng Mas Maraming Larawan",
  enterUsername: "Maglagay ng username na pampublikong makikita.",
  usernameExample: "Halimbawa, maaari mong gamitin ang iyong pangalan o ibang pangalan.",
  selectUsername: "Pumili ng Username",
  selectUsernameDigits: "Pumili ng Username + 6 na Digit",
  usernameError: "Ang mga username ng pampublikong profile ay maaari lamang gumamit ng mga letra sa Ingles, numero o -.",
  usernameTakenError: "Ang username ng pampublikong profile ay ginagamit na. Mangyaring pumili ng iba.",
  photoSelected: "larawan ang napili",
  photosSelected: "mga larawan ang napili",
  debugLog: "Debug Log"
},
// Uzbek
'uz': {
  myAlbums: "Mening Albomlarim",
  logOut: "Chiqish",
  uploadProgress: "Yuklash Jarayoni",
  overallProgress: "Umumiy Jarayon",
  ofComplete: "dan",
  uploading: "Yuklanmoqda",
  processing: "Ishlanmoqda",
  complete: "Bajarildi",
  failed: "Muvaffaqiyatsiz",
  savingAlbum: "Albom Saqlanmoqda",
  movingFiles: "Fayllar doimiy xotiraga ko'chirilmoqda...",
  video: "Video",
  image: "Rasm",
  error: "Xato",
  remove: "Olib tashlash",
  saveAlbum: "Albomni Saqlash",
  savingAlbumProgress: "Albom Saqlanmoqda...",
  addMorePhotos: "Ko'proq Rasm Qo'shish",
  enterUsername: "Ommaviy ko'rinadigan foydalanuvchi nomini kiriting.",
  usernameExample: "Misol uchun, siz ismingiz yoki boshqa nomdan foydalanishingiz mumkin.",
  selectUsername: "Foydalanuvchi Nomini Tanlang",
  selectUsernameDigits: "Foydalanuvchi Nomi + 6 Raqam Tanlang",
  usernameError: "Ommaviy profil foydalanuvchi nomlari faqat ingliz harflari, raqamlar yoki - dan foydalanishi mumkin.",
  usernameTakenError: "Ommaviy profil foydalanuvchi nomi allaqachon olingan. Iltimos, boshqasini tanlang.",
  photoSelected: "rasm tanlandi",
  photosSelected: "rasm tanlandi",
  debugLog: "Nosozliklarni Bartaraf Etish Jurnali"
},
'xh': {
  myAlbums: "Ii-Album Zam",
  logOut: "Phuma",
  uploadProgress: "Inkqubela Yokukhuphela",
  overallProgress: "Inkqubela Iyonke",
  ofComplete: "kwe",
  uploading: "Iyakhuphela",
  processing: "Iyasetyenzwa",
  complete: "Igqityiwe",
  failed: "Ayiphumelelanga",
  savingAlbum: "Igcina i-Album",
  movingFiles: "Ishukumisa iifayile kwigcina-manani elisigxina...",
  video: "Ividiyo",
  image: "Umfanekiso",
  error: "Imposiso",
  remove: "Susa",
  saveAlbum: "Gcina i-Album",
  savingAlbumProgress: "Igcina i-Album...",
  addMorePhotos: "Yongeza Ezinye Iifoto",
  enterUsername: "Faka igama lomsebenzisi elibonakala esidlangalaleni.",
  usernameExample: "Umzekelo, ungasebenzisa igama lakho okanye elinye igama.",
  selectUsername: "Khetha Igama Lomsebenzisi",
  selectUsernameDigits: "Khetha Igama Lomsebenzisi + 6 Iinombolo",
  usernameError: "Amagama abasebenzisi eprofayili yoluntu anokusebenzisa kuphela oonobumba besiNgesi, amanani okanye -.",
  usernameTakenError: "Igama lomsebenzisi leprofayili yoluntu sele lithatyathiwe. Nceda ukhethe elinye.",
  photoSelected: "ifoto ekhethiweyo",
  photosSelected: "iifoto ezikhethiweyo",
  debugLog: "Ilog Yokukhangela Iimpazamo"
},
// Yoruba
'yo': {
  myAlbums: "Àwọn Àlbọ́mù Mi",
  logOut: "Síwọlé",
  uploadProgress: "Ilọsíwájú Ìṣàtẹ́wọlé",
  overallProgress: "Ilọsíwájú Lápapọ̀",
  ofComplete: "nínú",
  uploading: "Ńṣàtẹ́wọlé",
  processing: "Ńṣàgbéṣe",
  complete: "Parí",
  failed: "Kùnà",
  savingAlbum: "Ńfipamọ́ Àlbọ́mù",
  movingFiles: "Ńgbé àwọn fáìlì sí ipò ìpamọ́ àìlẹ́rù...",
  video: "Fídíò",
  image: "Àwòrán",
  error: "Àṣìṣe",
  remove: "Yọkúrò",
  saveAlbum: "Fipamọ́ Àlbọ́mù",
  savingAlbumProgress: "Ńfipamọ́ Àlbọ́mù...",
  addMorePhotos: "Fi Àwọn Àwòrán Míràn Kún",
  enterUsername: "Kọ orúkọ aṣàmúlò tí ó hàn ní gbangba.",
  usernameExample: "Bí àpẹẹrẹ, o lè lo orúkọ àkọ́kọ́ rẹ tàbí orúkọ míràn.",
  selectUsername: "Yan Orúkọ Aṣàmúlò",
  selectUsernameDigits: "Yan Orúkọ Aṣàmúlò + 6 Díjítì",
  usernameError: "Àwọn orúkọ aṣàmúlò ìhàsùlẹ̀ gbangba lè lo àwọn lẹ́tà Gẹ̀ẹ́sì, nọ́mbà tàbí - nìkan.",
  usernameTakenError: "Orúkọ aṣàmúlò ìhàsùlẹ̀ gbangba ti jẹ́ mímú tẹ́lẹ̀. Jọ̀wọ́ yan òmíràn.",
  photoSelected: "àwòrán tí a yàn",
  photosSelected: "àwọn àwòrán tí a yàn",
  debugLog: "Àkọsílẹ̀ Kíkọ́ Àṣìṣe"
},
// Zulu
'zu': {
  myAlbums: "Ama-Album Ami",
  logOut: "Phuma",
  uploadProgress: "Inqubekela Phambili Yokulayisha",
  overallProgress: "Inqubekela Phambili Yonke",
  ofComplete: "kwe",
  uploading: "Iyalayisha",
  processing: "Iyacubungula",
  complete: "Kuqediwe",
  failed: "Kuhlulekile",
  savingAlbum: "Ilondoloza i-Album",
  movingFiles: "Ihambisa amafayela ekugcineni okungaguquki...",
  video: "Ividiyo",
  image: "Isithombe",
  error: "Iphutha",
  remove: "Susa",
  saveAlbum: "Londoloza i-Album",
  savingAlbumProgress: "Ilondoloza i-Album...",
  addMorePhotos: "Engeza Ezinye Izithombe",
  enterUsername: "Faka igama lomsebenzisi elibonakala emphakathini.",
  usernameExample: "Isibonelo, ungasebenzisa igama lakho lokuqala noma elinye igama.",
  selectUsername: "Khetha Igama Lomsebenzisi",
  selectUsernameDigits: "Khetha Igama Lomsebenzisi + 6 Izinombolo",
  usernameError: "Amagama omsebenzisi we-profile yomphakathi angasebenzisa kuphela izinhlamvu zesiNgisi, izinombolo noma -.",
  usernameTakenError: "Igama lomsebenzisi we-profile yomphakathi selithathiwe. Sicela ukhethe elinye.",
  photoSelected: "isithombe esikhethiwe",
  photosSelected: "izithombe ezikhethiwe",
  debugLog: "I-log Yokulungisa Amaphutha"
},
// Amharic
'am': {
  myAlbums: "የእኔ አልበሞች",
  logOut: "ውጣ",
  uploadProgress: "የመጫን ሂደት",
  overallProgress: "አጠቃላይ ሂደት",
  ofComplete: "ከ",
  uploading: "በመጫን ላይ",
  processing: "በማቀናበር ላይ",
  complete: "ተጠናቅቋል",
  failed: "አልተሳካም",
  savingAlbum: "አልበም በማስቀመጥ ላይ",
  movingFiles: "ፋይሎችን ወደ ቋሚ ማከማቻ በማዘዋወር ላይ...",
  video: "ቪድዮ",
  image: "ምስል",
  error: "ስህተት",
  remove: "አስወግድ",
  saveAlbum: "አልበም አስቀምጥ",
  savingAlbumProgress: "አልበም በማስቀመጥ ላይ...",
  addMorePhotos: "ተጨማሪ ፎቶዎችን ጨምር",
  enterUsername: "በይፋ የሚታይ የተጠቃሚ ስም ያስገቡ።",
  usernameExample: "ለምሳሌ፣ የመጀመሪያ ስምዎን ወይም ሌላ ስም መጠቀም ይችላሉ።",
  selectUsername: "የተጠቃሚ ስም ይምረጡ",
  selectUsernameDigits: "የተጠቃሚ ስም + 6 አሃዞች ይምረጡ",
  usernameError: "የህዝብ መገለጫ የተጠቃሚ ስሞች የእንግሊዝኛ ፊደላት፣ ቁጥሮች ወይም - ብቻ መጠቀም ይችላሉ።",
  usernameTakenError: "የህዝብ መገለጫ የተጠቃሚ ስም አስቀድሞ ተወስዷል። እባክዎ ሌላ ይምረጡ።",
  photoSelected: "ፎቶ ተመርጧል",
  photosSelected: "ፎቶዎች ተመርጠዋል",
  debugLog: "የማስተካከያ ምዝግብ ማስታወሻ"
},
// Hausa
'ha': {
  myAlbums: "Albumina",
  logOut: "Fita",
  uploadProgress: "Ci Gaban Ɗora",
  overallProgress: "Ci Gaban Gaba Ɗaya",
  ofComplete: "na",
  uploading: "Ana Ɗora",
  processing: "Ana Aiwatarwa",
  complete: "An Gama",
  failed: "Ya Gaza",
  savingAlbum: "Ana Ajiye Album",
  movingFiles: "Ana matsar da fayiloli zuwa ajiyar har abada...",
  video: "Bidiyo",
  image: "Hoto",
  error: "Kuskure",
  remove: "Cire",
  saveAlbum: "Ajiye Album",
  savingAlbumProgress: "Ana Ajiye Album...",
  addMorePhotos: "Ƙara Ƙarin Hotuna",
  enterUsername: "Shigar da sunan mai amfani da za a iya gani a fili.",
  usernameExample: "Misali, za ka iya amfani da sunan farko naka ko wani suna.",
  selectUsername: "Zaɓi Sunan Mai Amfani",
  selectUsernameDigits: "Zaɓi Sunan Mai Amfani + Lambobi 6",
  usernameError: "Sunayen masu amfani na bayyane na iya amfani da haruffa na Ingilishi, lambobi ko - kawai.",
  usernameTakenError: "An riga an ɗauki sunan mai amfani na bayyane. Don Allah zaɓi wani.",
  photoSelected: "an zaɓi hoto",
  photosSelected: "an zaɓi hotuna",
  debugLog: "Lissafin Gyara Matsala"
},
// Igbo
'ig': {
  myAlbums: "Ọdụm M",
  logOut: "Pụọ",
  uploadProgress: "Ọganihu Ibugo",
  overallProgress: "Ọganihu Ozuzu",
  ofComplete: "nke",
  uploading: "Na-ebugo",
  processing: "Na-arụ ọrụ",
  complete: "Mezuru",
  failed: "Ọdachi",
  savingAlbum: "Na-echekwa Ọdụm",
  movingFiles: "Na-ebugharị faịlụ gaa na nchekwa na-adịgide adịgide...",
  video: "Vidiyo",
  image: "Foto",
  error: "Mperi",
  remove: "Wepụ",
  saveAlbum: "Chekwaa Ọdụm",
  savingAlbumProgress: "Na-echekwa Ọdụm...",
  addMorePhotos: "Tinye Foto Ndị Ọzọ",
  enterUsername: "Tinye aha njirimara na-apụta ìhè n'ọha.",
  usernameExample: "Dịka atụ, ị nwere ike iji aha mbụ gị ma ọ bụ aha ọzọ.",
  selectUsername: "Họrọ Aha Njirimara",
  selectUsernameDigits: "Họrọ Aha Njirimara + 6 Digit",
  usernameError: "Aha njirimara profaịlụ ọha nwere ike iji naanị mkpụrụedemede bekee, nọmba ma ọ bụ -.",
  usernameTakenError: "Aha njirimara profaịlụ ọha ewereela. Biko họrọ ọzọ.",
  photoSelected: "họrọ foto",
  photosSelected: "họrọ foto",
  debugLog: "Ndekọ Nwale"
},
// Javanese
'jv': {
  myAlbums: "Album Kula",
  logOut: "Medal",
  uploadProgress: "Kamajuan Ngunggah",
  overallProgress: "Kamajuan Total",
  ofComplete: "saking",
  uploading: "Ngunggah",
  processing: "Ngolah",
  complete: "Rampung",
  failed: "Gagal",
  savingAlbum: "Nyimpen Album",
  movingFiles: "Mindahaken file dhateng panyimpenan tetep...",
  video: "Video",
  image: "Gambar",
  error: "Kesalahan",
  remove: "Mbusak",
  saveAlbum: "Nyimpen Album",
  savingAlbumProgress: "Nyimpen Album...",
  addMorePhotos: "Nambah Foto Malih",
  enterUsername: "Lebetaken asma pangangge sing katon ing umum.",
  usernameExample: "Contone, sampeyan bisa nggunakake jeneng utawa jeneng liyane.",
  selectUsername: "Milih Asma Pangangge",
  selectUsernameDigits: "Milih Asma Pangangge + 6 Angka",
  usernameError: "Asma pangangge profil umum namung saged ngangge aksara Inggris, nomer utawa -.",
  usernameTakenError: "Asma pangangge profil umum sampun dipundut. Mangga milih sanesipun.",
  photoSelected: "foto kapilih",
  photosSelected: "foto kapilih",
  debugLog: "Log Debug"
},
// Khmer
'km': {
  myAlbums: "អាល់ប៊ុមរបស់ខ្ញុំ",
  logOut: "ចាកចេញ",
  uploadProgress: "ដំណើរការផ្ទុកឡើង",
  overallProgress: "ដំណើរការសរុប",
  ofComplete: "នៃ",
  uploading: "កំពុងផ្ទុកឡើង",
  processing: "កំពុងដំណើរការ",
  complete: "បានបញ្ចប់",
  failed: "បរាជ័យ",
  savingAlbum: "កំពុងរក្សាទុកអាល់ប៊ុម",
  movingFiles: "កំពុងផ្លាស់ទីឯកសារទៅកន្លែងផ្ទុកអចិន្ត្រៃយ៍...",
  video: "វីដេអូ",
  image: "រូបភាព",
  error: "បញ្ហា",
  remove: "ដកចេញ",
  saveAlbum: "រក្សាទុកអាល់ប៊ុម",
  savingAlbumProgress: "កំពុងរក្សាទុកអាល់ប៊ុម...",
  addMorePhotos: "បន្ថែមរូបថតច្រើនទៀត",
  enterUsername: "បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់ដែលអាចមើលឃើញជាសាធារណៈ។",
  usernameExample: "ឧទាហរណ៍ អ្នកអាចប្រើឈ្មោះដំបូងរបស់អ្នក ឬឈ្មោះផ្សេងទៀត។",
  selectUsername: "ជ្រើសរើសឈ្មោះអ្នកប្រើប្រាស់",
  selectUsernameDigits: "ជ្រើសរើសឈ្មោះអ្នកប្រើប្រាស់ + 6 លេខ",
  usernameError: "ឈ្មោះអ្នកប្រើប្រាស់ក្នុងប្រូហ្វាល់សាធារណៈអាចប្រើបានតែអក្សរអង់គ្លេស លេខ ឬ - ប៉ុណ្ណោះ។",
  usernameTakenError: "ឈ្មោះអ្នកប្រើប្រាស់ក្នុងប្រូហ្វាល់សាធារណៈត្រូវបានគេយករួចហើយ។ សូមជ្រើសរើសមួយផ្សេងទៀត។",
  photoSelected: "រូបថតត្រូវបានជ្រើសរើស",
  photosSelected: "រូបថតត្រូវបានជ្រើសរើស",
  debugLog: "កំណត់ហេតុបំបាត់កំហុស"
},
// Burmese
'my': {
  myAlbums: "ကျွန်ုပ်၏အယ်လ်ဘမ်များ",
  logOut: "ထွက်ရန်",
  uploadProgress: "တင်ခြင်းတိုးတက်မှု",
  overallProgress: "စုစုပေါင်းတိုးတက်မှု",
  ofComplete: "မှ",
  uploading: "တင်နေသည်",
  processing: "လုပ်ဆောင်နေသည်",
  complete: "ပြီးပြီ",
  failed: "မအောင်မြင်ပါ",
  savingAlbum: "အယ်လ်ဘမ်သိမ်းဆည်းနေသည်",
  movingFiles: "ဖိုင်များကို ထာဝရသိုလှောင်မှုသို့ ရွှေ့နေသည်...",
  video: "ဗီဒီယို",
  image: "ပုံ",
  error: "အမှား",
  remove: "ဖယ်ရှားရန်",
  saveAlbum: "အယ်လ်ဘမ်သိမ်းရန်",
  savingAlbumProgress: "အယ်လ်ဘမ်သိမ်းဆည်းနေသည်...",
  addMorePhotos: "ဓာတ်ပုံများထပ်ထည့်ရန်",
  enterUsername: "အများပြည်သူမြင်နိုင်သော အသုံးပြုသူအမည်ကို ထည့်ပါ။",
  usernameExample: "ဥပမာ၊ သင့်နာမည် သို့မဟုတ် အခြားအမည်ကို သုံးနိုင်သည်။",
  selectUsername: "အသုံးပြုသူအမည်ရွေးရန်",
  selectUsernameDigits: "အသုံးပြုသူအမည် + ဂဏန်း 6 လုံးရွေးရန်",
  usernameError: "အများပြည်သူပရိုဖိုင်အသုံးပြုသူအမည်များသည် အင်္ဂလိပ်စာလုံးများ၊ နံပါတ်များ သို့မဟုတ် - ကိုသာ သုံးနိုင်သည်။",
  usernameTakenError: "အများပြည်သူပရိုဖိုင်အသုံးပြုသူအမည်ကို ယူထားပြီးဖြစ်သည်။ ကျေးဇူးပြု၍ အခြားတစ်ခုရွေးပါ။",
  photoSelected: "ဓာတ်ပုံရွေးချယ်ပြီး",
  photosSelected: "ဓာတ်ပုံများရွေးချယ်ပြီး",
  debugLog: "အမှားရှာဖွေရေးမှတ်တမ်း"
},
// Odia/Oriya
'or': {
  myAlbums: "ମୋର ଆଲବମ୍",
  logOut: "ଲଗ୍ ଆଉଟ୍",
  uploadProgress: "ଅପଲୋଡ୍ ପ୍ରଗତି",
  overallProgress: "ସମଗ୍ର ପ୍ରଗତି",
  ofComplete: "ର",
  uploading: "ଅପଲୋଡ୍ ହେଉଛି",
  processing: "ପ୍ରକ୍ରିୟାକରଣ ହେଉଛି",
  complete: "ସମ୍ପୂର୍ଣ୍ଣ",
  failed: "ବିଫଳ",
  savingAlbum: "ଆଲବମ୍ ସଂରକ୍ଷଣ କରୁଛି",
  movingFiles: "ଫାଇଲଗୁଡ଼ିକୁ ସ୍ଥାୟୀ ଷ୍ଟୋରେଜକୁ ସ୍ଥାନାନ୍ତର କରୁଛି...",
  video: "ଭିଡିଓ",
  image: "ଛବି",
  error: "ତ୍ରୁଟି",
  remove: "ଅପସାରଣ",
  saveAlbum: "ଆଲବମ୍ ସଂରକ୍ଷଣ କରନ୍ତୁ",
  savingAlbumProgress: "ଆଲବମ୍ ସଂରକ୍ଷଣ କରୁଛି...",
  addMorePhotos: "ଅଧିକ ଫଟୋ ଯୋଡନ୍ତୁ",
  enterUsername: "ସର୍ବସାଧାରଣରେ ଦୃଶ୍ୟମାନ ବ୍ୟବହାରକାରୀ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।",
  usernameExample: "ଉଦାହରଣ ସ୍ୱରୂପ, ଆପଣ ଆପଣଙ୍କର ପ୍ରଥମ ନାମ କିମ୍ବା ଅନ୍ୟ ନାମ ବ୍ୟବହାର କରିପାରିବେ।",
  selectUsername: "ବ୍ୟବହାରକାରୀ ନାମ ଚୟନ କରନ୍ତୁ",
  selectUsernameDigits: "ବ୍ୟବହାରକାରୀ ନାମ + 6 ସଂଖ୍ୟା ଚୟନ କରନ୍ତୁ",
  usernameError: "ସର୍ବସାଧାରଣ ପ୍ରୋଫାଇଲ୍ ବ୍ୟବହାରକାରୀ ନାମ କେବଳ ଇଂରାଜୀ ଅକ୍ଷର, ସଂଖ୍ୟା କିମ୍ବା - ବ୍ୟବହାର କରିପାରିବେ।",
  usernameTakenError: "ସର୍ବସାଧାରଣ ପ୍ରୋଫାଇଲ୍ ବ୍ୟବହାରକାରୀ ନାମ ପୂର୍ବରୁ ନିଆଯାଇଛି। ଦୟାକରି ଅନ୍ୟ ଏକ ଚୟନ କରନ୍ତୁ।",
  photoSelected: "ଫଟୋ ଚୟନ କରାଯାଇଛି",
  photosSelected: "ଫଟୋ ଚୟନ କରାଯାଇଛି",
  debugLog: "ଡିବଗ୍ ଲଗ୍"
},
// Pashto
'ps': {
  myAlbums: "زما البومونه",
  logOut: "وتل",
  uploadProgress: "د پورته کولو پرمختګ",
  overallProgress: "ټولیز پرمختګ",
  ofComplete: "څخه",
  uploading: "پورته کیږي",
  processing: "پروسس کیږي",
  complete: "بشپړ",
  failed: "ناکام",
  savingAlbum: "البوم ساتل کیږي",
  movingFiles: "فایلونه دایمي زیرمه کې ته لیږدول کیږي...",
  video: "ویډیو",
  image: "انځور",
  error: "تیروتنه",
  remove: "لرې کول",
  saveAlbum: "البوم وساتئ",
  savingAlbumProgress: "البوم ساتل کیږي...",
  addMorePhotos: "نور عکسونه اضافه کړئ",
  enterUsername: "د عامه لید وړ کارن نوم دننه کړئ.",
  usernameExample: "د مثال په توګه، تاسو کولی شئ خپل لومړی نوم یا بل نوم وکاروئ.",
  selectUsername: "کارن نوم وټاکئ",
  selectUsernameDigits: "د کارن نوم + 6 ارقام وټاکئ",
  usernameError: "د عامه پروفایل کارن نومونه یوازې د انګلیسي تورو، شمیرو یا - کارولی شي.",
  usernameTakenError: "د عامه پروفایل کارن نوم دمخه نیول شوی دی. مهرباني وکړئ بل وټاکئ.",
  photoSelected: "عکس غوره شوی",
  photosSelected: "عکسونه غوره شوي",
  debugLog: "د ډیبګ لاګ"
},
// Sindhi
'sd': {
  myAlbums: "منهنجا البم",
  logOut: "لاگ آئوٽ",
  uploadProgress: "اپلوڊ ترقي",
  overallProgress: "مجموعي ترقي",
  ofComplete: "جي",
  uploading: "اپلوڊ ٿي رهيو آهي",
  processing: "پروسيس ٿي رهيو آهي",
  complete: "مڪمل",
  failed: "ناڪام",
  savingAlbum: "البم محفوظ ٿي رهيو آهي",
  movingFiles: "فائلون کي مستقل اسٽوريج ڏانهن منتقل ڪري رهيو آهي...",
  video: "وڊيو",
  image: "تصوير",
  error: "خرابي",
  remove: "هٽايو",
  saveAlbum: "البم محفوظ ڪريو",
  savingAlbumProgress: "البم محفوظ ٿي رهيو آهي...",
  addMorePhotos: "وڌيڪ تصويرون شامل ڪريو",
  enterUsername: "عوامي طور تي ڏسڻ لائق استعمال ڪندڙ جو نالو داخل ڪريو.",
  usernameExample: "مثال طور، توهان پنهنجو پهريون نالو يا ٻيو نالو استعمال ڪري سگهو ٿا.",
  selectUsername: "استعمال ڪندڙ جو نالو چونڊيو",
  selectUsernameDigits: "استعمال ڪندڙ جو نالو + 6 عدد چونڊيو",
  usernameError: "عوامي پروفائيل استعمال ڪندڙ نالا صرف انگريزي اکر، عدد يا - استعمال ڪري سگهن ٿا.",
  usernameTakenError: "عوامي پروفائيل استعمال ڪندڙ جو نالو اڳ ۾ ئي ورتل آهي. مهرباني ڪري ٻيو چونڊيو.",
  photoSelected: "تصوير چونڊيل",
  photosSelected: "تصويرون چونڊيل",
  debugLog: "ڊيبگ لاگ"
},
// Somali
'so': {
  myAlbums: "Albomaadkayga",
  logOut: "Ka Bax",
  uploadProgress: "Horumarka Soo Gelinta",
  overallProgress: "Horumarka Guud",
  ofComplete: "ka mid ah",
  uploading: "Soo Gelinaya",
  processing: "Diyaarinaya",
  complete: "Dhammaystiran",
  failed: "Fashilmay",
  savingAlbum: "Keydinta Albamka",
  movingFiles: "Wareejinta faylasha illaa kaydinta joogtada ah...",
  video: "Fiidiyow",
  image: "Sawir",
  error: "Khalad",
  remove: "Ka saar",
  saveAlbum: "Keydi Albamka",
  savingAlbumProgress: "Keydinta Albamka...",
  addMorePhotos: "Ku Dar Sawirro Dheeraad ah",
  enterUsername: "Geli magaca isticmaale ee si cad u muuqda.",
  usernameExample: "Tusaale ahaan, waxaad isticmaali kartaa magacaaga kowaad ama magac kale.",
  selectUsername: "Dooro Magaca Isticmaale",
  selectUsernameDigits: "Dooro Magaca Isticmaale + 6 Lambar",
  usernameError: "Magacyada isticmaalaha ee muuqaalka dadweynaha waxay kaliya isticmaali karaan xarfaha Ingiriisiga, lambarada ama -.",
  usernameTakenError: "Magaca isticmaalaha ee muuqaalka dadweynaha horay ayaa loo qaatay. Fadlan dooro mid kale.",
  photoSelected: "sawir la doortay",
  photosSelected: "sawirro la doortay",
  debugLog: "Diiwaanka Cilad-baarista"
},
// Assamese
'as': {
  myAlbums: "মোৰ এলবাম",
  logOut: "লগ আউট",
  uploadProgress: "আপল'ড অগ্ৰগতি",
  overallProgress: "সামগ্ৰিক অগ্ৰগতি",
  ofComplete: "ৰ",
  uploading: "আপল'ড হৈ আছে",
  processing: "প্ৰক্ৰিয়াকৰণ হৈ আছে",
  complete: "সম্পূৰ্ণ",
  failed: "বিফল",
  savingAlbum: "এলবাম সংৰক্ষণ হৈ আছে",
  movingFiles: "ফাইলসমূহ স্থায়ী সঞ্চয়লৈ স্থানান্তৰ হৈ আছে...",
  video: "ভিডিঅ'",
  image: "ছবি",
  error: "ত্ৰুটি",
  remove: "আঁতৰাওক",
  saveAlbum: "এলবাম সংৰক্ষণ কৰক",
  savingAlbumProgress: "এলবাম সংৰক্ষণ হৈ আছে...",
  addMorePhotos: "অধিক ফটো যোগ কৰক",
  enterUsername: "ৰাজহুৱাভাৱে দৃশ্যমান ব্যৱহাৰকাৰী নাম প্ৰৱিষ্ট কৰক।",
  usernameExample: "উদাহৰণস্বৰূপে, আপুনি আপোনাৰ প্ৰথম নাম বা আন নাম ব্যৱহাৰ কৰিব পাৰে।",
  selectUsername: "ব্যৱহাৰকাৰী নাম নিৰ্বাচন কৰক",
  selectUsernameDigits: "ব্যৱহাৰকাৰী নাম + 6 অংক নিৰ্বাচন কৰক",
  usernameError: "ৰাজহুৱা প্ৰ'ফাইল ব্যৱহাৰকাৰী নামে কেৱল ইংৰাজী আখৰ, সংখ্যা বা - ব্যৱহাৰ কৰিব পাৰে।",
  usernameTakenError: "ৰাজহুৱা প্ৰ'ফাইল ব্যৱহাৰকাৰী নাম ইতিমধ্যে গ্ৰহণ কৰা হৈছে। অনুগ্ৰহ কৰি আন এটা নিৰ্বাচন কৰক।",
  photoSelected: "ফটো নিৰ্বাচিত হৈছে",
  photosSelected: "ফটো নিৰ্বাচিত হৈছে",
  debugLog: "ডিবাগ লগ"
},
// Bhojpuri
'bho': {
  myAlbums: "हमार एल्बम",
  logOut: "लॉग आउट",
  uploadProgress: "अपलोड प्रगति",
  overallProgress: "कुल प्रगति",
  ofComplete: "के",
  uploading: "अपलोड हो रहल बा",
  processing: "प्रोसेस हो रहल बा",
  complete: "पूरा",
  failed: "असफल",
  savingAlbum: "एल्बम सहेजल जा रहल बा",
  movingFiles: "फाइल के स्थायी भंडारण में ले जवल जा रहल बा...",
  video: "वीडियो",
  image: "चित्र",
  error: "त्रुटि",
  remove: "हटाईं",
  saveAlbum: "एल्बम सहेजीं",
  savingAlbumProgress: "एल्बम सहेजल जा रहल बा...",
  addMorePhotos: "अउरी फोटो जोड़ीं",
  enterUsername: "एगो सार्वजनिक रूप से दिखाई देवे वाला उपयोगकर्ता नाम दर्ज करीं।",
  usernameExample: "उदाहरण खातिर, आप अपना पहिला नाम या दोसर नाम के उपयोग कर सकत बानी।",
  selectUsername: "उपयोगकर्ता नाम चुनीं",
  selectUsernameDigits: "उपयोगकर्ता नाम + 6 अंक चुनीं",
  usernameError: "सार्वजनिक प्रोफाइल उपयोगकर्ता नाम केवल अंग्रेजी अक्षर, संख्या या - के उपयोग कर सकत बा।",
  usernameTakenError: "सार्वजनिक प्रोफाइल उपयोगकर्ता नाम पहिले से लिहल गइल बा। कृपया दूसर चुनीं।",
  photoSelected: "फोटो चुनल गइल",
  photosSelected: "फोटो चुनल गइल",
  debugLog: "डीबग लॉग"
},
// Breton
'br': {
  myAlbums: "Ma Albumoù",
  logOut: "Digevreañ",
  uploadProgress: "Araokadur Pellgargañ",
  overallProgress: "Araokadur Hollek",
  ofComplete: "eus",
  uploading: "O pellgargañ",
  processing: "O tretañ",
  complete: "Peurechu",
  failed: "C'hwitet",
  savingAlbum: "Oc'h enrollañ an Album",
  movingFiles: "O fiñval restroù d'ar stokañ pad...",
  video: "Video",
  image: "Skeudenn",
  error: "Fazi",
  remove: "Dilemel",
  saveAlbum: "Enrollañ an Album",
  savingAlbumProgress: "Oc'h enrollañ an Album...",
  addMorePhotos: "Ouzhpennañ Muioc'h a Luc'hskeudennoù",
  enterUsername: "Ebarzhit un anv implijer a vo gwelet gant an holl.",
  usernameExample: "Da skouer, gallout a rit implijout ho anv-bihan pe un anv all.",
  selectUsername: "Dibabit un Anv Implijer",
  selectUsernameDigits: "Dibabit un Anv Implijer + 6 Niverenn",
  usernameError: "Anvioù implijer ar profil foran a c'hall implijout lizherennoù saozneg, niverennoù pe - hepken.",
  usernameTakenError: "Kemeret eo dija an anv implijer profil foran. Dibabit unan all, mar plij.",
  photoSelected: "luc'hskeudenn dibabet",
  photosSelected: "luc'hskeudennoù dibabet",
  debugLog: "Renabl Dizreinañ"
},
// Esperanto
'eo': {
  myAlbums: "Miaj Albumoj",
  logOut: "Elsaluti",
  uploadProgress: "Alŝuta Progreso",
  overallProgress: "Ĝenerala Progreso",
  ofComplete: "el",
  uploading: "Alŝutante",
  processing: "Prilaborante",
  complete: "Finita",
  failed: "Malsukcesis",
  savingAlbum: "Konservante Albumon",
  movingFiles: "Movante dosierojn al permanenta konservado...",
  video: "Video",
  image: "Bildo",
  error: "Eraro",
  remove: "Forigi",
  saveAlbum: "Konservi Albumon",
  savingAlbumProgress: "Konservante Albumon...",
  addMorePhotos: "Aldoni Pli da Fotoj",
  enterUsername: "Enigu publike videblan uzantnomon.",
  usernameExample: "Ekzemple, vi povas uzi vian antaŭnomon aŭ alian nomon.",
  selectUsername: "Elekti Uzantnomon",
  selectUsernameDigits: "Elekti Uzantnomon + 6 Ciferoj",
  usernameError: "Publikaj profilaj uzantonomoj povas uzi nur anglajn literojn, ciferojn aŭ -.",
  usernameTakenError: "Publika profila uzantnomo jam estas prenita. Bonvolu elekti alian.",
  photoSelected: "foto elektita",
  photosSelected: "fotoj elektitaj",
  debugLog: "Sencimiga Protokolo"
},
// Frisian
'fy': {
  myAlbums: "Myn Albums",
  logOut: "Útlogge",
  uploadProgress: "Upload Foarútgong",
  overallProgress: "Totale Foarútgong",
  ofComplete: "fan",
  uploading: "Uploaden",
  processing: "Ferwurkje",
  complete: "Foltôge",
  failed: "Mislearre",
  savingAlbum: "Album Bewarje",
  movingFiles: "Bestannen ferpleatse nei permaninte opslach...",
  video: "Fideo",
  image: "Ofbylding",
  error: "Flater",
  remove: "Fuortsmite",
  saveAlbum: "Album Bewarje",
  savingAlbumProgress: "Album Bewarje...",
  addMorePhotos: "Mear Foto's Tafoegje",
  enterUsername: "Fier in publyksichtbere brûkersnamme yn.",
  usernameExample: "Bygelyks kinne jo jo foarnamme of in oare namme brûke.",
  selectUsername: "Brûkersnamme Kieze",
  selectUsernameDigits: "Brûkersnamme + 6 Sifers Kieze",
  usernameError: "Publike profyl brûkersnammen kinne allinnich Ingelske letters, sifers of - brûke.",
  usernameTakenError: "Publike profyl brûkersnamme is al yn gebrûk. Kies asjebleaft in oare.",
  photoSelected: "foto selektearre",
  photosSelected: "foto's selektearre",
  debugLog: "Debug Log"
},
// Irish
'ga': {
  myAlbums: "M'Albam",
  logOut: "Logáil Amach",
  uploadProgress: "Dul Chun Cinn Uaslódála",
  overallProgress: "Dul Chun Cinn Iomlán",
  ofComplete: "as",
  uploading: "Ag Uaslódáil",
  processing: "Á Phróiseáil",
  complete: "Críochnaithe",
  failed: "Theip",
  savingAlbum: "Ag Sábháil an Albam",
  movingFiles: "Ag bogadh comhad go dtí stóráil bhuan...",
  video: "Físeán",
  image: "Íomhá",
  error: "Earráid",
  remove: "Bain",
  saveAlbum: "Sábháil an tAlbam",
  savingAlbumProgress: "Ag Sábháil an Albam...",
  addMorePhotos: "Cuir Tuilleadh Grianghraf Leis",
  enterUsername: "Cuir isteach ainm úsáideora atá le feiceáil go poiblí.",
  usernameExample: "Mar shampla, is féidir leat d'ainm nó ainm eile a úsáid.",
  selectUsername: "Roghnaigh Ainm Úsáideora",
  selectUsernameDigits: "Roghnaigh Ainm Úsáideora + 6 Dhigit",
  usernameError: "Ní féidir le hainmneacha úsáideora próifíle poiblí ach litreacha Béarla, uimhreacha nó - a úsáid.",
  usernameTakenError: "Tá an t-ainm úsáideora próifíle poiblí tógtha cheana féin. Roghnaigh ceann eile.",
  photoSelected: "grianghraf roghnaithe",
  photosSelected: "grianghraf roghnaithe",
  debugLog: "Loga Dífhabhtaithe"
},
// Scottish Gaelic
'gd': {
  myAlbums: "Na h-Albaman Agam",
  logOut: "Log A-mach",
  uploadProgress: "Adhartas Luchdadh Suas",
  overallProgress: "Adhartas Iomlan",
  ofComplete: "de",
  uploading: "A' luchdadh suas",
  processing: "A' giullachd",
  complete: "Coileanta",
  failed: "Dh'fhàillig",
  savingAlbum: "A' sàbhaladh an Albam",
  movingFiles: "A' gluasad faidhlichean gu stòradh maireannach...",
  video: "Bhidio",
  image: "Dealbh",
  error: "Mearachd",
  remove: "Thoir air falbh",
  saveAlbum: "Sàbhail an t-Albam",
  savingAlbumProgress: "A' sàbhaladh an Albam...",
  addMorePhotos: "Cuir Barrachd Dhealbhan Ris",
  enterUsername: "Cuir a-steach ainm-cleachdaiche a chithear gu poblach.",
  usernameExample: "Mar eisimpleir, faodaidh tu d' ainm no ainm eile a chleachdadh.",
  selectUsername: "Tagh Ainm-cleachdaiche",
  selectUsernameDigits: "Tagh Ainm-cleachdaiche + 6 Àireamhan",
  usernameError: "Chan fhaod ainmean-cleachdaiche pròifil poblach ach litrichean Beurla, àireamhan no - a chleachdadh.",
  usernameTakenError: "Tha an t-ainm-cleachdaiche pròifil poblach air a ghabhail mu thràth. Feuch an tagh thu fear eile.",
  photoSelected: "dealbh air a thaghadh",
  photosSelected: "dealbhan air an taghadh",
  debugLog: "Loga Dì-bhugachaidh"
},
// Māori
'mi': {
  myAlbums: "Aku Puka",
  logOut: "Takiputa",
  uploadProgress: "Kokenga Tukuake",
  overallProgress: "Kokenga Katoa",
  ofComplete: "o",
  uploading: "E tukuake ana",
  processing: "E tukatuka ana",
  complete: "Kua oti",
  failed: "Rahua",
  savingAlbum: "E tiaki ana i te Puka",
  movingFiles: "E neke ana i ngā kōnae ki te rokiroki pūmau...",
  video: "Ataata",
  image: "Whakaahua",
  error: "Hapa",
  remove: "Tango",
  saveAlbum: "Tiaki Puka",
  savingAlbumProgress: "E tiaki ana i te Puka...",
  addMorePhotos: "Tāpiri Whakaahua Anō",
  enterUsername: "Whakauru i tētahi ingoa kaiwhakamahi e kitea ana e te iwi whānui.",
  usernameExample: "Hei tauira, ka taea e koe te whakamahi i tō ingoa tuatahi, i tētahi atu ingoa rānei.",
  selectUsername: "Kōwhiri Ingoa Kaiwhakamahi",
  selectUsernameDigits: "Kōwhiri Ingoa Kaiwhakamahi + 6 Tau",
  usernameError: "Ko ngā ingoa kaiwhakamahi o te kōtaha tūmatanui ka taea anake te whakamahi i ngā pū Ingarihi, ngā tau, te tohu - rānei.",
  usernameTakenError: "Kua tangohia kētia te ingoa kaiwhakamahi o te kōtaha tūmatanui. Tēnā koa kōwhiria tētahi atu.",
  photoSelected: "whakaahua kua kōwhiritia",
  photosSelected: "whakaahua kua kōwhiritia",
  debugLog: "Rātaka Patuiro"
},
// Maltese
'mt': {
  myAlbums: "L-Albums Tiegħi",
  logOut: "Oħroġ",
  uploadProgress: "Progress tat-Tlugħ",
  overallProgress: "Progress Ġenerali",
  ofComplete: "minn",
  uploading: "Qed Ittella'",
  processing: "Qed Jiġi Pproċessat",
  complete: "Komplut",
  failed: "Falla",
  savingAlbum: "Qed Issalva l-Album",
  movingFiles: "Qed imexxi fajls għall-ħażna permanenti...",
  video: "Vidjo",
  image: "Stampa",
  error: "Żball",
  remove: "Neħħi",
  saveAlbum: "Salva l-Album",
  savingAlbumProgress: "Qed Issalva l-Album...",
  addMorePhotos: "Żid Aktar Ritratti",
  enterUsername: "Daħħal isem tal-utent li jidher pubblikament.",
  usernameExample: "Pereżempju, tista' tuża l-isem jew isem ieħor tiegħek.",
  selectUsername: "Agħżel Isem tal-Utent",
  selectUsernameDigits: "Agħżel Isem tal-Utent + 6 Ċifri",
  usernameError: "L-ismijiet tal-utenti tal-profil pubbliku jistgħu jużaw biss ittri Ingliżi, numri jew -.",
  usernameTakenError: "L-isem tal-utent tal-profil pubbliku diġà ttieħed. Jekk jogħġbok agħżel ieħor.",
  photoSelected: "ritratt magħżul",
  photosSelected: "ritratti magħżula",
  debugLog: "Log ta' Debugging"
},
// Norwegian Nynorsk
'nn': {
  myAlbums: "Mine Album",
  logOut: "Logg ut",
  uploadProgress: "Opplastingsframgang",
  overallProgress: "Total framgang",
  ofComplete: "av",
  uploading: "Lastar opp",
  processing: "Behandlar",
  complete: "Fullført",
  failed: "Mislukka",
  savingAlbum: "Lagrar album",
  movingFiles: "Flyttar filer til permanent lagring...",
  video: "Video",
  image: "Bilete",
  error: "Feil",
  remove: "Fjern",
  saveAlbum: "Lagre album",
  savingAlbumProgress: "Lagrar album...",
  addMorePhotos: "Legg til fleire bilete",
  enterUsername: "Skriv inn eit offentleg synleg brukarnamn.",
  usernameExample: "Til dømes kan du bruke fornamnet ditt eller eit anna namn.",
  selectUsername: "Vel brukarnamn",
  selectUsernameDigits: "Vel brukarnamn + 6 siffer",
  usernameError: "Offentlege profilbrukarnamn kan berre bruke engelske bokstavar, tal eller -.",
  usernameTakenError: "Offentleg profilbrukarnamn er allereie tatt. Ver venleg å velje eit anna.",
  photoSelected: "bilete valt",
  photosSelected: "bilete valde",
  debugLog: "Feilsøkingslogg"
},
// Kinyarwanda
'rw': {
  myAlbums: "Amashusho Yanjye",
  logOut: "Sohoka",
  uploadProgress: "Intambwe zo Kohereza",
  overallProgress: "Intambwe Rusange",
  ofComplete: "mu",
  uploading: "Kohereza",
  processing: "Gutunganya",
  complete: "Byarangiye",
  failed: "Ntibyakunze",
  savingAlbum: "Kubika Ishusho",
  movingFiles: "Kwimura dosiye mu bubiko buhoraho...",
  video: "Video",
  image: "Ishusho",
  error: "Ikosa",
  remove: "Gukuraho",
  saveAlbum: "Kubika Ishusho",
  savingAlbumProgress: "Kubika Ishusho...",
  addMorePhotos: "Ongeramo Izindi Foto",
  enterUsername: "Andika izina ry'ukoresha rigaragara ku ruhame.",
  usernameExample: "Urugero, ushobora gukoresha izina ryawe cyangwa irindi zina.",
  selectUsername: "Hitamo Izina ry'Ukoresha",
  selectUsernameDigits: "Hitamo Izina ry'Ukoresha + Imibare 6",
  usernameError: "Amazina y'abakoresha ba profayile rusange ashobora gusa gukoresha inyuguti z'icyongereza, imibare cyangwa -.",
  usernameTakenError: "Izina ry'ukoresha rya profayile rusange ryarafashwe. Nyamuneka hitamo irindi.",
  photoSelected: "ifoto yatoranyijwe",
  photosSelected: "amafoto yatoranyijwe",
  debugLog: "Inyandiko yo Gukosora Amakosa"
},
// Sanskrit
'sa': {
  myAlbums: "मम सङ्ग्रहाः",
  logOut: "निर्गम्यताम्",
  uploadProgress: "उद्भारण प्रगतिः",
  overallProgress: "समग्र प्रगतिः",
  ofComplete: "इति",
  uploading: "उद्भारयति",
  processing: "प्रक्रियमाणम्",
  complete: "सम्पूर्णम्",
  failed: "विफलम्",
  savingAlbum: "सङ्ग्रहः संरक्ष्यमाणः",
  movingFiles: "सञ्चिकाः स्थायी सङ्ग्रहे स्थानान्तरयति...",
  video: "दृश्यम्",
  image: "चित्रम्",
  error: "त्रुटिः",
  remove: "निष्कास्यताम्",
  saveAlbum: "सङ्ग्रहः संरक्ष्यताम्",
  savingAlbumProgress: "सङ्ग्रहः संरक्ष्यते...",
  addMorePhotos: "अधिकानि चित्राणि योज्यन्ताम्",
  enterUsername: "सार्वजनिकरूपेण दृश्यं प्रयोक्तृनाम प्रविश्यताम्।",
  usernameExample: "उदाहरणार्थम्, भवान् स्वस्य प्रथमनाम अथवा अन्यत् नाम उपयोक्तुं शक्नोति।",
  selectUsername: "प्रयोक्तृनाम चीयताम्",
  selectUsernameDigits: "प्रयोक्तृनाम + ६ अङ्काः चीयन्ताम्",
  usernameError: "सार्वजनिकप्रोफाइल प्रयोक्तृनामानि केवलं आङ्ग्लभाषायाः अक्षराणि, अङ्काः वा - उपयोक्तुं शक्नुवन्ति।",
  usernameTakenError: "सार्वजनिकप्रोफाइल प्रयोक्तृनाम पूर्वमेव गृहीतम्। कृपया अन्यत् चीयताम्।",
  photoSelected: "चित्रं चितम्",
  photosSelected: "चित्राणि चितानि",
  debugLog: "दोषनिवारण पञ्जिका"
},
'sm': {
  myAlbums: "A'u Albumo",
  logOut: "Alu Ese",
  uploadProgress: "Gasologa o le Fa'aupload",
  overallProgress: "Gasologa 'Atoa",
  ofComplete: "o",
  uploading: "O loo Fa'aupload",
  processing: "O loo Fa'agasolo",
  complete: "Ua Mae'a",
  failed: "Ua Fa'aleagaina",
  savingAlbum: "O loo Fa'asaoina le Albumo",
  movingFiles: "O loo siitia faila i le fa'aputuga tumau...",
  video: "Ata Fa'amaninoa",
  image: "Ata",
  error: "Mea sese",
  remove: "Ave'ese",
  saveAlbum: "Fa'asao le Albumo",
  savingAlbumProgress: "O loo Fa'asaoina le Albumo...",
  addMorePhotos: "Fa'aopoopo Nisi Ata",
  enterUsername: "Fa'aulu igoa fa'aaoga e mafai ona va'aia e tagata uma.",
  usernameExample: "Fa'ata'ita'iga, e mafai ona e fa'aaoga lou igoa muamua po'o se isi igoa.",
  selectUsername: "Filifili Igoa Fa'aaoga",
  selectUsernameDigits: "Filifili Igoa Fa'aaoga + 6 Numera",
  usernameError: "Igoa fa'aaoga o fa'amatalaga lautele e mafai ona fa'aaoga na'o mata'itusi Peretania, numera po'o -.",
  usernameTakenError: "Igoa fa'aaoga o fa'amatalaga lautele ua uma ona fa'aaogaina. Fa'amolemole filifili se isi.",
  photoSelected: "ata ua filifilia",
  photosSelected: "ata ua filifilia",
  debugLog: "Lisi o Fa'afitauli"
},
// Sesotho
'st': {
  myAlbums: "Dialbhamo Tsa Ka",
  logOut: "Tswa",
  uploadProgress: "Tshebetso Ya Ho Kenyelletsa",
  overallProgress: "Tshebetso Kaofela",
  ofComplete: "ho",
  uploading: "E Kenyelletsa",
  processing: "E Sebetsa",
  complete: "E Phethehile",
  failed: "E Hlolehile",
  savingAlbum: "E Boloka Albhamo",
  movingFiles: "E tsamaisa difaele polokelong e sa fetoheng...",
  video: "Video",
  image: "Setshwantsho",
  error: "Phoso",
  remove: "Tlosa",
  saveAlbum: "Boloka Albhamo",
  savingAlbumProgress: "E Boloka Albhamo...",
  addMorePhotos: "Kenya Ditshwantsho Tse Ding",
  enterUsername: "Kenya lebitso la mosebedisi le bonahalang sechabeng.",
  usernameExample: "Mohlala, o ka sebedisa lebitso la hao la pele kapa lebitso le leng.",
  selectUsername: "Kgetha Lebitso La Mosebedisi",
  selectUsernameDigits: "Kgetha Lebitso La Mosebedisi + Dinomoro Tse 6",
  usernameError: "Mabitso a basebedisi a porofaele ya setjhaba a ka sebedisa ditlhaku tsa Senyesemane, dinomoro kapa - feela.",
  usernameTakenError: "Lebitso la mosebedisi la porofaele ya setjhaba le se le nkilwe. Ka kopo kgetha le leng.",
  photoSelected: "setshwantsho se kgethilwe",
  photosSelected: "ditshwantsho tse kgethilweng",
  debugLog: "Ngolliso Ya Phoso"
}
};

const SaveAlbum = () => {

  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null)
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [showAltButton, setShowAltButton] = useState(false)
  const [isSubmittingUsername, setIsSubmittingUsername] = useState(false)
  const [debugMessages, setDebugMessages] = useState<string[]>([])
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  })
  const [isSavingAlbum, setIsSavingAlbum] = useState(false)
  
  // Language state
  const [language, setLanguage] = useState<LanguageCode>('en-US')
  const [t, setT] = useState<Translations>(translations['en-US'])

  // Add a log function that updates both console and debug state
  const log = (message: string) => {
    console.log(message)
    
    // Only add to debug messages if it's an error (starts with ❌)
    if (message.includes("❌") || message.includes("⚠️")) {
      setDebugMessages(prev => [...prev, message])
    }
  }

  // Clear all album data when leaving the page
  const clearAlbumData = () => {
    log("🧹 Clearing all album data...")
    
    // Clear all album-related data from local storage
    localStorage.removeItem(STORAGE_KEYS.FOLDER_ID)
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    
    // Also clear any session storage that might be holding state
    sessionStorage.removeItem(STORAGE_KEYS.FOLDER_ID)
    sessionStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    
    // Reset states
    setFolderId(null)
    setSelectedPhotos([])
    setProgressTracker({
      totalFiles: 0,
      filesComplete: 0,
      filesUploading: 0,
      filesProcessing: 0,
      filesWithError: 0,
      overallProgress: 0
    })
    setIsSavingAlbum(false) // Reset saving state
    
    // Reset UI progress elements
    const saveProgress = document.getElementById('saveProgress')
    if (saveProgress) {
      saveProgress.style.setProperty('width', '0%')
    }
    
    const saveProgressText = document.getElementById('saveProgressText')
    if (saveProgressText) {
      saveProgressText.innerText = ""
    }
    
    log("✅ Album data cleared successfully")
  }

  // Initialize language
  useEffect(() => {
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      setLanguage(storedLanguage as LanguageCode)
      setT(translations[storedLanguage as LanguageCode])
    } else {
      // Try to detect browser language
      const browserLang = navigator.language
      
      if (browserLang && Object.keys(translations).includes(browserLang)) {
        setLanguage(browserLang as LanguageCode)
        setT(translations[browserLang as LanguageCode])
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, browserLang)
      } else {
        // Try language without region code
        const langCode = browserLang?.split('-')[0]
        if (langCode && Object.keys(translations).includes(langCode)) {
          setLanguage(langCode as LanguageCode)
          setT(translations[langCode as LanguageCode])
          localStorage.setItem(STORAGE_KEYS.LANGUAGE, langCode)
        }
      }
    }
  }, [])

  // // Handle language change
  // const handleLanguageChange = (newLang: LanguageCode) => {
  //   setLanguage(newLang)
  //   setT(translations[newLang])
  //   localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang)
  // }

  useEffect(() => {
    log("🔄 Component initializing...")
  
    // Clear any leftover UI state first
    setIsSavingAlbum(false)
    
    try {
      const token = checkLoginOrRedirect()
      if (!token) {
        log("❌ No token available, redirecting...")
        return
      }
      
      log("✅ Token available")
    
      try {
        const savedUsername = localStorage.getItem("publicUsername")
        setPublicUsername(savedUsername || null)
        log(`👤 Public username: ${savedUsername || "not set"}`)
    
        const payload = JSON.parse(atob(token.split('.')[1]))
        const cognitoUsername = payload["cognito:username"]
        setCognitoUsername(cognitoUsername)
        log(`👤 Cognito username: ${cognitoUsername}`)
        
        // Check if we're returning to this page or starting fresh
        const storedFolderId = localStorage.getItem(STORAGE_KEYS.FOLDER_ID)
        const params = new URLSearchParams(window.location.search)
        const id = params.get("folderId")
    
        // Priority: URL param > localStorage > generate new
        if (id) {
          setFolderId(id)
          localStorage.setItem(STORAGE_KEYS.FOLDER_ID, id)
          log(`📁 Using folder ID from URL: ${id}`)
        } else if (storedFolderId) {
          setFolderId(storedFolderId)
          log(`📁 Using stored folder ID: ${storedFolderId}`)
        } else {
          const newId = `${cognitoUsername}_____${generateUUID()}____Folder`
          setFolderId(newId)
          localStorage.setItem(STORAGE_KEYS.FOLDER_ID, newId)
          log(`📁 Created new folder ID: ${newId}`)
        }
        
        // Try to restore selected photos from localStorage
        try {
          const storedPhotos = localStorage.getItem(STORAGE_KEYS.SELECTED_PHOTOS)
          log(`🔍 Checking for stored photos with key ${STORAGE_KEYS.SELECTED_PHOTOS}`)
          if (storedPhotos) {
            log(`📦 Found stored photos data: ${storedPhotos.substring(0, 100)}...`)
            try {
              const parsedPhotos = JSON.parse(storedPhotos) as SelectedPhoto[]
              log(`📊 Parsed photos data: ${JSON.stringify(parsedPhotos.length)} items`)
              if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
                setSelectedPhotos(parsedPhotos)
                log(`📸 Restored ${parsedPhotos.length} photos from storage`)
              } else {
                log(`⚠️ Parsed photos array is empty or not an array`)
              }
            } catch (parseErr) {
              log(`❌ Error parsing stored photos: ${String(parseErr)}`)
            }
          }
        } catch (storageErr) {
          log(`⚠️ Error restoring photos from storage: ${String(storageErr)}`)
          // Not critical, can continue
        }
      } catch (err) {
        log(`❌ Error initializing: ${String(err)}`)
        console.error("Failed to decode idToken", err)
      }
    } catch (initErr) {
      log(`❌ Fatal initialization error: ${String(initErr)}`)
    }
  
    // Test S3 connection
    try {
      if (s3) {
        log("🔄 Testing S3 connection...")
        log(`✅ S3 client appears to be configured correctly (${typeof s3})`)
      } else {
        log("❌ S3 client not available")
      }
    } catch (s3Err) {
      log(`❌ S3 connection test error: ${String(s3Err)}`)
    }
    
  }, [])

  // Save selected photos to localStorage whenever they change
  useEffect(() => {
    if (selectedPhotos.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(selectedPhotos))
      log(`📸 Saved ${selectedPhotos.length} photos to storage`)
    }
  }, [selectedPhotos])

  // Update progress tracker whenever selectedPhotos changes
  useEffect(() => {
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
  }, [selectedPhotos])

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
  }

  // Update specific photo's status and progress
  const updatePhotoStatus = (index: number, status: UploadStatus, progress: number, errorMessage?: string) => {
    setSelectedPhotos(prev => 
      prev.map((photo, i) => 
        i === index 
          ? { ...photo, status, progress, errorMessage } 
          : photo
      )
    )
  }

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    log("🔍 Add Photos button clicked")
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username")
      return
    }
  
    const files = Array.from(e.target.files || [])
    log(`📁 Files selected: ${files.length}`)
    
    if (!files.length) return
    
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
      
      // Add these pending photos to state
      setSelectedPhotos(prev => [...prev, ...initialPhotos])
      
      // Now process each file one by one, updating its status as we go
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const photo = initialPhotos[i]
        const currentIndex = selectedPhotos.length + i
        
        try {
          updatePhotoStatus(currentIndex, 'uploading', 0.1)
          log(`📝 Processing file ${i + 1}/${files.length}: ${file.name} (${file.type})`)
          
          const type: string = file.type
          // const fileExt = file.name.split('.').pop() || "jpg"
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
          updatePhotoStatus(currentIndex, 'uploading', 0.3)
          
          // Upload to temp folder
          try {
            log(`⬆️ Uploading to ${tempS3Key}...`)
            await s3.send(new PutObjectCommand({
              Bucket: BUCKET_NAME,
              Key: tempS3Key,
              Body: new Uint8Array(arrayBuffer),
              ContentType: file.type || "application/octet-stream"
            }))
            log(`✅ Upload to ${tempS3Key} successful`)
            updatePhotoStatus(currentIndex, 'uploading', 0.6)
          } catch (uploadErr) {
            log(`❌ S3 upload error: ${String(uploadErr)}`)
            updatePhotoStatus(currentIndex, 'error', 0, String(uploadErr))
            continue
          }
          
          // Create S3 preview URL - this would typically be constructed from your S3 bucket URL
          const s3PreviewUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${tempS3Key}`
          log(`🔗 Generated S3 preview URL: ${s3PreviewUrl}`)
          
          let duration: number | null = null
          let thumbnailDataKey: string | null = null
          let thumbnailSize: number | null = null
          let tempThumbnailKey: string | null = null

          if (type.startsWith("video")) {
            updatePhotoStatus(currentIndex, 'processing', 0.7)
            try {
              log(`🎬 Processing video metadata...`)
              duration = Math.round(await getVideoDuration(file))
              log(`⏱️ Video duration: ${duration} seconds`)
              
              log(`🎬 Generating video thumbnail...`)
              const thumbnailBlob = await getVideoThumbnailBlob(file)
              thumbnailDataKey = `Input/Image/${uuidFileName}-thumbnail`
              tempThumbnailKey = `temp/${thumbnailDataKey}`
              thumbnailSize = Math.round(thumbnailBlob.size)
              log(`🎬 Thumbnail generated: ${thumbnailSize} bytes`)
              updatePhotoStatus(currentIndex, 'processing', 0.8)

              // Convert thumbnail blob to ArrayBuffer
              const thumbnailArrayBuffer = await thumbnailBlob.arrayBuffer()
              log(`📦 Converted thumbnail to ArrayBuffer`)
              
              log(`⬆️ Uploading thumbnail to ${tempThumbnailKey}...`)
              await s3.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: tempThumbnailKey,
                Body: new Uint8Array(thumbnailArrayBuffer),
                ContentType: "image/jpeg"
              }))
              log(`✅ Thumbnail upload successful`)
              updatePhotoStatus(currentIndex, 'processing', 0.9)
            } catch (videoErr) {
              log(`⚠️ Video processing error: ${String(videoErr)}`)
              // Don't fail the whole upload if just the thumbnail fails
            }
          }

          // Update the photo status to complete
          updatePhotoStatus(currentIndex, 'complete', 1)
          
          // Update the photo in selectedPhotos with all the new information
          setSelectedPhotos(prev => {
            const updated = [...prev]
            updated[currentIndex] = {
              ...updated[currentIndex],
              s3PreviewUrl, // Now use the S3 URL
              duration,
              thumbnailDataKey,
              thumbnailSize,
              tempKey: tempS3Key,
              tempThumbnailKey,
              status: 'complete',
              progress: 1
            }
            return updated
          })
          
          log(`✅ File ${i + 1} processing complete`)
        } catch (fileErr) {
          log(`❌ Error processing file ${i + 1}: ${String(fileErr)}`)
          updatePhotoStatus(currentIndex, 'error', 0, String(fileErr))
        }
      }
    
      log(`✅ All files processed`)
      
      // Revoke object URLs to prevent memory leaks
      initialPhotos.forEach(photo => {
        if (photo.s3PreviewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(photo.s3PreviewUrl)
        }
      })
    } catch (error) {
      log(`❌ Fatal error in handleAddPhotos: ${String(error)}`)
    } finally {
      e.target.value = ""
    }
  }  

  // New function that contains just the album saving logic without the username checks
  const saveAlbumDirectly = async () => {
    log("🔍 Executing album save directly after username update")
    setIsSavingAlbum(true)

    try {
      const now = Math.floor(Date.now() / 1000)
      const token = localStorage.getItem("idToken")
      
      if (!token) {
        log("❌ No ID token found")
        setIsSavingAlbum(false)
        return
      }
      
      if (!cognitoUsername) {
        log("❌ No Cognito username found")
        setIsSavingAlbum(false)
        return
      }
      
      if (!folderId) {
        log("❌ No folder ID found")
        setIsSavingAlbum(false)
        return
      }
      
      // Filter out photos with error status
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete')

      log(`📊 Processing ${validPhotos.length} photos`)
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`
      const folderParts = folderId.split("_____")
      const folderTargetItemIdentifier = folderParts[1].split("____")[0]
      log(`🆔 Folder target identifier: ${folderTargetItemIdentifier}`)

      // Move files from temp to public folder
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
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${photo.tempKey}`,
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
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${photo.tempThumbnailKey}`,
                Key: publicThumbnailKey
              }))
              log(`✅ Thumbnail copy successful`)
            }
            
            completedMoves++
            // Update progress in UI
            const moveProgress = (completedMoves / totalMoves) * 100
            document.getElementById('saveProgress')?.style.setProperty('width', `${moveProgress}%`)
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

      const folderPositionInput = {
        currentTime: now,
        folderId,
        profileIds: ["Only Me_____Only Me____Profile"],
        folderPositionSelectedTagInputs: [],
        folderPositionPoints: 1,
        acceptedFileReferenceIds: validPhotos.map(photo =>
          `${folderTargetItemIdentifier}_____${photo.fileName}____FileReference`
        ),
        hiddenFileReferenceIds: [],
        folderInput: {
          folderSelectedTagInputs: [],
          folderAboutContactIds: [accountId],
          folderInviteParametersInput: {
            folderIsOnlyVisibleThroughCode: true,
            folderInviteHasBeenDisabled: false,
            usingFolderInviteGrantsRightToRemoveItems: false,
            tagContactIdUsingFolderInviteAsFolderAboutContact: true,
            usingFolderInviteGrantsRightToAddItems: true,
            addedItemsNeedFolderCreatorApproval: false
          }
        }
      }

      const updatedFileReferenceInputs = validPhotos.map(photo => {
        const dataKey = photo.type === "video" || photo.type?.startsWith("video")
          ? `Input/Video/${photo.fileName}`
          : `Input/Image/${photo.fileName}`

        const fileId = `${cognitoUsername}_____${photo.fileName}____File`

        return {
          fileReferencesHolderId: folderId,
          currentTime: now,
          points: 1,
          hasBeenDeleted: false,
          selectedTagInputs: [],
          fileId,
          fileInput: {
            fileId,
            ownerFileInput: {
              editorContactIds: [accountId],
              FileSharingOptionsEnum: "Anyone",
              dataKey,
              thumbnailDataKey: photo.thumbnailDataKey,
              dataInBytes: photo.size!,
              thumbnailDataInBytes: photo.thumbnailSize || 0,
              s3UploadedAt: now,
              durationInSeconds: photo.duration
            },
            editorFileInput: {
              aboutContactIds: [accountId],
              captionText: "",
              numericFilterInputs: [],
            }
          }
        }
      })

      const mutation = `
        mutation MyMutation(
          $folderPositionInputs: [FolderPositionInput!],
          $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
        ) {
          changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
            items {
              ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
            }
          }
          changeFiles(folderPositionInputs: $folderPositionInputs) {
            items { id }
          }
        }
      `

      const variables = {
        folderPositionInputs: [folderPositionInput],
        updatedFileReferenceInputs,
      }
      
      log("📊 Sending GraphQL mutation to save album...")
      const saveProgressText = document.getElementById('saveProgressText')
      if (saveProgressText) {
        saveProgressText.innerText = "Finalizing album..."
      }

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      })

      const json = await response.json()

      if (json.errors) {
        log("❌ Upload failed: " + (json.errors ? JSON.stringify(json.errors, null, 2) : "Unknown error"))
        setIsSavingAlbum(false)
      } else {
        log("✅ Album saved successfully!")
        
        // Clear all album data before redirecting
        clearAlbumData()
        
        const saveSuccessText = document.getElementById('saveProgressText')
        if (saveSuccessText) {
          saveSuccessText.innerText = "Album saved successfully!"
        }
        
        // Also set a flag in sessionStorage that we just completed an album
        sessionStorage.setItem('album_just_saved', 'true')
        
        // Slight delay before redirect for user to see success message
        setTimeout(() => {
          window.location.href = "/app/my-albums.html"
        }, 1000)
      }
    } catch (err) {
      log("❌ Unexpected error: " + String(err))
      setIsSavingAlbum(false)
    }
  }

  // Modified to check username and either show prompt or call saveAlbumDirectly
  const handleSaveAlbum = async () => {
    log("🔍 Save Album button clicked")
    setIsSavingAlbum(true)

    try {
      if (publicUsername?.startsWith("Profile-")) {
        log("👤 Username starts with Profile-, showing username prompt")
        setUsernameInput(publicUsername)
        setShowUsernamePrompt(true)
        setIsSavingAlbum(false)
        return
      }

      // If we have a valid username, proceed directly to saving
      saveAlbumDirectly()
    } catch (err) {
      log("❌ Unexpected error in handleSaveAlbum: " + String(err))
      setIsSavingAlbum(false)
    }
  }
  
  const validateUsername = (username: string) => /^[a-zA-Z0-9-]+$/.test(username)

  // Modified to call saveAlbumDirectly instead of handleSaveAlbum
  const submitUsername = async (proposedName: string) => {
    setIsSubmittingUsername(true)
    setUsernameError("")

    const token = localStorage.getItem("idToken")
    if (!token) return

    const mutation = `
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `

    const variables = {
      savePublicProfileDisplayNameInput: {
        anyDisplayName: proposedName,
      },
    }

    try {
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      })

      const json = await res.json()
      const newName = json?.data?.changeMyAccountItem?.anyDisplayName

      if (newName) {
        localStorage.setItem("publicUsername", newName)
        setPublicUsername(newName)
        setShowUsernamePrompt(false)
        
        // Automatically proceed with saving the album after username is set
        // Call saveAlbumDirectly instead of handleSaveAlbum to avoid the check loop
        log("👤 Username saved successfully, automatically proceeding to save album")
        saveAlbumDirectly()
      } else {
        throw new Error("Username taken")
      }
    } catch (e) {
      setUsernameError(t.usernameTakenError)
      setShowAltButton(true)
      setIsSubmittingUsername(false)
    }
  }

  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString()
    const modified = `${usernameInput}${digits}`
    setUsernameInput(modified)
    submitUsername(modified)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/index.html"
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        direction: language === 'ar' ? 'rtl' : 'ltr' // Add RTL support for Arabic
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <a 
            href="/app/my-albums.html"
            style={{
              fontSize: "16px",
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            {t.myAlbums}
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {publicUsername && (
              <>
                <div style={{ fontSize: "16px", color: "#666" }}>{publicUsername}</div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  {t.logOut}
                </a>
              </>
            )}
          </div>
        </div>

        {/* Progress Tracking Overview */}
        {progressTracker.totalFiles > 0 && (
          <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{t.uploadProgress}</h3>
            
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                <span>{t.overallProgress}: {Math.round(progressTracker.overallProgress * 100)}%</span>
                <span>{progressTracker.filesComplete} {t.ofComplete} {progressTracker.totalFiles} {t.complete}</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
                <div 
                  style={{ 
                    height: "100%", 
                    width: `${progressTracker.overallProgress * 100}%`, 
                    backgroundColor: "#4caf50",
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "12px", fontSize: "14px", color: "#666" }}>
              {progressTracker.filesUploading > 0 && (
                <div>📤 {t.uploading}: {progressTracker.filesUploading}</div>
              )}
              {progressTracker.filesProcessing > 0 && (
                <div>⚙️ {t.processing}: {progressTracker.filesProcessing}</div>
              )}
              {progressTracker.filesComplete > 0 && (
                <div>✅ {t.complete}: {progressTracker.filesComplete}</div>
              )}
              {progressTracker.filesWithError > 0 && (
                <div style={{ color: "#e53935" }}>❌ {t.failed}: {progressTracker.filesWithError}</div>
              )}
            </div>
          </div>
        )}

        {/* Save Album Progress */}
        {isSavingAlbum && (
          <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{t.savingAlbum}</h3>
            <div id="saveProgressText" style={{ fontSize: "14px", marginBottom: "8px" }}>{t.movingFiles}</div>
            <div style={{ height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
              <div 
                id="saveProgress"
                style={{ 
                  height: "100%", 
                  width: "5%", 
                  backgroundColor: "#2196f3",
                  borderRadius: "4px",
                  transition: "width 0.3s ease"
                }}
              />
            </div>
          </div>
        )}

        <input
          type="file"
          id="file-input"
          accept="image/*,video/*"
          multiple
          onChange={handleAddPhotos}
          style={{ display: "none" }}
        />

        {selectedPhotos.length > 0 && (
          <>
            <p style={{ fontSize: "16px", marginBottom: "16px", color: "#333" }}>
              {selectedPhotos.length} {selectedPhotos.length > 1 ? t.photosSelected : t.photoSelected}:
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
              {selectedPhotos.map((photo, i) => (
                <div key={i} style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  width: "160px",
                  position: "relative"
                }}>
                  {/* Status indicator */}
                  <div style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    backgroundColor: 
                      photo.status === 'complete' ? '#4caf50' : 
                      photo.status === 'error' ? '#e53935' :
                      photo.status === 'uploading' ? '#2196f3' :
                      photo.status === 'processing' ? '#ff9800' : '#9e9e9e',
                    color: 'white',
                    zIndex: 1
                  }}>
                    {photo.status === 'complete' ? '✓' : 
                     photo.status === 'error' ? '✕' :
                     photo.status === 'uploading' ? '↑' :
                     photo.status === 'processing' ? '⚙️' : '•'}
                  </div>

                  {/* Media preview */}
                  <div style={{ position: "relative", marginBottom: "8px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {photo.type === "video" || photo.type?.startsWith("video") ? (
                      <video src={photo.s3PreviewUrl} controls style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "6px" }} />
                    ) : (
                      <img src={photo.s3PreviewUrl} alt={photo.fileName} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "6px" }} />
                    )}
                    
                    {/* Upload progress bar for in-progress items */}
                    {(photo.status === 'uploading' || photo.status === 'processing') && (
                      <div style={{ 
                        position: "absolute", 
                        bottom: "4px", 
                        left: "4px", 
                        right: "4px", 
                        height: "4px", 
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "2px",
                        overflow: "hidden"
                      }}>
                        <div style={{ 
                          height: "100%", 
                          width: `${photo.progress * 100}%`, 
                          backgroundColor: photo.status === 'uploading' ? "#2196f3" : "#ff9800",
                          transition: "width 0.3s ease"
                        }} />
                      </div>
                    )}
                  </div>
                  
                  {/* File info */}
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "6px" }}>
                    {photo.type?.startsWith("video") ? t.video : t.image}
                    {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} MB`}
                    {photo.duration && ` • ${photo.duration}s`}
                  </div>

                  {/* Error message if any */}
                  {photo.status === 'error' && photo.errorMessage && (
                    <div style={{ fontSize: "12px", color: "#e53935", marginBottom: "6px" }}>
                      {t.error}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
                    </div>
                  )}
                  
                  {/* Remove button */}
                  <button 
                    onClick={() => removePhoto(i)} 
                    style={{
                      backgroundColor: "#e53935",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      marginTop: "auto"
                    }}
                    disabled={isSavingAlbum}
                  >
                    {t.remove}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
              opacity: isSavingAlbum ? 0.6 : 1,
              pointerEvents: isSavingAlbum ? "none" : "auto"
            }}
            onClick={handleSaveAlbum}
            disabled={isSavingAlbum}
          >
            {isSavingAlbum ? t.savingAlbumProgress : t.saveAlbum}
          </button>

          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#6c757d",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
              opacity: isSavingAlbum ? 0.6 : 1,
              pointerEvents: isSavingAlbum ? "none" : "auto"
            }}
            onClick={() => {
              const input = document.getElementById("file-input") as HTMLInputElement
              input?.click()
            }}
            disabled={isSavingAlbum}
          >
            {t.addMorePhotos}
          </button>
        </div>

        {showUsernamePrompt && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}>
            <div style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
              width: "90%",
              maxWidth: 400,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              direction: language === 'ar' ? 'rtl' : 'ltr' // RTL support for the modal
            }}>
              <p style={{ fontSize: 16, marginBottom: 12 }}>
                {t.enterUsername}
              </p>
              <p style={{ fontSize: 14, marginBottom: 16, color: "#666" }}>
                {t.usernameExample}
              </p>
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  textAlign: language === 'ar' ? 'right' : 'left' // Text alignment for RTL
                }}
              />
              {usernameError && <div style={{ color: "#e53935", marginBottom: 12 }}>{usernameError}</div>}
              <button
                disabled={isSubmittingUsername}
                onClick={() => {
                  if (!validateUsername(usernameInput)) {
                    setUsernameError(t.usernameError)
                    return
                  }
                  submitUsername(usernameInput)
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  opacity: isSubmittingUsername ? 0.6 : 1,
                  marginBottom: showAltButton ? 10 : 0
                }}
              >
                {t.selectUsername}
              </button>
              {showAltButton && (
                <button
                  disabled={isSubmittingUsername}
                  onClick={appendRandomDigits}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    opacity: isSubmittingUsername ? 0.6 : 1
                  }}
                >
                  {t.selectUsernameDigits}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {debugMessages.length > 0 && (
        <div style={{ marginTop: "40px", background: "#fff3cd", padding: "16px", borderRadius: "8px", border: "1px solid #ffeeba" }}>
          <h3 style={{ marginTop: 0, fontSize: "18px", color: "#856404" }}>{t.debugLog}</h3>
          <pre style={{ fontSize: "14px", color: "#856404", whiteSpace: "pre-wrap", maxHeight: "400px", overflow: "auto" }}>
            {debugMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>{msg}</div>
            ))}
          </pre>
        </div>
      )}

    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbum />)
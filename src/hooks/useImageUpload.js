import { useState } from 'react'
import { uploadToCloudinary } from '../utils/cloudinary'
import { uploadToS3Presigned, isS3Configured } from '../utils/s3'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve({
        type: 'local',
        url: reader.result,
      })
    }

    reader.onerror = () => {
      reject(new Error(`Could not read ${file.name}.`))
    }

    reader.readAsDataURL(file)
  })
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  async function uploadFiles(files, mode) {
    if (!files.length) {
      return []
    }

    setIsUploading(true)
    setError('')

    try {
      if (mode === 'cloud') {
        const uploadedImages = await Promise.all(files.map((file) => uploadToCloudinary(file)))
        return uploadedImages
      }

      if (mode === 's3') {
        if (!isS3Configured()) {
          throw new Error('S3 not configured. Set VITE_S3_PRESIGN_ENDPOINT in .env')
        }
        const uploaded = await Promise.all(files.map((file) => uploadToS3Presigned(file)))
        return uploaded
      }

      const localImages = await Promise.all(files.map((file) => fileToDataUrl(file)))
      return localImages
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : 'Upload failed.'
      setError(message)
      throw uploadError
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadFiles,
    isUploading,
    error,
    setError,
  }
}
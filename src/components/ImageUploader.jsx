import { useState } from 'react'
import { isCloudinaryConfigured } from '../utils/cloudinary'
import { isS3Configured } from '../utils/s3'
import { useImageUpload } from '../hooks/useImageUpload'
import { useRef } from 'react'

export default function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null)
  const [mode, setMode] = useState('local')
  const { uploadFiles, isUploading, error, setError } = useImageUpload()

  function clearSelection() {
    onChange([])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    clearSelection()
  }

  async function handleFileChange(event) {
    const nextFiles = Array.from(event.target.files ?? [])

    if (!nextFiles.length) {
      return
    }

    try {
      const nextImages = await uploadFiles(nextFiles, mode)
      onChange(nextImages)
    } catch {
      onChange([])
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="space-y-4 rounded-[28px] border border-white/80 bg-white/85 p-4 shadow-[0_18px_40px_-32px_rgba(15,23,42,.5)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Images</p>
          <p className="text-sm text-slate-500">Add one or more photos from device or Cloudinary.</p>
        </div>

        <div className="inline-flex flex-wrap rounded-full bg-slate-100 p-1 text-sm font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => switchMode('local')}
            className={`rounded-full px-4 py-2 transition ${mode === 'local' ? 'bg-white text-slate-950 shadow' : ''}`}
          >
            Local upload
          </button>
          <button
            type="button"
            onClick={() => switchMode('cloud')}
            className={`rounded-full px-4 py-2 transition ${mode === 'cloud' ? 'bg-white text-slate-950 shadow' : ''}`}
          >
            Cloud upload
          </button>
          <button
            type="button"
            onClick={() => switchMode('s3')}
            className={`rounded-full px-4 py-2 transition ${mode === 's3' ? 'bg-white text-slate-950 shadow' : ''}`}
          >
            S3 upload
          </button>
        </div>
      </div>

      {!isCloudinaryConfigured() && mode === 'cloud' ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to enable cloud uploads.
        </div>
      ) : null}

      {!isS3Configured() && mode === 's3' ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Set VITE_S3_PRESIGN_ENDPOINT to enable S3 uploads.
        </div>
      ) : null}

      <label className="flex cursor-pointer flex-col gap-3 rounded-3xl border-2 border-dashed border-fuchsia-200 bg-linear-to-br from-fuchsia-50 via-white to-cyan-50 px-5 py-6 text-center transition hover:border-fuchsia-300">
        <span className="text-base font-bold text-slate-800">
          Tap or click to choose photos
        </span>
        <span className="text-sm text-slate-500">
          PNG, JPG, JPEG, WEBP. Multiple images are supported.
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {isUploading ? (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">
          Uploading images...
        </div>
      ) : null}

      {images.length ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-600">Preview</p>
            <button
              type="button"
              onClick={clearSelection}
              className="text-sm font-semibold text-fuchsia-600 transition hover:text-fuchsia-700"
            >
              Clear photos
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="overflow-hidden rounded-[22px] border border-white/80 bg-slate-100"
              >
                <img src={image.url} alt={`Selected photo ${index + 1}`} className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
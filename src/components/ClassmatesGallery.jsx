import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getClassmateImageSource } from '../utils/storage'

function ClassmateImage({ classmate }) {
  const [{ src }, setImageState] = useState(() => getClassmateImageSource(classmate.name, classmate.imageUrl))
  const [fallbackVisible, setFallbackVisible] = useState(false)

  useEffect(() => {
    let isActive = true
    let objectUrl = ''

    async function prepareImage() {
      const imageSource = getClassmateImageSource(classmate.name, classmate.imageUrl)

      if (!imageSource.src) {
        if (isActive) {
          setImageState(imageSource)
          setFallbackVisible(true)
        }
        return
      }

      if (!/\.hei[cf]$/i.test(imageSource.assetPath)) {
        if (isActive) {
          setImageState(imageSource)
          setFallbackVisible(false)
        }
        return
      }

      try {
        const response = await fetch(imageSource.src)
        const blob = await response.blob()
        const { default: heic2any } = await import('heic2any')
        const converted = await heic2any({ blob, toType: 'image/jpeg', quality: 0.9 })
        const convertedBlob = Array.isArray(converted) ? converted[0] : converted
        objectUrl = URL.createObjectURL(convertedBlob)

        if (isActive) {
          setImageState({ src: objectUrl, assetPath: imageSource.assetPath })
          setFallbackVisible(false)
        }
      } catch {
        if (isActive) {
          setImageState(imageSource)
          setFallbackVisible(true)
        }
      }
    }

    prepareImage()

    return () => {
      isActive = false

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [classmate.imageUrl, classmate.name])

  if (fallbackVisible || !src) {
    return (
      <div className="flex h-32 w-32 items-center justify-center rounded-[20px] bg-gradient-to-br from-fuchsia-200 via-rose-200 to-amber-200">
        <span className="text-4xl font-black text-white/60">
          {classmate.name.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={classmate.name}
      className="h-32 w-32 rounded-[20px] object-cover"
      loading="lazy"
      onError={() => setFallbackVisible(true)}
    />
  )
}

function ClassmateCard({ classmate, onRemove }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_45px_-32px_rgba(15,23,42,.45)]">
      <ClassmateImage classmate={classmate} />
      <div className="text-center">
        <p className="font-bold text-slate-900">{classmate.name}</p>
        <p className="text-xs text-slate-500">{classmate.rollNumber}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(classmate.id)}
        className="text-xs font-semibold text-rose-600 transition hover:text-rose-700"
      >
        Remove
      </button>
    </div>
  )
}

export default function ClassmatesGallery({ classmates, onAddClassmate, onRemoveClassmate }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    imageUrl: '',
  })

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name.trim() || !formData.rollNumber.trim()) {
      alert('Please fill in name and roll number.')
      return
    }

    onAddClassmate({
      id: uuidv4(),
      name: formData.name.trim(),
      rollNumber: formData.rollNumber.trim(),
      imageUrl: formData.imageUrl.trim(),
    })

    setFormData({ name: '', rollNumber: '', imageUrl: '' })
    setShowForm(false)
  }

  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8 rounded-[36px] border border-white/80 bg-white/80 px-5 py-8 shadow-[0_24px_75px_-44px_rgba(15,23,42,.5)] backdrop-blur lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-500">Class of 2022-2026</p>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Meet the Batch</h2>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              {showForm ? 'Cancel' : 'Add Classmate'}
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-[24px] border border-fuchsia-200 bg-fuchsia-50 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-[16px] border border-fuchsia-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400"
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="rounded-[16px] border border-fuchsia-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400"
              />
            </div>
            <input
              type="url"
              placeholder="Image URL (optional, Cloudinary or any CDN)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full rounded-[16px] border border-fuchsia-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400"
            />
            <button
              type="submit"
              className="rounded-full bg-fuchsia-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-fuchsia-700"
            >
              Add to Batch
            </button>
          </form>
        )}

        {classmates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {classmates.map((classmate) => (
              <ClassmateCard
                key={classmate.id}
                classmate={classmate}
                onRemove={onRemoveClassmate}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50 py-12 text-center">
            <p className="text-sm font-semibold text-slate-500">No classmates added yet.</p>
            <p className="text-xs text-slate-400">Click "Add Classmate" to start building the batch gallery.</p>
          </div>
        )}
      </div>
    </section>
  )
}

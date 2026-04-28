import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import FriendTag from './FriendTag'

export default function MemoryDetail({ memory, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    if (!memory) {
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [memory, onClose])

  const images = memory.images.length ? memory.images : [{ type: 'local', url: '' }]

  function goToPrevious() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length)
  }

  function goToNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length)
  }

  function handleTouchStart(event) {
    setTouchStart(event.touches[0].clientX)
  }

  function handleTouchEnd(event) {
    if (touchStart === null) {
      return
    }

    const touchEnd = event.changedTouches[0].clientX
    const difference = touchStart - touchEnd

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }

    setTouchStart(null)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-md" onClick={onClose}>
      <div
        className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[36px] border border-white/80 bg-white shadow-[0_50px_120px_-48px_rgba(15,23,42,.9)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Memory details</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">{memory.caption}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 overflow-y-auto p-5 sm:p-6 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-4">
            <div
              className="relative overflow-hidden rounded-[30px] border border-slate-100 bg-gradient-to-br from-fuchsia-50 via-white to-cyan-50 p-3 shadow-inner"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images[activeIndex]?.url ? (
                <img
                  src={images[activeIndex].url}
                  alt={memory.caption}
                  className="h-[430px] w-full rounded-[24px] object-cover sm:h-[520px]"
                />
              ) : (
                <div className="flex h-[430px] items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,rgba(251,191,36,.9),rgba(244,114,182,.9),rgba(34,211,238,.9))] p-6 text-center text-2xl font-black text-white sm:h-[520px]">
                  No photo uploaded yet.
                </div>
              )}

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg transition hover:bg-white"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg transition hover:bg-white"
                  >
                    Next
                  </button>
                </>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={`${image.url}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                      index === activeIndex ? 'border-fuchsia-400' : 'border-white/80'
                    }`}
                  >
                    <img src={image.url} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-5 rounded-[30px] border border-slate-100 bg-slate-50 p-5 sm:p-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Date</p>
              <p className="mt-2 text-xl font-extrabold text-slate-950">
                {format(parseISO(memory.date), 'd MMMM yyyy')}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Story</p>
              <p className="mt-3 whitespace-pre-line text-base leading-8 text-slate-700">
                {memory.story || 'No story was written for this memory.'}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Tagged friends</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {memory.friends.length ? (
                  memory.friends.map((friend, index) => (
                    <FriendTag key={`${friend}-${index}`} name={friend} index={index} />
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No friend tags added yet.</span>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/80 bg-white p-4 text-sm text-slate-600 shadow-sm">
              Swipe the photo or use Prev/Next to move through the carousel.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useEffect, useRef, useState } from 'react'
import { format, parseISO } from 'date-fns'
import FriendTag from './FriendTag'

function MemoryImages({ images }) {
  if (!images.length) {
    return (
      <div className="flex min-h-56 items-center justify-center rounded-[24px] border border-dashed border-fuchsia-200 bg-gradient-to-br from-fuchsia-100 via-amber-100 to-cyan-100 p-6 text-center text-sm font-semibold text-slate-600">
        Drop a memory photo here and it will glow in the timeline.
      </div>
    )
  }

  const visibleImages = images.slice(0, 3)

  return (
    <div className={`grid gap-3 ${visibleImages.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
      {visibleImages.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className="relative overflow-hidden rounded-[22px] border border-white/70 bg-slate-100 shadow-inner shadow-slate-200/50"
        >
          <img
            src={image.url}
            alt={`Memory photo ${index + 1}`}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-44"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent" />
        </div>
      ))}
      {images.length > visibleImages.length ? (
        <div className="flex min-h-52 items-center justify-center rounded-[22px] border border-white/70 bg-slate-900/92 p-6 text-sm font-semibold text-white sm:min-h-44">
          +{images.length - visibleImages.length} more photos
        </div>
      ) : null}
    </div>
  )
}

export default function MemoryCard({ memory, onOpen }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = cardRef.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -80px 0px',
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className={`group w-full transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => onOpen(memory)}
        className="w-full rounded-[30px] border border-white/70 bg-white/85 p-4 text-left shadow-[0_22px_55px_-35px_rgba(15,23,42,.55)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(236,72,153,.45)] focus:outline-none focus:ring-4 focus:ring-cyan-200/60"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-100 via-amber-100 to-cyan-100 px-3 py-1 text-xs font-bold tracking-[0.24em] text-slate-700 uppercase">
            {format(parseISO(memory.date), 'dd MMM yyyy')}
          </div>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            {memory.images.length} photo{memory.images.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
            {memory.caption}
          </h3>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            {memory.story || 'A memory without a story still keeps the feeling alive.'}
          </p>
          <MemoryImages images={memory.images} />
          <div className="flex flex-wrap gap-2 pt-1">
            {memory.friends.map((friend, index) => (
              <FriendTag key={`${friend}-${index}`} name={friend} index={index} />
            ))}
          </div>
        </div>
      </button>
    </article>
  )
}
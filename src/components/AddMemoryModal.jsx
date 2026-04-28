import { useEffect, useState } from 'react'
import ImageUploader from './ImageUploader'
import FriendTag from './FriendTag'

function normalizeFriendName(value) {
  return value.trim().replace(/\s+/g, ' ')
}

export default function AddMemoryModal({ onClose, onSave }) {
  const [date, setDate] = useState('')
  const [caption, setCaption] = useState('')
  const [story, setStory] = useState('')
  const [friendInput, setFriendInput] = useState('')
  const [friends, setFriends] = useState([])
  const [images, setImages] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  function resetForm() {
    setDate('')
    setCaption('')
    setStory('')
    setFriendInput('')
    setFriends([])
    setImages([])
    setError('')
  }

  function addFriend(name) {
    const nextFriend = normalizeFriendName(name)

    if (!nextFriend || friends.some((friend) => friend.toLowerCase() === nextFriend.toLowerCase())) {
      return
    }

    setFriends((currentFriends) => [...currentFriends, nextFriend])
  }

  function handleFriendKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addFriend(friendInput)
      setFriendInput('')
    }

    if (event.key === 'Backspace' && !friendInput && friends.length) {
      setFriends((currentFriends) => currentFriends.slice(0, -1))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!date || !caption.trim()) {
      setError('Date and caption are required.')
      return
    }

    const savedMemory = onSave({
      date,
      caption: caption.trim(),
      story: story.trim(),
      friends,
      images,
    })

    resetForm()
    onClose()

    return savedMemory
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,.75)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-fuchsia-50 via-white to-cyan-50 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-slate-500">Add Memory</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              Save another moment to the timeline
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 overflow-y-auto px-5 py-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-600">Date *</span>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-600">Caption *</span>
                <input
                  type="text"
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  placeholder="First day at college"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:bg-white"
                  required
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-600">Story</span>
              <textarea
                value={story}
                onChange={(event) => setStory(event.target.value)}
                rows={6}
                placeholder="A short paragraph describing the memory"
                className="w-full resize-none rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:bg-white"
              />
            </label>

            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-600">Friends</span>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {friends.map((friend, index) => (
                    <button
                      key={`${friend}-${index}`}
                      type="button"
                      onClick={() => setFriends((currentFriends) => currentFriends.filter((value) => value !== friend))}
                      className="inline-flex items-center"
                    >
                      <FriendTag name={friend} index={index} />
                    </button>
                  ))}
                  <input
                    type="text"
                    value={friendInput}
                    onChange={(event) => setFriendInput(event.target.value)}
                    onKeyDown={handleFriendKeyDown}
                    placeholder="Type a name and press Enter"
                    className="min-w-[220px] flex-1 bg-transparent px-1 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500">Press Enter or comma to add a tag. Tap a tag to remove it.</p>
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <ImageUploader images={images} onChange={setImages} />

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">Preview data</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-800">Date:</span> {date || 'Not chosen yet'}</p>
                <p><span className="font-semibold text-slate-800">Caption:</span> {caption || '—'}</p>
                <p><span className="font-semibold text-slate-800">Friends:</span> {friends.length ? friends.join(', ') : '—'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-200 transition hover:-translate-y-0.5"
          >
            Save memory
          </button>
        </div>
      </form>
    </div>
  )
}
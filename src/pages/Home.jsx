import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { normalizeYouTubeEmbedUrl } from '../utils/storage'

function HeroStat({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/80 bg-white/85 px-4 py-3 shadow-[0_14px_35px_-25px_rgba(15,23,42,.45)] backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-extrabold text-slate-950">{value}</p>
    </div>
  )
}

export default function Home({ anthemUrl, setAnthemUrl }) {
  const navigate = useNavigate()
  const [anthemDraft, setAnthemDraft] = useState(anthemUrl)
  const [anthemError, setAnthemError] = useState('')

  function handleAnthemSubmit(event) {
    event.preventDefault()

    const normalizedUrl = normalizeYouTubeEmbedUrl(anthemDraft)

    if (anthemDraft.trim() && !normalizedUrl) {
      setAnthemError('Paste a valid YouTube watch, short, or embed link.')
      return
    }

    setAnthemError('')
    setAnthemUrl(normalizedUrl)
    setAnthemDraft(normalizedUrl)
  }

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col justify-center rounded-[40px] border border-white/80 bg-white/70 px-5 py-10 shadow-[0_30px_90px_-50px_rgba(15,23,42,.55)] backdrop-blur sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-sm font-bold text-fuchsia-700 shadow-sm">
                B.Tech Memories • CSE Batch 2022-2026
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  B.Tech Memories
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  From Day 1 to the Last Day — every moment, forever.
                </p>
                <p className="max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
                  A warm, chronological memory wall for the CSE batch, where every photo,
                  every laugh, and every awkward group shot stays in order.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/timeline')}
                  className="rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-200 transition hover:-translate-y-0.5"
                >
                  View Memories
                </button>
                <a
                  href="#anthem"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-fuchsia-200 hover:text-slate-950"
                >
                  Class anthem
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <HeroStat label="Batch" value="CSE 2022-2026" />
                <HeroStat label="Style" value="Vertical timeline" />
                <HeroStat label="Storage" value="LocalStorage + Cloudinary" />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-fuchsia-300/30 blur-2xl" />
              <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-cyan-300/30 blur-2xl" />

              <div className="grid gap-4">
                <div className="animate-float-up rounded-[32px] border border-white/80 bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 p-5 text-white shadow-[0_30px_60px_-30px_rgba(244,63,94,.6)]">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Hero memory</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">Day 1, big dreams.</h2>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/90">
                    The first selfie, the first lecture, and the first awkward hello became the
                    opening scene of a four-year story.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_45px_-32px_rgba(15,23,42,.45)]">
                    <div className="h-40 rounded-[22px] bg-gradient-to-br from-cyan-200 via-teal-200 to-emerald-200 animate-shimmer" />
                    <p className="mt-4 text-sm font-semibold text-slate-700">Gradient placeholders only</p>
                  </div>
                  <div className="rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_45px_-32px_rgba(15,23,42,.45)]">
                    <div className="flex h-40 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(251,191,36,.85),rgba(244,114,182,.85),rgba(34,211,238,.85))] p-5 text-center text-xl font-black text-white">
                      Photo memories, in order.
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-700">No fixed categories. Just the timeline.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="anthem" className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[36px] border border-white/80 bg-white/80 px-5 py-8 shadow-[0_24px_75px_-44px_rgba(15,23,42,.5)] backdrop-blur lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-500">Class anthem</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Save the song that defined the batch.</h2>
            <p className="max-w-xl text-base leading-8 text-slate-600">
              Paste any YouTube watch or embed link. The app stores it locally and renders the
              anthem inline on the home page.
            </p>

            <form onSubmit={handleAnthemSubmit} className="space-y-3">
              <input
                type="url"
                value={anthemDraft}
                onChange={(event) => setAnthemDraft(event.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Save anthem
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnthemDraft('')
                    setAnthemError('')
                    setAnthemUrl('')
                  }}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:text-slate-950"
                >
                  Clear anthem
                </button>
              </div>
              {anthemError ? <p className="text-sm font-semibold text-rose-600">{anthemError}</p> : null}
            </form>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-slate-950 shadow-[0_24px_55px_-34px_rgba(15,23,42,.8)]">
            {anthemUrl ? (
              <iframe
                title="Class anthem"
                src={anthemUrl}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,.28),transparent_35%),linear-gradient(135deg,#111827,#1f2937,#0f172a)] px-8 text-center text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.36em] text-cyan-200/80">Preview</p>
                  <p className="mt-3 text-2xl font-black tracking-tight">Add a YouTube link to show the anthem here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
export default function YearMarker({ year }) {
  return (
    <div className="sticky top-20 z-10 flex justify-center py-2 md:py-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-extrabold tracking-[0.3em] text-slate-600 shadow-lg shadow-rose-100/50 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-fuchsia-500 via-amber-400 to-cyan-400" />
        {year}
      </div>
    </div>
  )
}
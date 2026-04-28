import { Fragment } from 'react'
import { parseISO } from 'date-fns'
import MemoryCard from './MemoryCard'
import YearMarker from './YearMarker'

export default function Timeline({ memories, onOpen }) {
  if (!memories.length) {
    return (
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/80 bg-white/85 p-8 text-center shadow-[0_22px_50px_-36px_rgba(15,23,42,.5)] backdrop-blur">
        <p className="text-lg font-semibold text-slate-700">No memories yet.</p>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          Add the first story, first photo, and first friend tag to start the timeline.
        </p>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-fuchsia-300/70 to-transparent md:block" />

      <div className="space-y-5">
        {memories.map((memory, index) => {
          const currentYear = parseISO(memory.date).getFullYear()
          const previousYear = index > 0 ? parseISO(memories[index - 1].date).getFullYear() : null
          const showYearMarker = currentYear !== previousYear
          const isLeftAligned = index % 2 === 0

          return (
            <Fragment key={memory.id}>
              {showYearMarker ? <YearMarker year={String(currentYear)} /> : null}

              <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-0">
                <div
                  className={
                    isLeftAligned
                      ? 'md:col-start-1 md:pr-8'
                      : 'md:col-start-3 md:pl-8'
                  }
                >
                  <MemoryCard memory={memory} onOpen={onOpen} />
                </div>

                <div className="hidden justify-center md:col-start-2 md:flex">
                  <div className="mt-8 h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-500 via-amber-400 to-cyan-400 shadow-[0_0_0_10px_rgba(255,255,255,.75)]" />
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
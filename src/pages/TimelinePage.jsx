import { useState } from 'react'
import AddMemoryModal from '../components/AddMemoryModal'
import MemoryDetail from '../components/MemoryDetail'
import Timeline from '../components/Timeline'

export default function TimelinePage({ memories, onAddMemory }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState(null)

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl rounded-[40px] border border-white/80 bg-white/75 px-5 py-8 shadow-[0_26px_80px_-48px_rgba(15,23,42,.55)] backdrop-blur sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-500">Timeline</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Memories in exact date order.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Scroll through the batch story from the first day of college to the final goodbye.
              Each card can carry multiple photos, tagged friends, and the full story behind the moment.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
            <div className="rounded-[24px] border border-white/80 bg-fuchsia-50 px-4 py-3 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-700">Memories</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{memories.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/80 bg-amber-50 px-4 py-3 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Format</p>
              <p className="mt-2 text-2xl font-black text-slate-950">Timeline</p>
            </div>
            <div className="rounded-[24px] border border-white/80 bg-cyan-50 px-4 py-3 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">Upload</p>
              <p className="mt-2 text-2xl font-black text-slate-950">Local + Cloud</p>
            </div>
          </div>
        </div>
      </section>

      <Timeline memories={memories} onOpen={setSelectedMemory} />

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-6 py-4 text-sm font-extrabold text-white shadow-[0_18px_40px_-18px_rgba(244,63,94,.75)] transition hover:-translate-y-1"
      >
        Add Memory
      </button>

      {isModalOpen ? (
        <AddMemoryModal
          onClose={() => setIsModalOpen(false)}
          onSave={(memoryInput) => onAddMemory(memoryInput)}
        />
      ) : null}

      {selectedMemory ? (
        <MemoryDetail
          key={selectedMemory.id}
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      ) : null}
    </main>
  )
}
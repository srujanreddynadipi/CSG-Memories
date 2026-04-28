const tagStyles = [
  'bg-pink-100 text-pink-700 ring-pink-200',
  'bg-cyan-100 text-cyan-700 ring-cyan-200',
  'bg-amber-100 text-amber-700 ring-amber-200',
  'bg-emerald-100 text-emerald-700 ring-emerald-200',
  'bg-violet-100 text-violet-700 ring-violet-200',
]

export default function FriendTag({ name, index = 0 }) {
  const palette = tagStyles[index % tagStyles.length]

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${palette}`}>
      {name}
    </span>
  )
}
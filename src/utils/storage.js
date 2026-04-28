import { compareAsc, parseISO } from 'date-fns'

export const MEMORIES_STORAGE_KEY = 'btech-memories'
export const ANTHEM_STORAGE_KEY = 'btech-memories-anthem'

function createGradientPlaceholder(title, colors) {
  const [start, end, accent] = colors
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
        <linearGradient id="shine" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.08)" />
          <stop offset="50%" stop-color="rgba(255,255,255,0.35)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.08)" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" rx="48" fill="url(#bg)" />
      <circle cx="640" cy="120" r="150" fill="${accent}" opacity="0.26" />
      <circle cx="150" cy="500" r="130" fill="#ffffff" opacity="0.14" />
      <rect x="72" y="72" width="656" height="456" rx="36" fill="url(#shine)" opacity="0.55" />
      <text x="72" y="170" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${title}</text>
      <text x="72" y="232" font-family="Arial, sans-serif" font-size="28" fill="#ffffff" opacity="0.92">B.Tech Memories</text>
      <text x="72" y="482" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" opacity="0.88">2022 - 2026</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function createSeedMemories() {
  return [
    {
      id: 'seed-2022-first-day',
      date: '2022-08-12',
      caption: 'First Day, First Photos',
      story:
        'We arrived with fresh notebooks, nervous smiles, and a hundred questions. By the end of the day, the entire batch felt like one long group chat in real life.',
      friends: ['Rahul', 'Priya', 'Anil'],
      images: [
        {
          type: 'local',
          url: createGradientPlaceholder('Day 1', ['#7c3aed', '#14b8a6', '#22c55e']),
        },
      ],
    },
    {
      id: 'seed-2023-fest',
      date: '2023-10-18',
      caption: 'Fest Night Energy',
      story:
        'Late rehearsals, stage lights, and loud cheering turned the campus into a tiny festival town. The real trophy was how hard everyone laughed between performances.',
      friends: ['Neha', 'Farhan', 'Sneha', 'Kabir'],
      images: [
        {
          type: 'local',
          url: createGradientPlaceholder('Fest Night', ['#fb7185', '#f59e0b', '#38bdf8']),
        },
        {
          type: 'local',
          url: createGradientPlaceholder('Backstage', ['#0f766e', '#06b6d4', '#8b5cf6']),
        },
      ],
    },
    {
      id: 'seed-2024-lab',
      date: '2024-02-24',
      caption: 'Late Lab, Loud Chaos',
      story:
        'Someone always forgot the USB cable, someone else solved the bug, and everyone pretended the deadline was still far away. It became our favorite kind of panic.',
      friends: ['Aman', 'Isha', 'Ravi'],
      images: [
        {
          type: 'local',
          url: createGradientPlaceholder('Night Lab', ['#0ea5e9', '#8b5cf6', '#f97316']),
        },
      ],
    },
    {
      id: 'seed-2026-farewell',
      date: '2026-04-28',
      caption: 'Farewell, For Real This Time',
      story:
        'The final day felt unreal. We kept saying goodbye like it was a joke, but everyone knew the timeline had reached its last card.',
      friends: ['Entire Batch'],
      images: [
        {
          type: 'local',
          url: createGradientPlaceholder('Farewell', ['#f43f5e', '#f59e0b', '#14b8a6']),
        },
      ],
    },
  ]
}

export function sortMemories(memories) {
  return [...memories].sort((left, right) => {
    const result = compareAsc(parseISO(left.date), parseISO(right.date))

    if (result !== 0) {
      return result
    }

    return left.caption.localeCompare(right.caption)
  })
}

export function loadMemories() {
  if (typeof window === 'undefined') {
    return sortMemories(createSeedMemories())
  }

  const rawValue = window.localStorage.getItem(MEMORIES_STORAGE_KEY)

  if (!rawValue) {
    return sortMemories(createSeedMemories())
  }

  try {
    const parsedValue = JSON.parse(rawValue)

    if (!Array.isArray(parsedValue)) {
      return sortMemories(createSeedMemories())
    }

    return sortMemories(parsedValue)
  } catch {
    return sortMemories(createSeedMemories())
  }
}

export function saveMemories(memories) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(sortMemories(memories)))
}

export function loadAnthemUrl() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(ANTHEM_STORAGE_KEY) ?? ''
}

export function saveAnthemUrl(url) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(ANTHEM_STORAGE_KEY, url)
}

export function normalizeYouTubeEmbedUrl(value) {
  const input = value.trim()

  if (!input) {
    return ''
  }

  if (input.includes('/embed/')) {
    return input
  }

  const match = input.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/)

  if (!match) {
    return ''
  }

  return `https://www.youtube.com/embed/${match[1]}`
}
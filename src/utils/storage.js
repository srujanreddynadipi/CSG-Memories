import { compareAsc, parseISO } from 'date-fns'

const classmateImageFiles = [
  'Mupparapu Saiuday.jpg',
  'bonkanpally shiva kumar.HEIC',
  'Karthik Reddy Banka.jpg',
  'Kusma Nani1920.jpeg',
  'LALITHA ATRE.jpeg',
  'Varshaa.jpeg',
  'praveen.jpg',
  'basa narahari.jpg',
  'Manoj Surukutla.jpeg',
  'D Srishanth.jpeg',
  'Sameeksha Nimmala.jpg',
  'AKHILA REDDY.webp',
  'Sanjana Basuthkar.jpg',
  'Manthapuram vyshnavi.heic',
  'vemula rahul.HEIC',
  'Maheshwari Arroju.jpeg',
  'Laxmi Narasimha Mandava.jpg',
  'Poojitha Venna.jpeg',
  'Swaraj.jpg',
  'Budime Bhagyasri.jpg',
  'Sarika Palle.jpeg',
  'Susmitha Puppala.jpg',
  'Navya sri.jpeg',
  'Harshini Nitturi.jpg',
  'Anjali Reddy.jpeg',
  'pooja reddy.jpeg',
  'preethiii .jpeg',
  'Aindla Srujana.jpg',
  'Shilpa Goud.jpg',
  'Rithvin reddy Chennuri.jpg',
  'Madhu Dongala.jpg',
  'Balu Angothu.jpeg',
  'Suresh.jpg',
  'KARTHIK NAIK.png',
  'jai sai ganipisetty.jpg',
  'Adithya Thallapalli.jpg',
  'Anvesh Honey.jpg',
  'Shashipretham.jpg',
  'Rohith vadthya.jpeg',
  'Sai Vamshi Singeetam.jpg',
  'Sai Harshith.jpg',
  'nikhil kunta.png',
  'Kothuri Srinivas.jpg',
  'Bellamkonda Srinivas.jpg',
  'Srija Cherlakola.jpeg',
  'Lohitha.jpg',
  'Srujan reddy Nadipi.jpeg',
  'Sruji dusa.jpeg',
  'B. Shiva Kumar.jpg',
]

export const MEMORIES_STORAGE_KEY = 'btech-memories'
export const ANTHEM_STORAGE_KEY = 'btech-memories-anthem'
export const CLASSMATES_STORAGE_KEY = 'btech-classmates'

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

export function normalizeGoogleDriveUrl(url) {
  if (!url) return ''
  
  // Extract Google Drive file ID from various formats
  const patterns = [
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/, // open?id=...
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/, // file/d/...
    /drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/, // uc?id=...
    /([a-zA-Z0-9_-]{25,})/, // raw ID
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`
    }
  }

  return url
}

function normalizeClassmateKey(value) {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '')
}

function getClassmateTokens(value) {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

function scoreClassmateImageMatch(nameValue, assetKey) {
  const nameKey = normalizeClassmateKey(nameValue)

  if (!nameKey || !assetKey) {
    return 0
  }

  if (assetKey === nameKey) {
    return 100
  }

  if (assetKey.includes(nameKey)) {
    return 80 + nameKey.length
  }

  if (nameKey.includes(assetKey)) {
    return 60 + assetKey.length
  }

  let score = 0

  for (const token of getClassmateTokens(nameValue)) {
    if (token && assetKey.includes(token)) {
      score += token.length
    }
  }

  return score
}

function toPublicClassmateUrl(fileName) {
  return `/Classmate_Images/${encodeURIComponent(fileName)}`
}

export function getClassmateImageUrl(name, fallbackUrl = '') {
  const assetEntries = classmateImageFiles

  let bestMatch = null
  let bestScore = 0

  for (const assetPath of assetEntries) {
    const assetKey = normalizeClassmateKey(assetPath)
    const score = scoreClassmateImageMatch(name, assetKey)

    if (score > bestScore) {
      bestScore = score
      bestMatch = toPublicClassmateUrl(assetPath)
    }
  }

  if (bestMatch) {
    return bestMatch
  }

  return fallbackUrl
}

export function getClassmateImageSource(name, fallbackUrl = '') {
  const assetEntries = classmateImageFiles

  let bestMatch = null
  let bestPath = ''
  let bestScore = 0

  for (const assetPath of assetEntries) {
    const assetKey = normalizeClassmateKey(assetPath)
    const score = scoreClassmateImageMatch(name, assetKey)

    if (score > bestScore) {
      bestScore = score
      bestMatch = toPublicClassmateUrl(assetPath)
      bestPath = assetPath
    }
  }

  if (bestMatch) {
    return { src: bestMatch, assetPath: bestPath }
  }

  return { src: fallbackUrl, assetPath: fallbackUrl }
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

export function createSeedClassmates() {
  return [
    { id: 'cm1', name: 'Sai Uday', rollNumber: '22R91A7438', imageUrl: '' },
    { id: 'cm2', name: 'B. Shiva Kumar', rollNumber: '22R91A7410', imageUrl: '' },
    { id: 'cm3', name: 'Banka Karthik Reddy', rollNumber: '22R91A7407', imageUrl: '' },
    { id: 'cm4', name: 'Nani', rollNumber: '22R91A7428', imageUrl: '' },
    { id: 'cm5', name: 'LALITHA ATRE', rollNumber: '22R91A7429', imageUrl: '' },
    { id: 'cm6', name: 'Varshaa Valaboju', rollNumber: '22R91A7459', imageUrl: '' },
    { id: 'cm7', name: 'Praveen', rollNumber: '22R91A7408', imageUrl: '' },
    { id: 'cm8', name: 'BASA NARAHARI', rollNumber: '23R95A7401', imageUrl: '' },
    { id: 'cm9', name: 'S.Manoj', rollNumber: '22R91A7455', imageUrl: '' },
    { id: 'cm10', name: 'D.Srishanth', rollNumber: '22R91A7415', imageUrl: '' },
    { id: 'cm11', name: 'Sameeksha', rollNumber: '22R91A7441', imageUrl: '' },
    { id: 'cm12', name: 'Pashapu Akhila Reddy', rollNumber: '22R91A7445', imageUrl: '' },
    { id: 'cm13', name: 'Banka Karthik Reddy', rollNumber: '22R91A7407', imageUrl: '' },
    { id: 'cm14', name: 'Praveen', rollNumber: '22R91A7408', imageUrl: '' },
    { id: 'cm15', name: 'B.Sanjana', rollNumber: '22R91A7405', imageUrl: '' },
    { id: 'cm16', name: 'Vyshnavi', rollNumber: '22R91A7432', imageUrl: '' },
    { id: 'cm17', name: 'Vemula Rahul', rollNumber: '22R91A7460', imageUrl: '' },
    { id: 'cm18', name: 'Maheshwari Arroju', rollNumber: '22R91A7403', imageUrl: '' },
    { id: 'cm19', name: 'Laxmi Narasimha Mandava', rollNumber: '22R91A7431', imageUrl: '' },
    { id: 'cm20', name: 'Venna Poojitha', rollNumber: '22R91A7461', imageUrl: '' },
    { id: 'cm21', name: 'Swaraj', rollNumber: '22R91A7414', imageUrl: '' },
    { id: 'cm22', name: 'Budime Bhagya Sri', rollNumber: '22R91A7411', imageUrl: '' },
    { id: 'cm23', name: 'Sarika', rollNumber: '22R91A7443', imageUrl: '' },
    { id: 'cm24', name: 'Sushmitha puppala', rollNumber: '22R91A7448', imageUrl: '' },
    { id: 'cm25', name: 'Maheshwari Arroju', rollNumber: '22R91A7403', imageUrl: '' },
    { id: 'cm26', name: 'Sirimalla Navyasri', rollNumber: '22R81A7452', imageUrl: '' },
    { id: 'cm27', name: 'Sameeksha', rollNumber: '22R91A7441', imageUrl: '' },
    { id: 'cm28', name: 'Swaraj', rollNumber: '22R91A7414', imageUrl: '' },
    { id: 'cm29', name: 'Sruhith', rollNumber: '22R91A7418', imageUrl: '' },
    { id: 'cm30', name: 'Swaraj', rollNumber: '22R91A7414', imageUrl: '' },
    { id: 'cm31', name: 'Nitturi Harshini', rollNumber: '22R91A7442', imageUrl: '' },
    { id: 'cm32', name: 'Anjali Reddy Kondra', rollNumber: '22R91A7424', imageUrl: '' },
    { id: 'cm33', name: 'Pooja Kalwakollu', rollNumber: '22R91A7421', imageUrl: '' },
    { id: 'cm34', name: 'Preethi Piska', rollNumber: '22R91A7447', imageUrl: '' },
    { id: 'cm35', name: 'Srujana', rollNumber: '22R91A7404', imageUrl: '' },
    { id: 'cm36', name: 'A.Shilpa', rollNumber: '22R91A7463', imageUrl: '' },
    { id: 'cm37', name: 'Gattigorla Deekshitha', rollNumber: '22R91A7420', imageUrl: '' },
    { id: 'cm38', name: 'SPV', rollNumber: '22R91A7450', imageUrl: '' },
    { id: 'cm39', name: 'Tanusri Jadhav', rollNumber: '22R91A7456', imageUrl: '' },
    { id: 'cm40', name: 'SPV', rollNumber: '22R91A7450', imageUrl: '' },
    { id: 'cm41', name: 'NARRA SAI BHANU PRASAD', rollNumber: '23R95A7403', imageUrl: '' },
    { id: 'cm42', name: 'Karthik Naik', rollNumber: '21R91A7403', imageUrl: '' },
    { id: 'cm43', name: 'Jaya Venkata Siva Sai Kumar Ganipisetty', rollNumber: '22R91A7419', imageUrl: '' },
    { id: 'cm44', name: 'ADITHYA GOUD', rollNumber: '23R95A7405', imageUrl: '' },
    { id: 'cm45', name: 'SPV', rollNumber: '22R91A7450', imageUrl: '' },
    { id: 'cm46', name: 'Bellamkonda Srinivas', rollNumber: '22R91A7409', imageUrl: '' },
    { id: 'cm47', name: 'K. Vamshidhar Reddy', rollNumber: '22R91A7422', imageUrl: '' },
    { id: 'cm48', name: 'Srujan reddy', rollNumber: '22R91A7439', imageUrl: '' },
    { id: 'cm49', name: 'Ashmith K', rollNumber: '22R91A7423', imageUrl: '' },
    { id: 'cm50', name: 'Cherlakola Srija', rollNumber: '22R91A7413', imageUrl: '' },
    { id: 'cm51', name: 'Parupally lohitha', rollNumber: '22R91A7444', imageUrl: '' },
    { id: 'cm52', name: 'Ch suresh', rollNumber: '23R95A7402', imageUrl: '' },
    { id: 'cm53', name: 'Nani', rollNumber: '22R91A7428', imageUrl: '' },
    { id: 'cm54', name: 'Srujana', rollNumber: '22R91A7404', imageUrl: '' },
    { id: 'cm55', name: 'Rithvin Reddy Chennuri', rollNumber: '22R91A7412', imageUrl: '' },
    { id: 'cm56', name: 'Dongala madhu', rollNumber: '22R91A7417', imageUrl: '' },
    { id: 'cm57', name: 'A.Balu', rollNumber: '22R91A7401', imageUrl: '' },
    { id: 'cm58', name: 'Pranavi', rollNumber: '22R91A7425', imageUrl: '' },
    { id: 'cm59', name: 'Bharath', rollNumber: '22R91A7454', imageUrl: '' },
    { id: 'cm60', name: 'Varshaa Valaboju', rollNumber: '22R91A7459', imageUrl: '' },
    { id: 'cm61', name: 'NEELAM ANVESH', rollNumber: '22R91A7440', imageUrl: '' },
    { id: 'cm62', name: 'Rohith', rollNumber: '22R91A7458', imageUrl: '' },
    { id: 'cm63', name: 'Sai Vamshi', rollNumber: '22R91A7451', imageUrl: '' },
    { id: 'cm64', name: 'Sai Harshith', rollNumber: '22R91A7437', imageUrl: '' },
    { id: 'cm65', name: 'Nikhil Kunta', rollNumber: '22R91A7427', imageUrl: '' },
    { id: 'cm66', name: 'K Srinivas', rollNumber: '22R91A7426', imageUrl: '' },
  ]
}

export function loadClassmates() {
  if (typeof window === 'undefined') {
    return createSeedClassmates()
  }

  const rawValue = window.localStorage.getItem(CLASSMATES_STORAGE_KEY)

  // Always return seed data if localStorage is empty, null, or contains empty array
  if (!rawValue || rawValue === '[]') {
    const seedData = createSeedClassmates()
    // Save seed data to localStorage so it persists
    saveClassmates(seedData)
    return seedData
  }

  try {
    const parsedValue = JSON.parse(rawValue)

    if (!Array.isArray(parsedValue) || parsedValue.length === 0) {
      const seedData = createSeedClassmates()
      saveClassmates(seedData)
      return seedData
    }

    return parsedValue
  } catch {
    const seedData = createSeedClassmates()
    saveClassmates(seedData)
    return seedData
  }
}

export function saveClassmates(classmates) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CLASSMATES_STORAGE_KEY, JSON.stringify(classmates))
}
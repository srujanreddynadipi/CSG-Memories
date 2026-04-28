import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  loadAnthemUrl,
  loadMemories,
  normalizeYouTubeEmbedUrl,
  saveAnthemUrl,
  saveMemories,
  sortMemories,
} from '../utils/storage'

export function useMemories() {
  const [memories, setMemories] = useState(() => loadMemories())
  const [anthemUrl, setAnthemUrlState] = useState(() => loadAnthemUrl())

  useEffect(() => {
    saveMemories(memories)
  }, [memories])

  useEffect(() => {
    saveAnthemUrl(anthemUrl)
  }, [anthemUrl])

  function addMemory(memoryInput) {
    const memory = {
      id: uuidv4(),
      ...memoryInput,
      images: memoryInput.images ?? [],
      friends: memoryInput.friends ?? [],
    }

    setMemories((currentMemories) => sortMemories([...currentMemories, memory]))

    return memory
  }

  function setAnthemUrl(value) {
    setAnthemUrlState(normalizeYouTubeEmbedUrl(value))
  }

  return {
    memories,
    addMemory,
    anthemUrl,
    setAnthemUrl,
  }
}
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
import { loadClassmates, saveClassmates } from '../utils/storage'

export function useMemories() {
  const [memories, setMemories] = useState(() => loadMemories())
  const [anthemUrl, setAnthemUrlState] = useState(() => loadAnthemUrl())
  const [classmates, setClassmatesState] = useState(() => loadClassmates())

  useEffect(() => {
    saveMemories(memories)
  }, [memories])

  useEffect(() => {
    saveAnthemUrl(anthemUrl)
  }, [anthemUrl])

  useEffect(() => {
    saveClassmates(classmates)
  }, [classmates])

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

  function addClassmate(classmate) {
    const newClassmate = {
      id: classmate.id || uuidv4(),
      ...classmate,
    }
    setClassmatesState((current) => [...current, newClassmate])
  }

  function removeClassmate(id) {
    setClassmatesState((current) => current.filter((c) => c.id !== id))
  }

  return {
    memories,
    addMemory,
    anthemUrl,
    setAnthemUrl,
    classmates,
    addClassmate,
    removeClassmate,
  }
}
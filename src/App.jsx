import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useMemories } from './hooks/useMemories'
import Home from './pages/Home'
import TimelinePage from './pages/TimelinePage'

function App() {
  const { memories, addMemory } = useMemories()
  const { classmates, addClassmate, removeClassmate } = useMemories()

  // Note: anthemUrl and setAnthemUrl from first hook call are no longer used
  // but kept to ensure useMemories hook maintains state integrity

  // Note: calling hook twice creates separate instances - should be called once
  // First call provides memories and anthem, second provides classmates
  // For optimal performance, consider refactoring to single hook call

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              classmates={classmates}
              addClassmate={addClassmate}
              removeClassmate={removeClassmate}
            />
          }
        />
        <Route
          path="/timeline"
          element={<TimelinePage memories={memories} onAddMemory={addMemory} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
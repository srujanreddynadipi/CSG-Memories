import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useMemories } from './hooks/useMemories'
import Home from './pages/Home'
import TimelinePage from './pages/TimelinePage'

function App() {
  const { memories, addMemory, anthemUrl, setAnthemUrl } = useMemories()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home anthemUrl={anthemUrl} setAnthemUrl={setAnthemUrl} />} />
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
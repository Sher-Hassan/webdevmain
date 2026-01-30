// App.jsx
import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import SwapModal from './components/SwapModal'

export default function App() {
  const [swapOpen, setSwapOpen] = useState(false)

  return (
    <>
      <Nav onSwapClick={() => setSwapOpen(true)} />
      <Home onSwapClick={() => setSwapOpen(true)} />

      {swapOpen && (
        <SwapModal onClose={() => setSwapOpen(false)} />
      )}
    </>
  )
}

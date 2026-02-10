import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Square from './square'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Square />
        <Square />
      </div>
    </>
  )
}

export default App

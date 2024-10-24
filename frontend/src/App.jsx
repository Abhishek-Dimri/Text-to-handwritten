import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextForm from './components/Textform'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TextForm/>
    </>
  )
}

export default App

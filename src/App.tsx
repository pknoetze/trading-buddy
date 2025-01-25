import { useState } from 'react'
import { TradeProvider } from './context/TradeContext'
import Navbar from './components/Navbar'
import TradeHistory from './components/TradeHistory'
import Dashboard from './components/Dashboard'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <TradeProvider>
      <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
        <div className="dark:bg-gray-900 dark:text-gray-100">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="container mx-auto p-6">
            <Dashboard />
            <TradeHistory />
          </div>
        </div>
      </div>
    </TradeProvider>
  )
}

export default App

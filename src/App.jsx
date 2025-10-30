import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PortalIntro from './components/PortalIntro'
import HauntedWorld from './components/HauntedWorld'
import MonsterEncounter from './components/MonsterEncounter'
import SidePanel from './components/SidePanel'
import TrickOrTreatButton from './components/TrickOrTreatButton'
import AudioManager from './components/AudioManager'
import './App.css'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [currentMonster, setCurrentMonster] = useState(null)
  const [collectedTreats, setCollectedTreats] = useState([])
  const [showPanel, setShowPanel] = useState(false)
  const [isWitchingHour, setIsWitchingHour] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Load collected treats from localStorage
    const saved = localStorage.getItem('haunted-treats')
    if (saved) {
      setCollectedTreats(JSON.parse(saved))
    }

    // Check time for witching hour
    const checkTime = () => {
      const hour = new Date().getHours()
      setIsWitchingHour(hour >= 23 || hour < 1)
    }
    checkTime()
    const interval = setInterval(checkTime, 60000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleTreatCollected = (treatId) => {
    const newTreats = [...collectedTreats, treatId]
    setCollectedTreats(newTreats)
    localStorage.setItem('haunted-treats', JSON.stringify(newTreats))
  }

  const handleEncounter = () => {
    const monsters = ['witch', 'pumpkin-king', 'hollow-child', 'collector', 'shadow-weaver']
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)]
    setCurrentMonster(randomMonster)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-haunted-black">
      <AudioManager 
        introComplete={introComplete} 
        isWitchingHour={isWitchingHour}
        currentMonster={currentMonster}
      />

      <AnimatePresence mode="wait">
        {!introComplete ? (
          <PortalIntro 
            key="portal"
            onComplete={() => setIntroComplete(true)} 
          />
        ) : (
          <motion.div
            key="world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative w-full h-full"
          >
            <HauntedWorld 
              mousePosition={mousePosition}
              isWitchingHour={isWitchingHour}
              onTreatCollected={handleTreatCollected}
              collectedTreats={collectedTreats}
            />

            <TrickOrTreatButton onClick={handleEncounter} />

            <SidePanel 
              isOpen={showPanel}
              onToggle={() => setShowPanel(!showPanel)}
              collectedTreats={collectedTreats}
              treatCount={collectedTreats.length}
            />

            {/* Day/Night Mode Toggle */}
            <motion.button
              className="fixed top-6 right-6 z-30 px-4 py-2 bg-gradient-to-r from-portal-purple to-portal-orange rounded-full font-creepster text-sm hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWitchingHour(!isWitchingHour)}
            >
              {isWitchingHour ? '🌙 Witching Hour' : '🌆 Twilight'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentMonster && (
          <MonsterEncounter
            monster={currentMonster}
            onClose={() => setCurrentMonster(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

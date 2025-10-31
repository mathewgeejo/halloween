import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PortalIntro from './components/PortalIntro'
import HauntedWorld from './components/HauntedWorld'
import MonsterEncounter from './components/MonsterEncounter'
import SidePanel from './components/SidePanel'
import TrickOrTreatButton from './components/TrickOrTreatButton'
import AudioManager from './components/AudioManager'
import GamePuzzle from './components/GamePuzzle'
import TreasureHunt from './components/TreasureHunt'
import './App.css'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [currentMonster, setCurrentMonster] = useState(null)
  const [collectedTreats, setCollectedTreats] = useState([])
  const [showPanel, setShowPanel] = useState(false)
  const [isWitchingHour, setIsWitchingHour] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentPuzzle, setCurrentPuzzle] = useState(null)
  const [completedPuzzles, setCompletedPuzzles] = useState([])
  const [foundTreasures, setFoundTreasures] = useState([])
  const [showTreasureHunt, setShowTreasureHunt] = useState(false)

  useEffect(() => {
    // Load collected treats from localStorage
    const saved = localStorage.getItem('haunted-treats')
    if (saved) {
      setCollectedTreats(JSON.parse(saved))
    }

    // Load completed puzzles
    const savedPuzzles = localStorage.getItem('completed-puzzles')
    if (savedPuzzles) {
      setCompletedPuzzles(JSON.parse(savedPuzzles))
    }

    // Load found treasures
    const savedTreasures = localStorage.getItem('found-treasures')
    if (savedTreasures) {
      setFoundTreasures(JSON.parse(savedTreasures))
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
    // OPTIMIZED: Throttled mouse tracking to reduce updates
    let rafId = null
    const handleMouseMove = (e) => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1
        })
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleTreatCollected = (treatId) => {
    const newTreats = [...collectedTreats, treatId]
    setCollectedTreats(newTreats)
    localStorage.setItem('haunted-treats', JSON.stringify(newTreats))
  }

  const handleEncounter = () => {
    const monsters = ['witch', 'pumpkin-king', 'hollow-child', 'collector', 'shadow-weaver']
    const availableMonsters = monsters.filter(m => !completedPuzzles.includes(m))
    
    if (availableMonsters.length === 0) {
      // All puzzles completed, show random encounter
      const randomMonster = monsters[Math.floor(Math.random() * monsters.length)]
      setCurrentMonster(randomMonster)
    } else {
      // Show puzzle for unsolved monster
      const randomMonster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)]
      setCurrentPuzzle(randomMonster)
    }
  }

  const handlePuzzleComplete = (monster, reward) => {
    const newCompleted = [...completedPuzzles, monster]
    setCompletedPuzzles(newCompleted)
    localStorage.setItem('completed-puzzles', JSON.stringify(newCompleted))
    
    // Add reward to treats
    const rewardId = `puzzle-${monster}`
    const newTreats = [...collectedTreats, rewardId]
    setCollectedTreats(newTreats)
    localStorage.setItem('haunted-treats', JSON.stringify(newTreats))
    
    setCurrentPuzzle(null)
    setCurrentMonster(monster)
  }

  const handleTreasureFound = (treasureId) => {
    if (!foundTreasures.includes(treasureId)) {
      const newTreasures = [...foundTreasures, treasureId]
      setFoundTreasures(newTreasures)
      localStorage.setItem('found-treasures', JSON.stringify(newTreasures))
    }
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
              onTreasureFound={handleTreasureFound}
              foundTreasures={foundTreasures}
            />

            <TrickOrTreatButton 
              onClick={handleEncounter}
              completedPuzzles={completedPuzzles.length}
              totalPuzzles={5}
            />

            <SidePanel 
              isOpen={showPanel}
              onToggle={() => setShowPanel(!showPanel)}
              collectedTreats={collectedTreats}
              treatCount={collectedTreats.length}
            />

            <TreasureHunt
              isOpen={showTreasureHunt}
              onToggle={() => setShowTreasureHunt(!showTreasureHunt)}
              foundTreasures={foundTreasures}
              onTreasureFound={handleTreasureFound}
              completedPuzzles={completedPuzzles}
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
        {currentPuzzle && (
          <GamePuzzle
            monster={currentPuzzle}
            onClose={() => setCurrentPuzzle(null)}
            onComplete={handlePuzzleComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentMonster && !currentPuzzle && (
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

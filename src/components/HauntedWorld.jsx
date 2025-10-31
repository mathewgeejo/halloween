import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Main Haunted World Component
const HauntedWorld = ({ mousePosition, isWitchingHour, onTreatCollected, collectedTreats, onTreasureFound, foundTreasures }) => {
  const [lightning, setLightning] = useState(false)
  
  // Treasure hunt positions with emojis
  const treasurePositions = [
    { id: 'hunt-1', pos: [15, 50], icon: '🐈‍⬛' },
    { id: 'hunt-2', pos: [50, 15], icon: '🏮' },
    { id: 'hunt-3', pos: [85, 30], icon: '🎵' },
    { id: 'hunt-4', pos: [30, 70], icon: '💀' },
    { id: 'hunt-5', pos: [75, 55], icon: '💎' },
    { id: 'hunt-6', pos: [20, 40], icon: '🪶' },
    { id: 'hunt-7', pos: [80, 80], icon: '👁️' },
  ]

  useEffect(() => {
    // Random lightning flashes
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setLightning(true)
        setTimeout(() => setLightning(false), 150)
      }
    }, 5000 + Math.random() * 5000)

    return () => clearInterval(lightningInterval)
  }, [])

  const handleTreasureClick = (treasureId) => {
    if (!foundTreasures.includes(treasureId)) {
      onTreasureFound(treasureId)
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Simple Static Background */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          isWitchingHour
            ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-black'
            : 'bg-gradient-to-b from-purple-900 via-indigo-900 to-black'
        }`}
      >
        {/* Static mountains silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-80">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill={isWitchingHour ? "#1a1a2e" : "#2d1b4e"}
              fillOpacity="1"
              d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,192C672,192,768,128,864,117.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Ground fog - static */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-500 to-transparent opacity-20" />
      </div>

      {/* Moon - static */}
      <div
        className="absolute top-20 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-100 to-orange-200 shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${isWitchingHour ? 'rgba(200, 200, 255, 0.8)' : 'rgba(255, 220, 150, 0.6)'}`,
        }}
      />

      {/* Treasure hunt items - ONLY clickable items, no floating animations */}
      <div className="absolute inset-0">
        {treasurePositions.map((treasure) => {
          const isFound = foundTreasures && foundTreasures.includes(treasure.id)
          if (isFound) return null
          
          return (
            <button
              key={treasure.id}
              className="absolute text-5xl cursor-pointer hover:scale-125 transition-transform duration-200"
              style={{
                left: `${treasure.pos[0]}%`,
                top: `${treasure.pos[1]}%`,
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
              }}
              onClick={() => handleTreasureClick(treasure.id)}
            >
              {treasure.icon}
            </button>
          )
        })}
      </div>

      {/* Lightning flash overlay */}
      {lightning && (
        <div
          className="absolute inset-0 bg-white pointer-events-none"
          style={{ opacity: 0.4 }}
        />
      )}

      {/* Title with castle silhouette */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-10">
        {/* Castle silhouette behind title - STATIC */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-24 opacity-30">
          <svg width="400" height="200" viewBox="0 0 400 200" className="text-black">
            <path
              fill="currentColor"
              d="M50,180 L50,100 L70,100 L70,80 L90,80 L90,60 L110,60 L110,100 L140,100 L140,60 L160,60 L160,40 L180,40 L180,60 L200,60 L200,100 L230,100 L230,60 L250,60 L250,80 L270,80 L270,100 L290,100 L290,180 Z"
            />
            <rect x="100" y="120" width="20" height="30" fill="#ff6b35" opacity="0.6" />
            <rect x="160" y="80" width="20" height="40" fill="#ff6b35" opacity="0.6" />
            <rect x="220" y="120" width="20" height="30" fill="#ff6b35" opacity="0.6" />
          </svg>
        </div>

        <h1
          className="text-7xl md:text-9xl font-creepster text-pumpkin mb-4 relative z-10"
          style={{
            textShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6), 0 5px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          THE HAUNTED REALM
        </h1>
        <p className="text-2xl md:text-3xl font-fredericka text-ghost">
          Solve puzzles, find treasures, escape the curse...
        </p>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none vignette" />
    </div>
  )
}

export default HauntedWorld

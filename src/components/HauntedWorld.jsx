import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Simple CSS-based floating pumpkin
const FloatingPumpkin = ({ position, onClick, isCollected, index }) => {
  if (isCollected) return null

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        fontSize: '3rem',
      }}
      onClick={onClick}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0, -10, 0],
      }}
      transition={{
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.3 }}
    >
      🎃
    </motion.div>
  )
}

// Simple CSS-based treasure crystal
const TreasureItem = ({ position, icon, onClick, isCollected, index }) => {
  if (isCollected) return null

  return (
    <motion.div
      className="absolute cursor-pointer text-4xl"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
        filter: 'drop-shadow(0 0 10px currentColor)',
      }}
      onClick={onClick}
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2.5 + index * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.4, rotate: 360 }}
    >
      {icon}
    </motion.div>
  )
}

// Floating bat emoji
const BatEmoji = ({ index }) => {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`,
      }}
      animate={{
        x: [0, (Math.random() - 0.5) * 200],
        y: [0, (Math.random() - 0.5) * 100],
        rotate: [0, 360],
      }}
      transition={{
        duration: 10 + index * 2,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      🦇
    </motion.div>
  )
}

// Floating ghost emoji
const GhostEmoji = ({ index }) => {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none opacity-60"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
        y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 8 + index * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      👻
    </motion.div>
  )
}

// Main Haunted World Component
const HauntedWorld = ({ mousePosition, isWitchingHour, onTreatCollected, collectedTreats, onTreasureFound, foundTreasures }) => {
  const [lightning, setLightning] = useState(false)
  
  // Convert to percentage-based positions for 2D layout
  const pumpkinPositions = [
    [20, 30],
    [75, 25],
    [30, 60],
    [80, 70],
    [50, 20],
    [15, 75],
    [85, 45],
  ]

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
      if (Math.random() > 0.7) {
        setLightning(true)
        setTimeout(() => setLightning(false), 200)
      }
    }, 3000 + Math.random() * 5000)

    return () => clearInterval(lightningInterval)
  }, [])

  const handlePumpkinClick = (index) => {
    const treatId = `pumpkin-${index}`
    if (!collectedTreats.includes(treatId)) {
      onTreatCollected(treatId)
    }
  }

  const handleTreasureClick = (treasureId) => {
    if (!foundTreasures.includes(treasureId)) {
      onTreasureFound(treasureId)
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Enhanced Background with stars and depth */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isWitchingHour
            ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-black'
            : 'bg-gradient-to-b from-purple-900 via-indigo-900 to-black'
        }`}
      >
        {/* OPTIMIZED: Stars background - Reduced from 100 to 30 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Distant mountains silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-80">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill={isWitchingHour ? "#1a1a2e" : "#2d1b4e"}
              fillOpacity="1"
              d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,192C672,192,768,128,864,117.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* OPTIMIZED: Distant trees - Reduced from 15 to 8 */}
        <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-around opacity-60">
          {[...Array(8)].map((_, i) => (
            <div
              key={`tree-${i}`}
              className="bg-black opacity-80"
              style={{
                width: Math.random() * 40 + 20 + 'px',
                height: Math.random() * 100 + 80 + 'px',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          ))}
        </div>

        {/* Ground fog - simplified */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-500 to-transparent opacity-20" />
      </div>

      {/* OPTIMIZED: Removed excessive fog layers - keeping just one simple one */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(200, 200, 200, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Moon */}
      <motion.div
        className="absolute top-20 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-100 to-orange-200 shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${isWitchingHour ? 'rgba(200, 200, 255, 0.8)' : 'rgba(255, 220, 150, 0.6)'}`,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* 2D Scene - Floating Emojis (replacing 3D canvas) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Bats */}
        {[...Array(5)].map((_, i) => (
          <BatEmoji key={`bat-${i}`} index={i} />
        ))}

        {/* Floating Ghosts */}
        {[...Array(6)].map((_, i) => (
          <GhostEmoji key={`ghost-${i}`} index={i} />
        ))}

        {/* Floating collectible pumpkins */}
        {pumpkinPositions.map((pos, i) => (
          <FloatingPumpkin
            key={`pumpkin-${i}`}
            position={pos}
            onClick={() => handlePumpkinClick(i)}
            isCollected={collectedTreats.includes(`pumpkin-${i}`)}
            index={i}
          />
        ))}

        {/* Treasure hunt items */}
        {treasurePositions.map((treasure, i) => (
          <TreasureItem
            key={treasure.id}
            position={treasure.pos}
            icon={treasure.icon}
            onClick={() => handleTreasureClick(treasure.id)}
            isCollected={foundTreasures && foundTreasures.includes(treasure.id)}
            index={i}
          />
        ))}
      </div>

      {/* Lightning flash overlay */}
      {lightning && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Foreground decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* OPTIMIZED: Floating embers - Reduced from 30 to 15 */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute w-1 h-1 bg-pumpkin rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10px',
              boxShadow: '0 0 10px rgba(255, 107, 53, 0.8)',
            }}
            animate={{
              y: [-10, -window.innerHeight - 50],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Title with spooky castle silhouette */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Castle silhouette behind title */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-24 opacity-30"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg width="400" height="200" viewBox="0 0 400 200" className="text-black">
            <path
              fill="currentColor"
              d="M50,180 L50,100 L70,100 L70,80 L90,80 L90,60 L110,60 L110,100 L140,100 L140,60 L160,60 L160,40 L180,40 L180,60 L200,60 L200,100 L230,100 L230,60 L250,60 L250,80 L270,80 L270,100 L290,100 L290,180 Z"
            />
            <rect x="100" y="120" width="20" height="30" fill="#ff6b35" opacity="0.6" />
            <rect x="160" y="80" width="20" height="40" fill="#ff6b35" opacity="0.6" />
            <rect x="220" y="120" width="20" height="30" fill="#ff6b35" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.h1
          className="text-7xl md:text-9xl font-creepster text-pumpkin animate-glow mb-4 relative z-10"
          style={{
            textShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6), 0 5px 10px rgba(0, 0, 0, 0.8)',
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          THE HAUNTED REALM
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl font-fredericka text-ghost"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Solve puzzles, find treasures, escape the curse...
        </motion.p>
      </motion.div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none vignette" />
    </div>
  )
}

export default HauntedWorld

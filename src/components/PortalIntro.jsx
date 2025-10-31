import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Main Portal Intro Component
const PortalIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('darkness') // darkness -> static -> portal -> warp
  const [startWarp, setStartWarp] = useState(false)

  useEffect(() => {
    // Darkness phase (1.5 seconds)
    const timer1 = setTimeout(() => setPhase('static'), 1500)
    
    // Static flicker phase (2 seconds)
    const timer2 = setTimeout(() => setPhase('portal'), 3500)
    
    // Portal phase (4 seconds)
    const timer3 = setTimeout(() => {
      setStartWarp(true)
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 7500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Darkness Phase */}
      {phase === 'darkness' && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Static Flicker Phase */}
      {phase === 'static' && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0 noise"
            animate={{
              opacity: [0, 1, 0, 1, 0.5, 1, 0],
            }}
            transition={{ duration: 1.5, times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1] }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0, 0.5, 0, 0.7, 0],
            }}
            transition={{ duration: 1.5 }}
          >
            <div className="text-4xl font-nosifer text-ghost">
              SIGNAL LOST
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Portal Phase */}
      {phase === 'portal' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(10,10,10,0.8) 0%, rgba(10,10,10,1) 70%)',
          }}
        >
          {/* Fog layers */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, rgba(157, 78, 221, 0.3) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* 2D Portal Effect - CSS based */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, #ff6d00 0%, #9d4edd 50%, transparent 100%)',
                boxShadow: '0 0 100px rgba(157, 78, 221, 0.8), 0 0 200px rgba(255, 109, 0, 0.6)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              }}
            >
              {/* Inner portal rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-4"
                  style={{
                    borderColor: i % 2 === 0 ? '#ff6d00' : '#9d4edd',
                    margin: `${i * 20}px`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    rotate: { duration: 5 - i, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Portal text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ paddingTop: '350px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <motion.h1
              className="text-6xl font-creepster text-pumpkin mb-4"
              style={{
                textShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6)',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              THE PORTAL BECKONS
            </motion.h1>
            <motion.p
              className="text-xl font-fredericka text-ghost"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Come closer... if you dare...
            </motion.p>
          </motion.div>

          {/* Lightning flashes */}
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            animate={{
              opacity: [0, 0, 0, 0.3, 0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-pumpkin rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, -200],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Warp Effect */}
      {startWarp && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-portal-orange via-portal-purple to-black"
          initial={{ scale: 0, borderRadius: '50%' }}
          animate={{ scale: 10, borderRadius: '0%' }}
          transition={{ duration: 2, ease: 'easeIn' }}
        />
      )}
    </motion.div>
  )
}

export default PortalIntro

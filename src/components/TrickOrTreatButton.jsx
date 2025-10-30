import { motion } from 'framer-motion'
import { useState } from 'react'

const TrickOrTreatButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    setClicks(clicks + 1)
    onClick()
  }

  return (
    <motion.div
      className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: 'spring' }}
    >
      <motion.button
        className="relative px-12 py-6 bg-gradient-to-r from-pumpkin via-portal-orange to-blood rounded-full font-nosifer text-2xl text-white shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 0 40px rgba(255, 107, 53, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={{
          boxShadow: isHovered
            ? ['0 0 40px rgba(255, 107, 53, 0.8)', '0 0 80px rgba(255, 107, 53, 1)', '0 0 40px rgba(255, 107, 53, 0.8)']
            : '0 0 40px rgba(255, 107, 53, 0.8)',
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        {/* Button text */}
        <span className="relative z-10 drop-shadow-lg">
          🎃 Trick or Treat? 🎃
        </span>

        {/* Particle burst on hover */}
        {isHovered && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-toxic rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 60,
                  y: Math.sin((i / 12) * Math.PI * 2) * 60,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </>
        )}

        {/* Corner flames */}
        <motion.div
          className="absolute -top-2 -left-2 text-2xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🔥
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-2 text-2xl"
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        >
          🔥
        </motion.div>
      </motion.button>

      {/* Click counter */}
      {clicks > 0 && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 px-4 py-2 rounded-full border-2 border-pumpkin"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0 }}
        >
          <span className="font-creepster text-pumpkin text-sm">
            Encounters: {clicks}
          </span>
        </motion.div>
      )}

      {/* Floating instruction */}
      <motion.div
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        animate={{
          y: [0, -5, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="font-fredericka text-ghost text-sm">
          Click to summon a creature...
        </p>
      </motion.div>
    </motion.div>
  )
}

export default TrickOrTreatButton

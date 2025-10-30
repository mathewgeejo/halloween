import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const monsterData = {
  'witch': {
    name: 'The Whispering Witch',
    dialogue: 'Come closer... I have secrets to share...',
    lore: 'She guards the gate between worlds, feeding on curiosity itself. Her whispers carry forgotten spells that bind the living to the dead.',
    color: '#9d4edd',
    icon: '🧙‍♀️',
    particleColor: '#9d4edd',
  },
  'pumpkin-king': {
    name: 'The Pumpkin King',
    dialogue: 'Every seed is a soul I\'ve sown...',
    lore: 'Born from cursed soil on All Hallows\' Eve, his grin never fades — even in ash. He reaps what he plants: fear, darkness, and eternal autumn.',
    color: '#ff6b35',
    icon: '🎃',
    particleColor: '#ff6b35',
  },
  'hollow-child': {
    name: 'The Hollow Child',
    dialogue: 'Play with me... forever and ever...',
    lore: 'A spirit trapped between lullabies and screams. She seeks companions in the darkness, but her games never end... and neither does the laughter.',
    color: '#e0e0e0',
    icon: '👧',
    particleColor: '#e0e0e0',
  },
  'collector': {
    name: 'The Collector',
    dialogue: 'You\'ve brought me something... shiny.',
    lore: 'He remembers every visitor who dared to touch the relics. Coins, bones, memories — all are currency in his realm. Cross him, and you become part of the collection.',
    color: '#ffd700',
    icon: '💀',
    particleColor: '#ffd700',
  },
  'shadow-weaver': {
    name: 'The Shadow Weaver',
    dialogue: 'Your shadow... it belongs to me now.',
    lore: 'Born from the absence of light, she weaves nightmares from stolen shadows. Once marked, you\'ll see her in every dark corner, waiting.',
    color: '#1a1a1a',
    icon: '🕷️',
    particleColor: '#666666',
  },
}

const MonsterEncounter = ({ monster, onClose }) => {
  const data = monsterData[monster] || monsterData['witch']
  const [typedDialogue, setTypedDialogue] = useState('')
  const [showLore, setShowLore] = useState(false)

  useEffect(() => {
    // Typing effect for dialogue
    let index = 0
    const dialogue = data.dialogue
    const typingInterval = setInterval(() => {
      if (index <= dialogue.length) {
        setTypedDialogue(dialogue.substring(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => setShowLore(true), 500)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [data.dialogue])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        onClick={onClose}
      />

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: data.particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
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

      {/* Monster Card */}
      <motion.div
        className="relative max-w-2xl w-full mx-4 p-8 bg-gradient-to-br from-haunted-black via-gray-900 to-haunted-black rounded-2xl border-4 shadow-2xl overflow-hidden"
        style={{
          borderColor: data.color,
          boxShadow: `0 0 60px ${data.color}80, inset 0 0 60px ${data.color}20`,
        }}
        initial={{ scale: 0, rotateY: -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0, rotateY: 180 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 noise" />

        {/* Monster Icon */}
        <motion.div
          className="text-9xl text-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          {data.icon}
        </motion.div>

        {/* Monster Name */}
        <motion.h2
          className="text-5xl font-nosifer text-center mb-6"
          style={{ color: data.color, textShadow: `0 0 20px ${data.color}` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {data.name}
        </motion.h2>

        {/* Dialogue Box */}
        <motion.div
          className="bg-black bg-opacity-60 rounded-lg p-6 mb-6 border-2 border-opacity-50"
          style={{ borderColor: data.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.p
            className="text-2xl font-fredericka text-center text-ghost italic"
            style={{ textShadow: `0 0 10px ${data.color}` }}
          >
            "{typedDialogue}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
            "
          </motion.p>
        </motion.div>

        {/* Lore Section */}
        {showLore && (
          <motion.div
            className="bg-gradient-to-r from-transparent via-gray-800 to-transparent p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-xl font-creepster mb-3 text-center"
              style={{ color: data.color }}
            >
              ~ Forbidden Lore ~
            </h3>
            <p className="text-lg font-fredericka text-ghost leading-relaxed text-center">
              {data.lore}
            </p>
          </motion.div>
        )}

        {/* Close Button */}
        <motion.button
          className="mt-8 w-full py-3 bg-gradient-to-r rounded-lg font-creepster text-xl hover:scale-105 transition-transform"
          style={{
            backgroundImage: `linear-gradient(to right, ${data.color}40, ${data.color}80)`,
            color: data.color,
            textShadow: `0 0 10px ${data.color}`,
            boxShadow: `0 0 20px ${data.color}40`,
          }}
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Dismiss the Spirit
        </motion.button>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: data.color }} />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: data.color }} />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: data.color }} />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: data.color }} />

        {/* Floating wisps */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: data.color,
              left: `${10 + i * 15}%`,
              top: '10%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MonsterEncounter

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Puzzle data for each monster
const puzzleData = {
  'witch': {
    name: 'The Whispering Witch',
    icon: '🧙‍♀️',
    color: '#9d4edd',
    puzzleType: 'riddle',
    riddle: {
      question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      answers: ['map', 'a map', 'the map'],
      hint: "Travelers use me, but I never move..."
    },
    reward: 'Ancient Spell Book',
    lore: 'The witch\'s grimoire contains spells to bend reality itself.'
  },
  'pumpkin-king': {
    name: 'The Pumpkin King',
    icon: '🎃',
    color: '#ff6b35',
    puzzleType: 'pattern',
    pattern: {
      sequence: ['🎃', '🌙', '🎃', '🌙', '🎃', '?'],
      correctAnswer: '🌙',
      options: ['🎃', '🌙', '💀', '🦇'],
      hint: "The king's harvest follows the lunar cycle..."
    },
    reward: 'Golden Pumpkin Seed',
    lore: 'Plant this seed to grow pumpkins that glow with eternal fire.'
  },
  'hollow-child': {
    name: 'The Hollow Child',
    icon: '👧',
    color: '#e0e0e0',
    puzzleType: 'memory',
    memory: {
      cards: ['🎀', '🧸', '🎈', '🎁', '🪆', '🎵'],
      gridSize: 4, // 4x3 grid
      hint: "Remember where her toys are hidden..."
    },
    reward: 'Music Box',
    lore: 'A haunting melody that soothes restless spirits.'
  },
  'collector': {
    name: 'The Collector',
    icon: '💀',
    color: '#ffd700',
    puzzleType: 'math',
    math: {
      question: "The Collector has gathered souls for 500 years. Every full moon, he collects 3 more. How many souls has he collected? (Assume 12 full moons per year)",
      correctAnswer: 18000,
      tolerance: 100,
      hint: "500 years × 12 moons × 3 souls..."
    },
    reward: 'Soul Compass',
    lore: 'Points toward the nearest trapped spirit.'
  },
  'shadow-weaver': {
    name: 'The Shadow Weaver',
    icon: '🕷️',
    color: '#666666',
    puzzleType: 'slider',
    slider: {
      fragments: 9, // 3x3 puzzle
      image: 'shadow-web',
      hint: "Piece together the web of shadows..."
    },
    reward: 'Shadow Cloak',
    lore: 'Wear this to become one with the darkness.'
  }
}

// Riddle Puzzle Component
const RiddlePuzzle = ({ puzzle, onSolve, onFail }) => {
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(3)

  const handleSubmit = () => {
    const normalized = answer.toLowerCase().trim()
    if (puzzle.answers.includes(normalized)) {
      onSolve()
    } else {
      setAttempts(attempts - 1)
      if (attempts <= 1) {
        onFail()
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-fredericka text-ghost leading-relaxed">
        {puzzle.question}
      </p>
      
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        className="w-full px-4 py-3 bg-black bg-opacity-60 border-2 border-pumpkin rounded-lg text-ghost font-fredericka text-lg focus:outline-none focus:border-toxic"
        placeholder="Type your answer..."
      />

      <div className="flex gap-2">
        <motion.button
          className="flex-1 px-4 py-2 bg-gradient-to-r from-pumpkin to-blood rounded-lg font-creepster text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          Submit Answer
        </motion.button>
        
        {!showHint && (
          <motion.button
            className="px-4 py-2 bg-gray-700 rounded-lg font-creepster text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHint(true)}
          >
            💡 Hint
          </motion.button>
        )}
      </div>

      {showHint && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-fredericka text-toxic italic"
        >
          💡 {puzzle.hint}
        </motion.p>
      )}

      <p className="text-sm font-fredericka text-blood">
        Attempts remaining: {attempts}
      </p>
    </div>
  )
}

// Pattern Puzzle Component
const PatternPuzzle = ({ puzzle, onSolve, onFail }) => {
  const [selected, setSelected] = useState(null)
  const [attempts, setAttempts] = useState(3)

  const handleSelect = (option) => {
    setSelected(option)
    if (option === puzzle.correctAnswer) {
      setTimeout(() => onSolve(), 500)
    } else {
      setAttempts(attempts - 1)
      if (attempts <= 1) {
        setTimeout(() => onFail(), 500)
      }
      setTimeout(() => setSelected(null), 1000)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-fredericka text-ghost">
        Complete the pattern:
      </p>

      <div className="flex items-center justify-center gap-2 text-4xl">
        {puzzle.sequence.map((item, i) => (
          <div
            key={i}
            className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 ${
              item === '?' ? 'border-toxic animate-pulse' : 'border-pumpkin'
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-6">
        {puzzle.options.map((option, i) => (
          <motion.button
            key={i}
            className={`h-20 text-4xl rounded-lg border-2 transition-all ${
              selected === option
                ? option === puzzle.correctAnswer
                  ? 'border-toxic bg-toxic bg-opacity-20'
                  : 'border-blood bg-blood bg-opacity-20'
                : 'border-gray-600 hover:border-pumpkin'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(option)}
            disabled={selected !== null}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <p className="text-sm font-fredericka text-blood text-center">
        Attempts remaining: {attempts}
      </p>
    </div>
  )
}

// Memory Game Component
const MemoryPuzzle = ({ puzzle, onSolve, onFail }) => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const maxMoves = 20

  useEffect(() => {
    // Create pairs and shuffle
    const pairs = [...puzzle.cards, ...puzzle.cards]
    const shuffled = pairs.sort(() => Math.random() - 0.5).map((card, i) => ({
      id: i,
      value: card,
    }))
    setCards(shuffled)
  }, [])

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      
      if (cards[newFlipped[0]].value === cards[newFlipped[1]].value) {
        setMatched([...matched, ...newFlipped])
        setFlipped([])
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => onSolve(), 500)
        }
      } else {
        if (moves >= maxMoves - 1) {
          setTimeout(() => onFail(), 1000)
        }
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-fredericka text-ghost text-center">
        Match all the pairs of toys
      </p>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            className={`h-20 text-3xl rounded-lg border-2 transition-all ${
              matched.includes(i)
                ? 'border-toxic bg-toxic bg-opacity-20'
                : flipped.includes(i)
                ? 'border-pumpkin bg-pumpkin bg-opacity-20'
                : 'border-gray-600 bg-gray-800'
            }`}
            whileHover={{ scale: matched.includes(i) ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(i)}
          >
            {flipped.includes(i) || matched.includes(i) ? card.value : '?'}
          </motion.button>
        ))}
      </div>

      <p className="text-sm font-fredericka text-blood text-center">
        Moves: {moves} / {maxMoves}
      </p>
    </div>
  )
}

// Math Puzzle Component
const MathPuzzle = ({ puzzle, onSolve, onFail }) => {
  const [answer, setAnswer] = useState('')
  const [attempts, setAttempts] = useState(3)

  const handleSubmit = () => {
    const numAnswer = parseInt(answer)
    if (Math.abs(numAnswer - puzzle.correctAnswer) <= puzzle.tolerance) {
      onSolve()
    } else {
      setAttempts(attempts - 1)
      if (attempts <= 1) {
        onFail()
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-fredericka text-ghost leading-relaxed">
        {puzzle.question}
      </p>

      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        className="w-full px-4 py-3 bg-black bg-opacity-60 border-2 border-pumpkin rounded-lg text-ghost font-fredericka text-lg focus:outline-none focus:border-toxic text-center"
        placeholder="Enter number..."
      />

      <motion.button
        className="w-full px-4 py-3 bg-gradient-to-r from-pumpkin to-blood rounded-lg font-creepster text-white text-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
      >
        Submit Answer
      </motion.button>

      <p className="text-sm font-fredericka text-blood text-center">
        Attempts remaining: {attempts}
      </p>
    </div>
  )
}

// Main Game Puzzle Component
const GamePuzzle = ({ monster, onClose, onComplete }) => {
  const [stage, setStage] = useState('intro') // intro, puzzle, success, failure
  const data = puzzleData[monster] || puzzleData['witch']

  const handleSolve = () => {
    setStage('success')
    setTimeout(() => {
      onComplete(monster, data.reward)
    }, 3000)
  }

  const handleFail = () => {
    setStage('failure')
  }

  const renderPuzzle = () => {
    switch (data.puzzleType) {
      case 'riddle':
        return <RiddlePuzzle puzzle={data.riddle} onSolve={handleSolve} onFail={handleFail} />
      case 'pattern':
        return <PatternPuzzle puzzle={data.pattern} onSolve={handleSolve} onFail={handleFail} />
      case 'memory':
        return <MemoryPuzzle puzzle={data.memory} onSolve={handleSolve} onFail={handleFail} />
      case 'math':
        return <MathPuzzle puzzle={data.math} onSolve={handleSolve} onFail={handleFail} />
      default:
        return <RiddlePuzzle puzzle={data.riddle} onSolve={handleSolve} onFail={handleFail} />
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-95" onClick={stage === 'intro' ? onClose : null} />

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: data.color,
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

      <motion.div
        className="relative max-w-3xl w-full bg-gradient-to-br from-haunted-black via-gray-900 to-haunted-black rounded-2xl border-4 p-8 overflow-hidden"
        style={{
          borderColor: data.color,
          boxShadow: `0 0 60px ${data.color}80`,
        }}
        initial={{ scale: 0, rotateY: -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0, rotateY: 180 }}
        transition={{ type: 'spring' }}
      >
        <div className="absolute inset-0 opacity-10 noise" />

        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <div className="text-8xl text-center mb-6">{data.icon}</div>
            <h2
              className="text-5xl font-nosifer text-center mb-6"
              style={{ color: data.color, textShadow: `0 0 20px ${data.color}` }}
            >
              {data.name}
            </h2>
            <p className="text-xl font-fredericka text-ghost text-center mb-8">
              "Solve my puzzle, and earn your reward... fail, and remain trapped forever!"
            </p>
            <motion.button
              className="w-full py-4 bg-gradient-to-r from-pumpkin to-blood rounded-lg font-creepster text-2xl text-white"
              style={{ boxShadow: `0 0 20px ${data.color}` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage('puzzle')}
            >
              Accept the Challenge
            </motion.button>
            <motion.button
              className="w-full mt-3 py-2 bg-gray-800 rounded-lg font-fredericka text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Flee in Terror
            </motion.button>
          </motion.div>
        )}

        {stage === 'puzzle' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <div className="text-6xl text-center mb-4">{data.icon}</div>
            <h3
              className="text-3xl font-creepster text-center mb-6"
              style={{ color: data.color }}
            >
              {data.name}'s Challenge
            </h3>
            {renderPuzzle()}
          </motion.div>
        )}

        {stage === 'success' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="text-9xl mb-6"
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 1 }}
            >
              🏆
            </motion.div>
            <h2 className="text-5xl font-nosifer text-toxic mb-4">
              PUZZLE SOLVED!
            </h2>
            <p className="text-2xl font-fredericka text-ghost mb-4">
              You have earned:
            </p>
            <p
              className="text-3xl font-creepster mb-6"
              style={{ color: data.color, textShadow: `0 0 20px ${data.color}` }}
            >
              {data.reward}
            </p>
            <p className="text-lg font-fredericka text-ghost italic">
              {data.lore}
            </p>
          </motion.div>
        )}

        {stage === 'failure' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="text-9xl mb-6"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              💀
            </motion.div>
            <h2 className="text-5xl font-nosifer text-blood mb-4">
              PUZZLE FAILED!
            </h2>
            <p className="text-xl font-fredericka text-ghost mb-6">
              The {data.name} claims your soul...
            </p>
            <motion.button
              className="px-8 py-3 bg-gray-800 rounded-lg font-creepster text-xl text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Try Again Later
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default GamePuzzle

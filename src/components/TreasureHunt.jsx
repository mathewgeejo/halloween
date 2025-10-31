import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const treasureHuntData = [
  {
    id: 'hunt-1',
    name: 'The Witch\'s Lost Familiar',
    description: 'Find the black cat hidden in the shadows',
    clue: 'Where the moon casts the longest shadow, a feline spirit waits...',
    location: { x: -12, y: 3, z: 2 },
    icon: '🐈‍⬛',
    reward: 'Witch\'s Familiar Token',
    difficulty: 'Easy'
  },
  {
    id: 'hunt-2',
    name: 'Cursed Lantern',
    description: 'Discover the lantern that never goes out',
    clue: 'Among the highest trees, a light flickers eternal...',
    location: { x: 0, y: 5, z: -8 },
    icon: '🏮',
    reward: 'Eternal Flame Lantern',
    difficulty: 'Easy'
  },
  {
    id: 'hunt-3',
    name: 'Haunted Music Box',
    description: 'Locate the music box that plays by itself',
    clue: 'Right side of the realm, where the ground meets sky...',
    location: { x: 12, y: 4, z: -6 },
    icon: '🎵',
    reward: 'Spectral Music Box',
    difficulty: 'Medium'
  },
  {
    id: 'hunt-4',
    name: 'Ancient Skull Chalice',
    description: 'Find the chalice of forgotten souls',
    clue: 'Between two glowing guardians, in the heart of darkness...',
    location: { x: -5, y: 4, z: 5 },
    icon: '💀',
    reward: 'Soul Chalice',
    difficulty: 'Medium'
  },
  {
    id: 'hunt-5',
    name: 'The Crystal of Shadows',
    description: 'Seek the crystal that captures nightmares',
    clue: 'Front and center, where brave souls dare to tread...',
    location: { x: 10, y: 3, z: -3 },
    icon: '💎',
    reward: 'Shadow Crystal',
    difficulty: 'Hard'
  },
  {
    id: 'hunt-6',
    name: 'Raven\'s Cursed Feather',
    description: 'Find the feather of the eternal raven',
    clue: 'Left of center, where fog conceals secrets...',
    location: { x: -8, y: 2, z: -5 },
    icon: '🪶',
    reward: 'Raven\'s Quill',
    difficulty: 'Hard'
  },
  {
    id: 'hunt-7',
    name: 'The Demon\'s Ruby Eye',
    description: 'Discover the ruby that sees all',
    clue: 'Far to the right, where darkness reigns supreme...',
    location: { x: 8, y: 2.5, z: 7 },
    icon: '👁️',
    reward: 'Ruby of Omniscience',
    difficulty: 'Expert'
  },
]

const TreasureHunt = ({ isOpen, onToggle, foundTreasures, onTreasureFound, completedPuzzles }) => {
  const [selectedQuest, setSelectedQuest] = useState(null)
  const [activeHints, setActiveHints] = useState([])

  const totalTreasures = treasureHuntData.length
  const foundCount = foundTreasures.length
  const completionPercent = Math.round((foundCount / totalTreasures) * 100)

  const toggleHint = (questId) => {
    if (activeHints.includes(questId)) {
      setActiveHints(activeHints.filter(id => id !== questId))
    } else {
      setActiveHints([...activeHints, questId])
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-toxic'
      case 'Medium': return 'text-pumpkin'
      case 'Hard': return 'text-blood'
      case 'Expert': return 'text-portal-purple'
      default: return 'text-ghost'
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 px-4 py-6 bg-gradient-to-b from-toxic to-pumpkin rounded-l-2xl font-creepster shadow-2xl"
        style={{
          boxShadow: '0 0 30px rgba(57, 255, 20, 0.6)',
        }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        animate={{
          x: isOpen ? -384 : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 25,
          mass: 0.8,
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '▶' : '◀'}
        </motion.div>
        <div className="mt-2 text-xs">
          {foundCount}/{totalTreasures}
        </div>
        <div className="text-xl mt-1">🗺️</div>
      </motion.button>

      {/* Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-96 bg-gradient-to-b from-gray-900 via-haunted-black to-gray-900 border-l-4 border-toxic z-20 overflow-y-auto"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 25,
              mass: 0.8,
            }}
            style={{
              boxShadow: '0 0 60px rgba(57, 255, 20, 0.4)',
            }}
          >
            {/* Header */}
            <div className="p-6 border-b-2 border-toxic sticky top-0 bg-haunted-black z-10">
              <motion.h2
                className="text-4xl font-nosifer text-toxic text-center mb-2"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(57, 255, 20, 0.8)',
                    '0 0 20px rgba(57, 255, 20, 1)',
                    '0 0 10px rgba(57, 255, 20, 0.8)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🗺️ Treasure Hunt 🗺️
              </motion.h2>
              <p className="text-sm font-fredericka text-ghost text-center">
                Find all hidden artifacts to break the curse
              </p>
            </div>

            {/* Progress */}
            <div className="p-6 border-b-2 border-toxic">
              <div className="flex justify-between items-center mb-2">
                <span className="font-creepster text-toxic">Progress</span>
                <span className="font-fredericka text-ghost">{completionPercent}%</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-toxic">
                <motion.div
                  className="h-full bg-gradient-to-r from-toxic to-pumpkin"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs font-fredericka text-ghost mt-2 text-center">
                {foundCount} of {totalTreasures} treasures found
              </p>
            </div>

            {/* Quest Stats */}
            <div className="p-6 border-b-2 border-toxic">
              <h3 className="font-creepster text-pumpkin mb-3">📊 Your Stats</h3>
              <div className="space-y-2 text-sm font-fredericka">
                <div className="flex justify-between">
                  <span className="text-ghost">Puzzles Solved:</span>
                  <span className="text-toxic">{completedPuzzles.length} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ghost">Treasures Found:</span>
                  <span className="text-toxic">{foundCount} / {totalTreasures}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ghost">Completion:</span>
                  <span className="text-toxic">{Math.round((foundCount + completedPuzzles.length) / 12 * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Quest List */}
            <div className="p-6">
              <h3 className="font-creepster text-blood mb-4">🎯 Active Quests</h3>
              
              <div className="space-y-4">
                {treasureHuntData.map((quest) => {
                  const isFound = foundTreasures.includes(quest.id)
                  const isActive = selectedQuest === quest.id
                  const showHint = activeHints.includes(quest.id)

                  return (
                    <motion.div
                      key={quest.id}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        isFound
                          ? 'bg-toxic bg-opacity-10 border-toxic'
                          : isActive
                          ? 'bg-pumpkin bg-opacity-10 border-pumpkin'
                          : 'bg-gray-800 border-gray-600 hover:border-pumpkin'
                      }`}
                      whileHover={!isFound ? { scale: 1.02 } : {}}
                      onClick={() => !isFound && setSelectedQuest(isActive ? null : quest.id)}
                    >
                      {/* Quest Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{quest.icon}</span>
                          <div>
                            <h4 className="font-creepster text-lg text-ghost">
                              {quest.name}
                            </h4>
                            <span className={`text-xs font-fredericka ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty}
                            </span>
                          </div>
                        </div>
                        {isFound && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-2xl"
                          >
                            ✅
                          </motion.div>
                        )}
                      </div>

                      {/* Quest Description */}
                      <p className="text-sm font-fredericka text-ghost mb-3 italic">
                        {quest.description}
                      </p>

                      {/* Clue Section */}
                      {!isFound && (
                        <>
                          <motion.button
                            className="w-full px-3 py-2 bg-gradient-to-r from-portal-purple to-pumpkin rounded font-fredericka text-sm text-white mb-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleHint(quest.id)
                            }}
                          >
                            {showHint ? '🔒 Hide Clue' : '🔍 Reveal Clue'}
                          </motion.button>

                          <AnimatePresence>
                            {showHint && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-black bg-opacity-60 p-3 rounded border border-pumpkin"
                              >
                                <p className="text-sm font-fredericka text-pumpkin italic">
                                  💡 {quest.clue}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}

                      {/* Reward */}
                      {isFound && (
                        <div className="mt-3 pt-3 border-t border-toxic">
                          <p className="text-xs font-fredericka text-ghost">
                            <span className="text-toxic">Reward:</span> {quest.reward}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Completion Bonus */}
            {foundCount === totalTreasures && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="m-6 p-6 bg-gradient-to-r from-toxic to-pumpkin rounded-lg border-2 border-gold text-center"
              >
                <div className="text-6xl mb-3">🏆</div>
                <h3 className="text-2xl font-nosifer text-white mb-2">
                  TREASURE MASTER!
                </h3>
                <p className="text-sm font-fredericka text-white">
                  You've found all hidden treasures! The curse weakens...
                </p>
              </motion.div>
            )}

            {/* Tips */}
            <div className="p-6 border-t-2 border-toxic">
              <h3 className="text-xl font-creepster text-portal-purple mb-3">💡 Tips</h3>
              <ul className="text-sm font-fredericka text-ghost space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">🎃</span>
                  <span>Click glowing objects in the 3D scene to collect treasures</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🧩</span>
                  <span>Solve monster puzzles to earn special rewards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🗺️</span>
                  <span>Use clues to navigate the haunted realm</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌙</span>
                  <span>Some treasures are easier to spot in Witching Hour</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TreasureHunt

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const treatLore = {
  'pumpkin-0': { name: 'Cursed Lantern', lore: 'Lights the way through eternal darkness.' },
  'pumpkin-1': { name: 'Witch\'s Grimoire', lore: 'Contains spells of forgotten times.' },
  'pumpkin-2': { name: 'Soul Crystal', lore: 'Captures the essence of wandering spirits.' },
  'pumpkin-3': { name: 'Bone Talisman', lore: 'Protection against the restless dead.' },
  'pumpkin-4': { name: 'Moon Dust', lore: 'Gathered only on All Hallows\' Eve.' },
  'pumpkin-5': { name: 'Raven\'s Feather', lore: 'A messenger between realms.' },
  'pumpkin-6': { name: 'Blood Ruby', lore: 'Pulsates with ancient power.' },
}

const SidePanel = ({ isOpen, onToggle, collectedTreats, treatCount }) => {
  const [selectedTreat, setSelectedTreat] = useState(null)

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30 px-4 py-6 bg-gradient-to-b from-portal-purple to-portal-orange rounded-r-2xl font-creepster shadow-2xl"
        style={{
          boxShadow: '0 0 30px rgba(157, 78, 221, 0.6)',
        }}
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        animate={{
          x: isOpen ? 400 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '◀' : '▶'}
        </motion.div>
        <div className="mt-2 text-xs">
          {treatCount}
        </div>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-96 bg-gradient-to-b from-gray-900 via-haunted-black to-gray-900 border-r-4 border-pumpkin z-20 overflow-y-auto"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              boxShadow: '0 0 60px rgba(255, 107, 53, 0.4)',
            }}
          >
            {/* Header */}
            <div className="p-6 border-b-2 border-pumpkin">
              <motion.h2
                className="text-4xl font-nosifer text-pumpkin text-center mb-2"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255, 107, 53, 0.8)',
                    '0 0 20px rgba(255, 107, 53, 1)',
                    '0 0 10px rgba(255, 107, 53, 0.8)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Reliquary
              </motion.h2>
              <p className="text-sm font-fredericka text-ghost text-center">
                Collected Artifacts: {treatCount} / 7
              </p>
            </div>

            {/* Progress Bar */}
            <div className="p-6">
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-pumpkin">
                <motion.div
                  className="h-full bg-gradient-to-r from-pumpkin to-blood"
                  initial={{ width: 0 }}
                  animate={{ width: `${(treatCount / 7) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Treats Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {Object.keys(treatLore).map((treatId) => {
                const isCollected = collectedTreats.includes(treatId)
                const treat = treatLore[treatId]

                return (
                  <motion.div
                    key={treatId}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isCollected
                        ? 'bg-gradient-to-br from-pumpkin/20 to-blood/20 border-pumpkin'
                        : 'bg-gray-800 border-gray-700 opacity-50'
                    }`}
                    whileHover={isCollected ? { scale: 1.05 } : {}}
                    whileTap={isCollected ? { scale: 0.95 } : {}}
                    onClick={() => isCollected && setSelectedTreat(treatId)}
                  >
                    {/* Lock icon for uncollected */}
                    {!isCollected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">🔒</span>
                      </div>
                    )}

                    {isCollected && (
                      <>
                        <div className="text-4xl text-center mb-2">
                          {treatId.includes('0') ? '🏮' : 
                           treatId.includes('1') ? '📖' :
                           treatId.includes('2') ? '💎' :
                           treatId.includes('3') ? '🦴' :
                           treatId.includes('4') ? '✨' :
                           treatId.includes('5') ? '🪶' : '💍'}
                        </div>
                        <h4 className="text-xs font-creepster text-pumpkin text-center">
                          {treat.name}
                        </h4>
                      </>
                    )}

                    {/* Glow effect for collected items */}
                    {isCollected && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          boxShadow: '0 0 20px rgba(255, 107, 53, 0.4)',
                        }}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Instructions */}
            <div className="p-6 mt-4 border-t-2 border-pumpkin">
              <h3 className="text-xl font-creepster text-toxic mb-2">How to Play:</h3>
              <ul className="text-sm font-fredericka text-ghost space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">🎃</span>
                  <span>Click glowing pumpkins in the scene to collect treats</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">👻</span>
                  <span>Use the Trick or Treat button to encounter monsters</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌙</span>
                  <span>Toggle between Twilight and Witching Hour modes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📜</span>
                  <span>Each monster reveals unique lore</span>
                </li>
              </ul>
            </div>

            {/* Leaderboard */}
            <div className="p-6 border-t-2 border-pumpkin">
              <h3 className="text-xl font-creepster text-blood mb-3">Leaderboard</h3>
              <div className="bg-black bg-opacity-50 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm font-fredericka">
                  <span className="text-ghost">Your Collection:</span>
                  <span className="text-pumpkin font-bold text-lg">{treatCount}</span>
                </div>
                {treatCount === 7 && (
                  <motion.div
                    className="mt-4 p-3 bg-gradient-to-r from-toxic/20 to-pumpkin/20 rounded-lg border-2 border-toxic text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <p className="font-nosifer text-toxic text-sm">
                      🏆 MASTER COLLECTOR 🏆
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Music Controls */}
            <div className="p-6 border-t-2 border-pumpkin">
              <h3 className="text-xl font-creepster text-portal-purple mb-3">Audio</h3>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-gray-800 rounded-lg font-fredericka text-sm hover:bg-gray-700 transition-colors">
                  🔊 Mute
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-800 rounded-lg font-fredericka text-sm hover:bg-gray-700 transition-colors">
                  🎵 Playlist
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Treat Detail Modal */}
      <AnimatePresence>
        {selectedTreat && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTreat(null)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-80" />
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-haunted-black p-8 rounded-2xl border-4 border-pumpkin max-w-md"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl text-center mb-4">
                {selectedTreat.includes('0') ? '🏮' : 
                 selectedTreat.includes('1') ? '📖' :
                 selectedTreat.includes('2') ? '💎' :
                 selectedTreat.includes('3') ? '🦴' :
                 selectedTreat.includes('4') ? '✨' :
                 selectedTreat.includes('5') ? '🪶' : '💍'}
              </div>
              <h3 className="text-3xl font-nosifer text-pumpkin text-center mb-4">
                {treatLore[selectedTreat].name}
              </h3>
              <p className="text-lg font-fredericka text-ghost text-center">
                {treatLore[selectedTreat].lore}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SidePanel

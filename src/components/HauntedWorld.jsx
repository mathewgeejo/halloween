import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box } from '@react-three/drei'
import * as THREE from 'three'

// Animated Bat Component
const Bat = ({ index }) => {
  const meshRef = useRef()
  const initialPosition = useRef([
    (Math.random() - 0.5) * 30,
    Math.random() * 15 + 5,
    (Math.random() - 0.5) * 20
  ])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const speed = 0.5 + index * 0.1
      
      meshRef.current.position.x = initialPosition.current[0] + Math.sin(time * speed) * 10
      meshRef.current.position.y = initialPosition.current[1] + Math.sin(time * speed * 0.5) * 3
      meshRef.current.position.z = initialPosition.current[2] + Math.cos(time * speed) * 5
      
      meshRef.current.rotation.y = Math.sin(time * speed * 2) * 0.5
      meshRef.current.rotation.z = Math.sin(time * speed * 3) * 0.2
    }
  })

  return (
    <group ref={meshRef} position={initialPosition.current}>
      {/* Bat body */}
      <Box args={[0.3, 0.2, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      {/* Wings */}
      <Box args={[1, 0.05, 0.5]} position={[0, 0, 0]} rotation={[0, 0, Math.sin(Date.now() * 0.01) * 0.5]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
    </group>
  )
}

// Floating Pumpkin Component
const FloatingPumpkin = ({ position, onClick, isCollected }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current && !isCollected) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.3
      meshRef.current.rotation.y += 0.01
    }
  })

  if (isCollected) return null

  return (
    <Sphere
      ref={meshRef}
      args={[0.5, 16, 16]}
      position={position}
      onClick={onClick}
    >
      <meshStandardMaterial
        color="#ff6b35"
        emissive="#ff6b35"
        emissiveIntensity={0.5}
        roughness={0.7}
      />
    </Sphere>
  )
}

// Ghost Particle System
const GhostParticle = ({ index }) => {
  const meshRef = useRef()
  const startPos = useRef([
    (Math.random() - 0.5) * 40,
    Math.random() * 20,
    (Math.random() - 0.5) * 30
  ])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.x = startPos.current[0] + Math.sin(time * 0.3 + index) * 5
      meshRef.current.position.y = startPos.current[1] + Math.sin(time * 0.2 + index) * 3
      meshRef.current.position.z = startPos.current[2] + Math.cos(time * 0.3 + index) * 5
      
      meshRef.current.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.3, 8, 8]} position={startPos.current}>
      <meshBasicMaterial
        color="#e0e0e0"
        transparent
        opacity={0.3}
      />
    </Sphere>
  )
}

// Main Haunted World Component
const HauntedWorld = ({ mousePosition, isWitchingHour, onTreatCollected, collectedTreats }) => {
  const [lightning, setLightning] = useState(false)
  const [pumpkinPositions] = useState([
    [-8, 2, -5],
    [10, 3, -3],
    [-5, 4, 5],
    [8, 2.5, 7],
    [0, 5, -8],
    [-12, 3, 2],
    [12, 4, -6],
  ])

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

  return (
    <div className="relative w-full h-full">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isWitchingHour
            ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-black'
            : 'bg-gradient-to-b from-purple-900 via-indigo-900 to-black'
        }`}
      />

      {/* Animated fog layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(200, 200, 200, 0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 80%, rgba(150, 150, 150, 0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 100, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity }}
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

      {/* 3D Scene */}
      <div className="absolute inset-0" style={{ cursor: 'grab' }}>
        <Canvas
          camera={{ position: [0, 5, 15], fov: 75 }}
          onPointerDown={(e) => e.target.style.cursor = 'grabbing'}
          onPointerUp={(e) => e.target.style.cursor = 'grab'}
        >
          <ambientLight intensity={isWitchingHour ? 0.2 : 0.4} />
          <pointLight position={[0, 10, 0]} intensity={isWitchingHour ? 0.5 : 0.8} color={isWitchingHour ? "#9d4edd" : "#ffa500"} />
          <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={0.5} castShadow />

          {/* Lightning effect */}
          {lightning && (
            <pointLight position={[0, 30, -20]} intensity={10} color="#ffffff" />
          )}

          {/* Bats */}
          {[...Array(8)].map((_, i) => (
            <Bat key={`bat-${i}`} index={i} />
          ))}

          {/* Floating collectible pumpkins */}
          {pumpkinPositions.map((pos, i) => (
            <FloatingPumpkin
              key={`pumpkin-${i}`}
              position={pos}
              onClick={() => handlePumpkinClick(i)}
              isCollected={collectedTreats.includes(`pumpkin-${i}`)}
            />
          ))}

          {/* Ghost particles */}
          {[...Array(15)].map((_, i) => (
            <GhostParticle key={`ghost-${i}`} index={i} />
          ))}

          {/* Ground plane with fog */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
              color="#0a0a0a"
              roughness={1}
              metalness={0}
            />
          </mesh>
        </Canvas>
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
        {/* Floating embers */}
        {[...Array(30)].map((_, i) => (
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

      {/* Title */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.h1
          className="text-7xl md:text-9xl font-creepster text-pumpkin animate-glow mb-4"
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
          Where nightmares come alive...
        </motion.p>
      </motion.div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none vignette" />
    </div>
  )
}

export default HauntedWorld

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Portal 3D Component
const Portal3D = ({ onComplete }) => {
  const meshRef = useRef()
  const [intensity, setIntensity] = useState(1)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.5
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }

    // Increase intensity over time
    if (time < 4) {
      setIntensity(1 + time * 0.5)
    }

    // Trigger warp effect at 4 seconds
    if (time > 4 && time < 4.1) {
      onComplete()
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#ff6d00"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0}
          metalness={0.8}
          emissive="#9d4edd"
          emissiveIntensity={intensity}
        />
      </Sphere>
      
      {/* Outer glow ring */}
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#9d4edd"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

// Main Portal Intro Component
const PortalIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('darkness') // darkness -> static -> portal -> warp
  const [startWarp, setStartWarp] = useState(false)

  useEffect(() => {
    // Darkness phase (1 second)
    const timer1 = setTimeout(() => setPhase('static'), 1000)
    
    // Static flicker phase (1.5 seconds)
    const timer2 = setTimeout(() => setPhase('portal'), 2500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleWarp = () => {
    setStartWarp(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

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
            className="absolute inset-0 fog-layer"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* 3D Portal */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Portal3D onComplete={handleWarp} />
            </Canvas>
          </div>

          {/* Portal text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            <motion.h1
              className="text-6xl font-creepster text-pumpkin mb-4 text-glow-strong"
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

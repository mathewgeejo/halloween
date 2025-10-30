import { useEffect, useRef } from 'react'
import { Howl } from 'howler'

// Sound Manager Component - Handles all audio for the experience
const AudioManager = ({ introComplete, isWitchingHour, currentMonster }) => {
  const ambientRef = useRef(null)
  const windRef = useRef(null)
  const monsterSoundsRef = useRef({})

  useEffect(() => {
    // Initialize ambient sounds with Web Audio API fallback
    // Using data URLs for demonstration - replace with actual audio files
    
    // Ambient haunting music (looped)
    const ambientSound = new Howl({
      src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
      loop: true,
      volume: isWitchingHour ? 0.4 : 0.25,
      html5: true,
      onload: function() {
        // Create ambient atmosphere with oscillator
        if (typeof AudioContext !== 'undefined') {
          const audioContext = new AudioContext()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.type = 'sine'
          oscillator.frequency.value = 55 // Low rumble
          gainNode.gain.value = 0.05
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          if (introComplete) {
            oscillator.start()
          }
        }
      }
    })

    // Wind and whispers
    const windSound = new Howl({
      src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
      loop: true,
      volume: 0.15,
      html5: true
    })

    ambientRef.current = ambientSound
    windRef.current = windSound

    if (introComplete) {
      ambientSound.play()
      windSound.play()
    }

    return () => {
      ambientSound.unload()
      windSound.unload()
    }
  }, [introComplete, isWitchingHour])

  // Monster-specific sounds
  useEffect(() => {
    if (!currentMonster) return

    const monsterSounds = {
      'witch': {
        laugh: new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
          volume: 0.6
        })
      },
      'pumpkin-king': {
        rumble: new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
          volume: 0.7
        })
      },
      'hollow-child': {
        giggle: new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
          volume: 0.5
        })
      },
      'collector': {
        clink: new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
          volume: 0.5
        })
      },
      'shadow-weaver': {
        whisper: new Howl({
          src: ['data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
          volume: 0.4
        })
      }
    }

    if (monsterSounds[currentMonster]) {
      const sound = Object.values(monsterSounds[currentMonster])[0]
      sound.play()
      
      // Create synthesized monster sound effect
      if (typeof AudioContext !== 'undefined') {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        // Different frequencies for different monsters
        const frequencies = {
          'witch': 220,
          'pumpkin-king': 80,
          'hollow-child': 440,
          'collector': 180,
          'shadow-weaver': 110
        }
        
        oscillator.type = 'sawtooth'
        oscillator.frequency.value = frequencies[currentMonster] || 150
        gainNode.gain.value = 0.1
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 2)
      }

      monsterSoundsRef.current[currentMonster] = monsterSounds[currentMonster]
    }

    return () => {
      Object.values(monsterSounds).forEach(soundSet => {
        Object.values(soundSet).forEach(sound => sound.unload())
      })
    }
  }, [currentMonster])

  // Volume adjustments for time of day
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.volume(isWitchingHour ? 0.4 : 0.25)
    }
    if (windRef.current) {
      windRef.current.volume(isWitchingHour ? 0.25 : 0.15)
    }
  }, [isWitchingHour])

  return null
}

export default AudioManager

# 🎃 THE HAUNTED REALM 🎃

A cinematic, story-driven Halloween experience built with React, Three.js, and Framer Motion. Enter through a glowing portal and explore an interactive 3D haunted world filled with monsters, collectibles, and atmospheric storytelling.

![Haunted Realm](https://img.shields.io/badge/Halloween-2025-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.161-black?style=for-the-badge&logo=three.js)

## 🌟 Features

### 🎬 Scene 1: Portal Intro
- **Cinematic Entry**: Darkness fades to static, then a glowing portal appears
- **3D Portal Effect**: Built with React Three Fiber featuring shader-like distortion
- **Warp Transition**: Camera zooms through portal with perspective distortion
- **Atmospheric Audio**: Low rumbles, wind, and echoing whispers

### 🌕 Scene 2: Haunted World
- **Dynamic Environment**:
  - Multi-layered animated fog with depth illusion
  - Flying bats with randomized 3D trajectories
  - Lightning flashes revealing creature silhouettes
  - Floating embers and ghost particles
  - Interactive moon with parallax effects

- **Time-Based Atmosphere**:
  - **Twilight Mode**: Purple dusk with lighter ambience
  - **Witching Hour Mode**: Midnight blue lighting with intense soundscape
  - Automatic detection based on system time (11 PM - 1 AM)

### 🧟‍♂️ Monster Encounters
Five unique creatures with individual personalities:

1. **The Whispering Witch** 🧙‍♀️
   - *"Come closer... I have secrets to share..."*
   - Guards the gate between worlds, feeding on curiosity

2. **The Pumpkin King** 🎃
   - *"Every seed is a soul I've sown..."*
   - Born from cursed soil, his grin never fades

3. **The Hollow Child** 👧
   - *"Play with me... forever and ever..."*
   - A spirit trapped between lullabies and screams

4. **The Collector** 💀
   - *"You've brought me something... shiny."*
   - Remembers every visitor who touched the relics

5. **The Shadow Weaver** 🕷️
   - *"Your shadow... it belongs to me now."*
   - Weaves nightmares from stolen shadows

Each encounter features:
- Animated entrance with particle effects
- Unique color schemes and themes
- Typed dialogue effect
- Rich lore reveals
- Custom sound effects (synthesized)

### 🎮 Interactive Elements

- **Trick-or-Treat Button**: Summons random monster encounters
- **Collectible Treats**: 7 hidden glowing pumpkins to find
- **Side Panel**: 
  - Reliquary displaying collected artifacts
  - Progress tracking
  - Lore entries for each collectible
  - Game instructions
  - Leaderboard system (localStorage)
- **Parallax Effects**: Environment responds to mouse movement
- **Dynamic Lighting**: React to user interactions and time of day

### 🎨 Visual Design

- **Typography**: Creepster, Nosifer, Fredericka the Great fonts
- **Color Palette**: 
  - Pumpkin Orange (#ff6b35)
  - Blood Red (#8b0000)
  - Toxic Green (#39ff14)
  - Portal Purple (#9d4edd)
  - Haunted Black (#0a0a0a)
- **Effects**: 
  - Glowing shadows and text
  - Particle systems
  - Depth blur and vignette
  - Noise textures
  - Dynamic gradients

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open in Browser**
The app will automatically open at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion 11** - Animation library
- **React Three Fiber 8.15** - React renderer for Three.js
- **@react-three/drei 9.96** - Useful Three.js helpers
- **Three.js 0.161** - 3D graphics library
- **Howler.js 2.2** - Audio management
- **GSAP 3.12** - Advanced animations
- **Tailwind CSS 3.4** - Utility-first CSS framework

## 📁 Project Structure

```
halloween/
├── src/
│   ├── components/
│   │   ├── AudioManager.jsx       # Sound system with Web Audio API
│   │   ├── PortalIntro.jsx        # Opening sequence with 3D portal
│   │   ├── HauntedWorld.jsx       # Main 3D environment
│   │   ├── MonsterEncounter.jsx   # Monster card modals
│   │   ├── TrickOrTreatButton.jsx # Summon button component
│   │   └── SidePanel.jsx          # Collection & lore panel
│   ├── App.jsx                     # Main app logic
│   ├── App.css                     # Component styles
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles & Tailwind
├── index.html                      # HTML template
├── tailwind.config.js              # Tailwind configuration
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies
```

## 🎮 How to Play

1. **Enter the Portal**: Watch the cinematic intro as you're pulled into the haunted realm
2. **Explore**: Move your mouse to create parallax effects
3. **Collect Treats**: Click on glowing pumpkins scattered throughout the 3D scene (7 total)
4. **Summon Monsters**: Click the "Trick or Treat" button to encounter random creatures
5. **Read Lore**: Each monster reveals unique stories and dialogue
6. **Track Progress**: Open the side panel to view your collection
7. **Change Atmosphere**: Toggle between Twilight and Witching Hour modes
8. **Master Collector**: Collect all 7 artifacts to achieve completion

## 🎨 Customization

### Adding New Monsters

Edit `src/components/MonsterEncounter.jsx`:

```javascript
const monsterData = {
  'your-monster': {
    name: 'Monster Name',
    dialogue: 'What they say...',
    lore: 'Their backstory...',
    color: '#hexcolor',
    icon: '🎭',
    particleColor: '#hexcolor',
  },
}
```

### Adding Sound Files

Replace the data URLs in `src/components/AudioManager.jsx` with actual audio files:

```javascript
const ambientSound = new Howl({
  src: ['/sounds/ambient.mp3'],
  loop: true,
  volume: 0.25,
})
```

### Adjusting 3D Scene

Modify `src/components/HauntedWorld.jsx` to add more 3D objects, adjust lighting, or change camera angles.

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Note**: Best experienced on desktop with WebGL support and audio enabled.

## 📝 Development Notes

### Performance Optimization
- 3D elements use instancing where possible
- Animations use `requestAnimationFrame`
- Particle systems are limited for performance
- Images and sounds use lazy loading

### Audio Implementation
- Uses Web Audio API for synthesized effects
- Howler.js for audio management
- Placeholder data URLs provided (replace with actual audio files)

### State Management
- React hooks for component state
- localStorage for persistence
- Context-free architecture for simplicity

## 🐛 Troubleshooting

**Issue**: 3D scene not rendering
- **Solution**: Ensure WebGL is enabled in browser settings

**Issue**: No audio playing
- **Solution**: Replace data URL placeholders with actual audio files

**Issue**: Performance issues
- **Solution**: Reduce particle counts in HauntedWorld.jsx

**Issue**: Fonts not loading
- **Solution**: Check internet connection (fonts load from Google Fonts)

## 🎃 Credits

Created with ❤️ for Halloween 2025

**Frameworks & Libraries**:
- React Team
- Three.js Team  
- Framer Motion by Framer
- Howler.js by GoldFire Studios

**Fonts**:
- Creepster by Sideshow
- Nosifer by Typomondo
- Fredericka the Great by Tart Workshop

## 📄 License

MIT License - Feel free to use this project for learning or personal projects.

---

### 🎬 **Enter The Haunted Realm... If You Dare** 🎬

*"In the realm where shadows dance and spirits roam,*  
*The portal opens wide—now make this your home."*

---

**Happy Halloween! 🎃👻🕷️**
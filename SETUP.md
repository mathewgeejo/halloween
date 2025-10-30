# 🎃 Quick Setup Guide

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React & React DOM
- Vite (build tool)
- Framer Motion (animations)
- React Three Fiber & Drei (3D graphics)
- Three.js (3D library)
- Howler.js (audio)
- GSAP (advanced animations)
- Tailwind CSS (styling)

### 2. Start Development Server
```bash
npm run dev
```

The application will open automatically at http://localhost:3000

### 3. Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

## Project Features

✅ **Cinematic portal intro** with 3D effects
✅ **Interactive 3D haunted world** with fog, bats, and ghosts
✅ **5 unique monster encounters** with lore and dialogue
✅ **7 collectible pumpkins** scattered in the scene
✅ **Dynamic day/night modes** (Twilight & Witching Hour)
✅ **Side panel** with collection tracking
✅ **Atmospheric audio** using Web Audio API
✅ **Parallax effects** responding to mouse movement
✅ **Lightning flashes** and particle systems
✅ **Progress tracking** with localStorage
✅ **Fully responsive** design

## Customization Tips

### Change Monster Data
Edit `src/components/MonsterEncounter.jsx` to add new creatures or modify existing ones.

### Adjust 3D Scene
Modify `src/components/HauntedWorld.jsx` to change lighting, add objects, or adjust camera angles.

### Add Real Audio Files
Replace data URL placeholders in `src/components/AudioManager.jsx` with actual MP3/WAV files:
```javascript
const ambientSound = new Howl({
  src: ['/sounds/ambient-horror.mp3'],
  loop: true,
  volume: 0.25,
})
```

### Modify Colors
Update `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  'pumpkin': '#ff6b35',
  'blood': '#8b0000',
  'toxic': '#39ff14',
}
```

## Troubleshooting

**Port already in use?**
Edit `vite.config.js` and change the port number.

**3D scene not loading?**
Ensure your browser supports WebGL. Check at: https://get.webgl.org/

**Performance issues?**
Reduce particle counts in `HauntedWorld.jsx` (lines with `[...Array(X)]`).

## File Structure

```
src/
├── components/
│   ├── AudioManager.jsx       ← Sound system
│   ├── PortalIntro.jsx        ← Opening sequence
│   ├── HauntedWorld.jsx       ← Main 3D scene
│   ├── MonsterEncounter.jsx   ← Monster cards
│   ├── TrickOrTreatButton.jsx ← Summon button
│   └── SidePanel.jsx          ← Collection panel
├── App.jsx                     ← Main app
├── main.jsx                    ← Entry point
└── index.css                   ← Styles
```

## Browser Requirements

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- WebGL enabled
- Audio enabled

---

**Ready to enter The Haunted Realm? Run `npm install` then `npm run dev`!** 🎃👻

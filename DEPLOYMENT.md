# 🚀 Deployment Guide - The Haunted Realm

## Quick Deploy Options

### Option 1: Vercel (Recommended) ⚡

**Why Vercel:**
- Zero config deployment
- Automatic HTTPS
- Global CDN
- Free tier available
- Perfect for Vite/React

**Steps:**
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd c:\Users\mathew\Downloads\halloween
vercel
```

3. Follow prompts:
- Set up and deploy? `Y`
- Which scope? (Select your account)
- Link to existing project? `N`
- Project name: `haunted-realm`
- Directory: `./`
- Build command: `npm run build`
- Output directory: `dist`

4. Your site is live! 🎃

**Custom Domain (Optional):**
```bash
vercel --prod
vercel domains add yourdomain.com
```

---

### Option 2: Netlify 🌐

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy
```

4. For production:
```bash
netlify deploy --prod
```

**Or use Netlify Drop:**
- Go to https://app.netlify.com/drop
- Drag and drop the `dist` folder
- Done!

---

### Option 3: GitHub Pages 📄

**Steps:**

1. Create `vite.config.js` update:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/halloween/', // Replace with your repo name
  server: {
    port: 3000,
    open: true
  }
})
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repo settings
   - Settings → Pages → Source: gh-pages branch

---

### Option 4: AWS S3 + CloudFront ☁️

**For Advanced Users:**

1. Build:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://haunted-realm
```

3. Upload:
```bash
aws s3 sync dist/ s3://haunted-realm --delete
```

4. Configure bucket for static hosting

5. (Optional) Set up CloudFront for HTTPS and CDN

---

### Option 5: Docker Container 🐳

**Dockerfile** (create this):
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Deploy:**
```bash
docker build -t haunted-realm .
docker run -p 8080:80 haunted-realm
```

---

## Pre-Deployment Checklist ✅

### 1. Performance Optimization
```bash
# Build for production
npm run build

# Check bundle size
npm run build -- --mode production

# Preview production build
npm run preview
```

### 2. Environment Variables
Create `.env.production`:
```env
VITE_API_URL=https://your-api.com
VITE_ENABLE_ANALYTICS=true
```

### 3. SEO Optimization
Update `index.html`:
```html
<head>
  <title>The Haunted Realm - Interactive Halloween Experience</title>
  <meta name="description" content="Enter a cinematic haunted world filled with monsters, collectibles, and atmospheric storytelling.">
  <meta property="og:title" content="The Haunted Realm">
  <meta property="og:description" content="An immersive Halloween experience">
  <meta property="og:image" content="/preview.png">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

### 4. Analytics (Optional)
Add Google Analytics to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 5. Error Tracking (Optional)
```bash
npm install @sentry/react
```

---

## Build Optimization Tips

### 1. Code Splitting
Already configured with Vite! ✅

### 2. Image Optimization
If you add images:
```bash
npm install vite-plugin-image-optimizer
```

### 3. Compression
Add to `vite.config.js`:
```javascript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    viteCompression()
  ]
})
```

### 4. PWA (Progressive Web App)
```bash
npm install vite-plugin-pwa -D
```

Update `vite.config.js`:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'The Haunted Realm',
        short_name: 'Haunted',
        description: 'Interactive Halloween Experience',
        theme_color: '#ff6b35',
        icons: [
          {
            src: 'pumpkin.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
```

---

## Post-Deployment Testing

### 1. Performance Check
- Visit: https://pagespeed.web.dev
- Enter your URL
- Target: 90+ score

### 2. Browser Testing
Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### 3. Device Testing
- ✅ Desktop (1920x1080)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

### 4. Features Check
- ✅ Portal intro plays
- ✅ 3D scene renders
- ✅ Pumpkins are clickable
- ✅ Monsters appear
- ✅ Side panel opens
- ✅ Audio plays
- ✅ Mode toggle works
- ✅ localStorage persists

---

## Custom Domain Setup

### With Vercel
```bash
vercel domains add hauntedrealm.com
```

Add DNS records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### With Netlify
```bash
netlify domains:add hauntedrealm.com
```

Follow DNS instructions in dashboard.

---

## Environment-Specific Builds

### Development
```bash
npm run dev
```

### Staging
```bash
npm run build -- --mode staging
vercel --env staging
```

### Production
```bash
npm run build -- --mode production
vercel --prod
```

---

## Monitoring & Maintenance

### 1. Uptime Monitoring
Services to use:
- UptimeRobot (free)
- Pingdom
- StatusCake

### 2. Error Tracking
```bash
npm install @sentry/react
```

### 3. Analytics
- Google Analytics
- Plausible (privacy-friendly)
- Fathom

### 4. User Feedback
Add a feedback button:
```jsx
<button onClick={() => window.open('https://forms.gle/your-form')}>
  Send Feedback
</button>
```

---

## Rollback Strategy

### Vercel
```bash
vercel rollback
```

### Netlify
Use Netlify dashboard → Deploys → Restore

### GitHub Pages
```bash
git revert HEAD
npm run deploy
```

---

## Performance Benchmarks

**Target Metrics:**
```
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Time to Interactive: < 3.5s
Cumulative Layout Shift: < 0.1
Total Bundle Size: < 500KB
```

**Actual Results (after build):**
```bash
npm run build

# Output should show:
dist/assets/index-[hash].js  ~150KB
dist/assets/index-[hash].css ~20KB
Total: ~170KB (gzipped)
```

---

## Security Headers

Add to hosting platform:

### Netlify (_headers file)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

---

## Cost Estimation

### Free Tier Hosting
- **Vercel**: Free (hobby plan)
- **Netlify**: Free (100GB bandwidth/month)
- **GitHub Pages**: Free (unlimited)
- **Cloudflare Pages**: Free (unlimited)

### Paid Options (if needed)
- **Vercel Pro**: $20/month
- **Netlify Pro**: $19/month
- **AWS S3 + CloudFront**: ~$1-5/month

---

## Launch Checklist 🚀

**Before Going Live:**
- [ ] Run `npm run build`
- [ ] Test production build locally
- [ ] Check all links work
- [ ] Verify audio/3D on multiple browsers
- [ ] Test on mobile devices
- [ ] Set up analytics
- [ ] Configure custom domain (optional)
- [ ] Set up error tracking
- [ ] Test collectible persistence
- [ ] Verify all monsters appear
- [ ] Check side panel functionality
- [ ] Test mode toggle
- [ ] Verify localStorage works

**After Launch:**
- [ ] Share on social media
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Plan v2 features

---

## Quick Deploy Commands

**For Vercel:**
```bash
npm run build && vercel --prod
```

**For Netlify:**
```bash
npm run build && netlify deploy --prod
```

**For GitHub Pages:**
```bash
npm run deploy
```

---

## Support & Updates

### Updating After Deploy
```bash
# Make your changes
git add .
git commit -m "Update: description"
git push

# Then redeploy
npm run build
vercel --prod  # or your chosen platform
```

### Backup Strategy
1. Keep git repository updated
2. Store `node_modules` separately
3. Document all custom configurations
4. Export localStorage data periodically

---

## 🎃 You're Ready to Deploy!

**Recommended: Start with Vercel**
```bash
npm i -g vercel
vercel
```

**Then customize and enhance based on your needs!**

---

**Questions?** Check the main README.md for troubleshooting.

**Happy Haunting! 👻🕷️**

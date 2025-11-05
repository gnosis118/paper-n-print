# 🎨 Perchance AI Photo Generator - Quick Start

## 30-Second Setup

### 1. Install Playwright
```bash
npm install playwright
npx playwright install chromium
```

### 2. Run Generation
```bash
npx ts-node scripts/generateImagesPerchance.ts
```

### 3. Done! 🎉
Images download to `public/images/downloads/`

---

## What Happens

1. ✅ Opens Perchance in browser
2. ✅ Fills in prompt for each image
3. ✅ Clicks "Generate"
4. ✅ Waits for image to complete
5. ✅ Downloads image automatically
6. ✅ Repeats for all 14 images
7. ✅ Saves results to JSON

**Time:** ~5-10 minutes for all images
**Cost:** $0 - Completely FREE!

---

## Generated Images

```
✅ homepage-hero.webp (1920x1080)
✅ quick-bids.webp (800x600)
✅ collect-deposits.webp (800x600)
✅ mobile-first.webp (800x600)
✅ complete-job.webp (800x600)
✅ electrician-hero.webp (1200x800)
✅ plumber-hero.webp (1200x800)
✅ roofer-hero.webp (1200x800)
✅ painter-hero.webp (1200x800)
✅ landscaper-hero.webp (1200x800)
✅ hvac-hero.webp (1200x800)
✅ gc-hero.webp (1200x800)
✅ handyman-hero.webp (1200x800)
✅ carpenter-hero.webp (1200x800)
```

---

## Troubleshooting

**Browser won't open?**
```bash
npx playwright install chromium
```

**Timeout errors?**
Edit `scripts/generateImagesPerchance.ts`:
```typescript
timeout: 120000, // Increase to 2 minutes
```

**Images not downloading?**
```bash
mkdir -p public/images/downloads
chmod 755 public/images/downloads
```

---

## Next Steps

1. ✅ Generate images
2. ✅ Optimize with: `npx ts-node scripts/optimizeImages.ts`
3. ✅ Update components to use images
4. ✅ Deploy to production

---

## Using Images

```tsx
import { getImageMetadata } from '@/data/imageMetadata';

export default function HomePage() {
  const image = getImageMetadata('homepage-hero');
  
  return (
    <img
      src="/images/homepage-hero.webp"
      alt={image?.alt}
      width={1920}
      height={1080}
      loading="lazy"
    />
  );
}
```

---

## Files

- `scripts/generateImagesPerchance.ts` - Automation script
- `src/lib/perchanceImageService.ts` - Service layer
- `PERCHANCE_IMAGE_GENERATION.md` - Full guide
- `IMAGE_GENERATION_COMPARISON.md` - Compare methods

---

**Ready? Let's generate! 🚀**

```bash
npx ts-node scripts/generateImagesPerchance.ts
```


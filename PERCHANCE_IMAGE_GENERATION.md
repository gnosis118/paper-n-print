# 🎨 Perchance AI Photo Generator - Automation Guide

## Overview

This guide shows how to automate image generation using Perchance AI Photo Generator (https://perchance.org/ai-photo-generator).

## Why Perchance?

✅ **Free** - No API key required
✅ **High Quality** - Excellent image generation
✅ **No Rate Limits** - Generate as many as you want
✅ **Easy to Use** - Simple web interface
✅ **Automatable** - Browser automation with Playwright

## Prerequisites

```bash
# Install Playwright for browser automation
npm install playwright

# Install TypeScript (if not already installed)
npm install -D typescript ts-node
```

## Method 1: Browser Automation (Recommended)

### Setup

```bash
# Install dependencies
npm install playwright

# Make sure you have the scripts
ls scripts/generateImagesPerchance.ts
```

### Generate All Images

```bash
# Run the automation script
npx ts-node scripts/generateImagesPerchance.ts
```

**What happens:**
1. Opens Perchance in a browser window
2. Fills in the prompt for each image
3. Clicks "Generate"
4. Waits for image to complete
5. Downloads the image
6. Repeats for all 14 images
7. Saves results to JSON

**Estimated time:** ~5-10 minutes for all images

### Configuration

Edit `scripts/generateImagesPerchance.ts` to customize:

```typescript
const config: GenerationConfig = {
  headless: false,      // Set to true to hide browser
  slowMo: 1000,         // Slow down actions (ms)
  timeout: 60000,       // Timeout per image (ms)
  retries: 3,           // Retry failed images
};
```

### Output

```
public/images/downloads/
├── homepage-hero.webp
├── quick-bids.webp
├── collect-deposits.webp
├── mobile-first.webp
├── complete-job.webp
├── electrician-hero.webp
├── plumber-hero.webp
├── roofer-hero.webp
├── painter-hero.webp
├── landscaper-hero.webp
├── hvac-hero.webp
├── gc-hero.webp
├── handyman-hero.webp
├── carpenter-hero.webp
└── generation-results.json
```

## Method 2: Manual Generation

If automation doesn't work, you can generate manually:

### Step 1: Get Pre-filled URLs

```typescript
import { getProInvoicePerchanceRequests, getPerchanceGeneratorUrl } from '@/lib/perchanceImageService';

const requests = getProInvoicePerchanceRequests();
requests.forEach(req => {
  const url = getPerchanceGeneratorUrl(req.prompt);
  console.log(`${req.filename}: ${url}`);
});
```

### Step 2: Open Each URL

1. Copy the URL
2. Open in browser
3. Click "Generate"
4. Wait for image
5. Right-click → Save As
6. Save to `public/images/`

## Method 3: API Integration (If Available)

Perchance may offer an API. Check their documentation:
- https://perchance.org/api-docs
- https://perchance.org/documentation

## Troubleshooting

### Browser Won't Open

```bash
# Install Chromium
npx playwright install chromium

# Try again
npx ts-node scripts/generateImagesPerchance.ts
```

### Timeout Errors

Increase timeout in config:
```typescript
timeout: 120000, // 2 minutes
```

### Images Not Downloading

Check permissions:
```bash
# Create directory
mkdir -p public/images/downloads

# Check permissions
ls -la public/images/
```

### Selectors Not Found

Perchance may have updated their UI. Update selectors in script:
```typescript
// Find new selectors using browser DevTools
const promptInput = await this.page.$('textarea[placeholder*="prompt"]');
```

## Image Optimization

After generation, optimize images:

```bash
# Install sharp
npm install sharp

# Run optimization
npx ts-node scripts/optimizeImages.ts
```

## Using Generated Images

### In React Components

```tsx
import { getImageMetadata } from '@/data/imageMetadata';

export default function HomePage() {
  const heroImage = getImageMetadata('homepage-hero');
  
  return (
    <img
      src="/images/homepage-hero.webp"
      alt={heroImage?.alt}
      title={heroImage?.title}
      width={1920}
      height={1080}
      loading="lazy"
    />
  );
}
```

### With Next.js Image Component

```tsx
import Image from 'next/image';
import { getImageMetadata } from '@/data/imageMetadata';

export default function HomePage() {
  const heroImage = getImageMetadata('homepage-hero');
  
  return (
    <Image
      src="/images/homepage-hero.webp"
      alt={heroImage?.alt}
      width={1920}
      height={1080}
      priority
    />
  );
}
```

## Batch Processing

Generate images in batches to avoid overwhelming the system:

```typescript
// Generate first 5 images
const requests = getProInvoicePerchanceRequests().slice(0, 5);
await generator.generateBatch(requests);

// Generate next 5 images
const requests2 = getProInvoicePerchanceRequests().slice(5, 10);
await generator.generateBatch(requests2);
```

## CI/CD Integration

For automated generation in CI/CD:

```yaml
# .github/workflows/generate-images.yml
name: Generate Images

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install
      - run: npx ts-node scripts/generateImagesPerchance.ts
      - uses: actions/upload-artifact@v3
        with:
          name: generated-images
          path: public/images/downloads/
```

## Files Created

```
src/lib/perchanceImageService.ts    ← Service layer
scripts/generateImagesPerchance.ts   ← Automation script
PERCHANCE_IMAGE_GENERATION.md        ← This guide
```

## Next Steps

1. ✅ Install Playwright
2. ✅ Run automation script
3. ✅ Download images
4. ✅ Optimize images
5. ✅ Update React components
6. ✅ Deploy to production

## Support

- **Perchance:** https://perchance.org
- **Playwright:** https://playwright.dev
- **ProInvoice:** Check GitHub issues

---

**Ready to automate? Let's go! 🚀**


# ProInvoice Image Generation Guide

## Overview

This guide walks you through generating, optimizing, and integrating all ProInvoice images using the Stable Diffusion API.

## Prerequisites

1. **Stable Diffusion API Key** - Get from https://stablediffusionapi.com
2. **Node.js** - v16 or higher
3. **npm** - Latest version

## Step 1: Generate Images

### Setup

```bash
# Install dependencies (if not already done)
npm install

# Set your API key as environment variable
export STABLE_DIFFUSION_API_KEY="your-api-key-here"
```

### Generate All Images

```bash
# Generate all 25 images
npx ts-node scripts/generateImages.ts $STABLE_DIFFUSION_API_KEY
```

**What happens:**
- Generates 25 images using Stable Diffusion API
- Saves results to `public/images/generation-results.json`
- Includes image URLs, generation times, and metadata
- Adds 3-second delay between requests to avoid rate limiting

**Estimated time:** ~2-3 minutes for all images

### Output Example

```json
{
  "filename": "homepage-hero.webp",
  "status": "success",
  "imageUrl": "https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/...",
  "generationTime": 1.32
}
```

## Step 2: Download Images

### Manual Download

1. Open `public/images/generation-results.json`
2. For each successful image, copy the `imageUrl`
3. Download to `public/images/` directory
4. Rename to match the `filename` field

### Automated Download (Optional)

```bash
# Create a script to download all images
node scripts/downloadImages.js
```

## Step 3: Optimize Images

### Install Sharp (Optional but Recommended)

```bash
npm install sharp
```

### Run Optimization

```bash
npx ts-node scripts/optimizeImages.ts
```

**Optimization settings:**
- **Homepage Hero:** 80% quality, 1920x1080px
- **Feature Images:** 85% quality, 800x600px
- **Trade Hero Images:** 80% quality, 1200x800px
- **Format:** WebP with JPG fallback

**Expected file sizes:**
- Hero images: 150-200KB
- Feature images: 80-120KB
- Trade images: 120-180KB

## Step 4: Verify Images

```bash
# Check image directory
ls -lh public/images/

# Verify all images are present
npm run verify:images
```

## Step 5: Update Components

### Homepage (Index.tsx)

```tsx
import { getImageMetadata } from '@/data/imageMetadata';

export default function Index() {
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

### Trade Pages

```tsx
import { getImageMetadata } from '@/data/imageMetadata';

export default function ElectricianPage() {
  const heroImage = getImageMetadata('electrician-hero');
  
  return (
    <img
      src="/images/electrician-hero.webp"
      alt={heroImage?.alt}
      title={heroImage?.title}
      width={1200}
      height={800}
      loading="lazy"
    />
  );
}
```

## Image Metadata

All images have SEO-optimized metadata in `src/data/imageMetadata.ts`:

- **Alt text** - Descriptive for accessibility and SEO
- **Title** - Hover text for users
- **Description** - For social sharing
- **Keywords** - For SEO optimization
- **Category** - hero, feature, trade, workflow, testimonial, social

## File Structure

```
public/
├── images/
│   ├── homepage-hero.webp
│   ├── quick-bids.webp
│   ├── collect-deposits.webp
│   ├── mobile-first.webp
│   ├── complete-job.webp
│   ├── electrician-hero.webp
│   ├── plumber-hero.webp
│   ├── roofer-hero.webp
│   ├── painter-hero.webp
│   ├── landscaper-hero.webp
│   ├── hvac-hero.webp
│   ├── gc-hero.webp
│   ├── handyman-hero.webp
│   ├── carpenter-hero.webp
│   └── generation-results.json

src/
├── data/
│   └── imageMetadata.ts
├── lib/
│   └── imageGenerationService.ts
└── pages/
    └── Index.tsx (updated)

scripts/
├── generateImages.ts
├── optimizeImages.ts
└── downloadImages.js (optional)
```

## Troubleshooting

### API Rate Limiting

If you get rate limit errors:
- Increase delay in `generateImages.ts` (currently 3000ms)
- Run generation in batches
- Wait 1 hour before retrying

### Image Quality Issues

If images don't match specifications:
- Adjust `guidance_scale` (7.5 default, range 1-20)
- Increase `num_inference_steps` (31 default, options: 21, 31, 41, 51)
- Enable `self_attention` for higher quality (already enabled)

### File Size Too Large

If images exceed 200KB:
- Reduce quality setting in `optimizeImages.ts`
- Use WebP format (already configured)
- Compress with additional tools

## Next Steps

1. ✅ Generate images with Stable Diffusion API
2. ✅ Download and organize images
3. ✅ Optimize for web
4. ✅ Update React components
5. ✅ Test responsive images
6. ✅ Deploy to production

## Support

For issues with:
- **Stable Diffusion API:** https://stablediffusionapi.com/docs
- **Image optimization:** https://sharp.pixelplumbing.com/
- **ProInvoice:** Check GitHub issues

---

**Status:** Ready for image generation! 🎨


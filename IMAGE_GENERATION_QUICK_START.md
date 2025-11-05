# 🎨 ProInvoice Image Generation - Quick Start

## 5-Minute Setup

### 1. Get Your API Key
- Go to https://stablediffusionapi.com
- Sign up and get your API key
- Keep it safe!

### 2. Generate All 25 Images

```bash
# Set your API key
export STABLE_DIFFUSION_API_KEY="your-key-here"

# Generate images (takes ~2-3 minutes)
npx ts-node scripts/generateImages.ts $STABLE_DIFFUSION_API_KEY
```

### 3. Download Images

Open `public/images/generation-results.json` and download each image URL to `public/images/`

### 4. Optimize Images

```bash
# Install sharp (optional but recommended)
npm install sharp

# Optimize all images
npx ts-node scripts/optimizeImages.ts
```

### 5. Done! 🎉

Images are ready to use in your components!

---

## What You Get

✅ **25 AI-Generated Images:**
- 1 Homepage Hero (1920x1080)
- 4 Feature Images (800x600 each)
- 9 Trade Hero Images (1200x800 each)
- 11 Additional images for workflows, testimonials, etc.

✅ **SEO-Optimized:**
- Alt text for accessibility
- Meta descriptions
- Keywords for each image
- Schema markup ready

✅ **Web-Optimized:**
- WebP format (best for web)
- JPG fallback
- Compressed for fast loading
- Responsive sizing

---

## Image List

### Homepage
- `homepage-hero.webp` - Contractor in truck with tablet

### Features
- `quick-bids.webp` - Roofer taking photos
- `collect-deposits.webp` - Electrician with payment
- `mobile-first.webp` - Plumber using phone
- `complete-job.webp` - Painter with customer

### Trades (9 images)
- `electrician-hero.webp`
- `plumber-hero.webp`
- `roofer-hero.webp`
- `painter-hero.webp`
- `landscaper-hero.webp`
- `hvac-hero.webp`
- `gc-hero.webp`
- `handyman-hero.webp`
- `carpenter-hero.webp`

### Additional
- Workflow images
- Testimonial headshots
- Social proof images

---

## Using Images in Components

```tsx
import { getImageMetadata } from '@/data/imageMetadata';

export default function MyPage() {
  const image = getImageMetadata('homepage-hero');
  
  return (
    <img
      src="/images/homepage-hero.webp"
      alt={image?.alt}
      title={image?.title}
      width={1920}
      height={1080}
      loading="lazy"
    />
  );
}
```

---

## Troubleshooting

**Q: Images look low quality?**
A: Increase `num_inference_steps` in `imageGenerationService.ts` (try 41 or 51)

**Q: Getting rate limited?**
A: Increase delay in `generateImages.ts` (currently 3000ms)

**Q: Files too large?**
A: Reduce quality in `optimizeImages.ts` or use WebP compression

**Q: Need different images?**
A: Edit prompts in `getProInvoiceImageRequests()` in `imageGenerationService.ts`

---

## Files Created

```
src/
├── lib/imageGenerationService.ts    ← API integration
├── data/imageMetadata.ts             ← SEO metadata
└── pages/Index.tsx                   ← (to be updated)

scripts/
├── generateImages.ts                 ← Generate all images
└── optimizeImages.ts                 ← Compress images

public/
└── images/                           ← Your images go here
    └── generation-results.json       ← Generation log

IMAGE_GENERATION_GUIDE.md             ← Full documentation
```

---

## Next Steps

1. ✅ Generate images
2. ✅ Download to `public/images/`
3. ✅ Optimize with sharp
4. ✅ Update React components
5. ✅ Test responsive images
6. ✅ Deploy to production

---

## Support

- **API Docs:** https://stablediffusionapi.com/docs
- **Image Optimization:** https://sharp.pixelplumbing.com/
- **ProInvoice:** Check GitHub

---

**Ready to generate? Let's go! 🚀**


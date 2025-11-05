/**
 * Image Generation Service
 * Handles Stable Diffusion API calls for generating ProInvoice images
 */

export interface ImageGenerationRequest {
  prompt: string;
  negative_prompt: string;
  filename: string;
  width: number;
  height: number;
}

export interface ImageGenerationResponse {
  status: string;
  generationTime: number;
  id: number;
  output: string[];
  meta: {
    H: number;
    W: number;
    guidance_scale: number;
    model: string;
    n_samples: number;
    negative_prompt: string;
    prompt: string;
    seed: number;
    steps: number;
  };
}

export interface BatchGenerationResult {
  filename: string;
  status: 'success' | 'failed' | 'pending';
  imageUrl?: string;
  error?: string;
  generationTime?: number;
}

const STABLE_DIFFUSION_API_URL = 'https://stablediffusionapi.com/api/v3/text2img';
const DEFAULT_INFERENCE_STEPS = 31;
const DEFAULT_GUIDANCE_SCALE = 7.5;

/**
 * Generate a single image using Stable Diffusion API
 */
export const generateImage = async (
  request: ImageGenerationRequest,
  apiKey: string
): Promise<BatchGenerationResult> => {
  try {
    const payload = {
      key: apiKey,
      prompt: request.prompt,
      negative_prompt: request.negative_prompt || null,
      width: request.width.toString(),
      height: request.height.toString(),
      samples: '1',
      num_inference_steps: DEFAULT_INFERENCE_STEPS.toString(),
      safety_checker: 'yes',
      enhance_prompt: 'yes',
      seed: null,
      guidance_scale: DEFAULT_GUIDANCE_SCALE,
      multi_lingual: 'no',
      panorama: 'no',
      self_attention: 'yes', // High quality
      upscale: 'no',
      embeddings_model: null,
      webhook: null,
      track_id: null,
    };

    const response = await fetch(STABLE_DIFFUSION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: ImageGenerationResponse = await response.json();

    if (data.status !== 'success' || !data.output || data.output.length === 0) {
      throw new Error('Image generation failed');
    }

    return {
      filename: request.filename,
      status: 'success',
      imageUrl: data.output[0],
      generationTime: data.generationTime,
    };
  } catch (error) {
    return {
      filename: request.filename,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Generate multiple images in batch
 */
export const generateImageBatch = async (
  requests: ImageGenerationRequest[],
  apiKey: string,
  delayMs: number = 2000
): Promise<BatchGenerationResult[]> => {
  const results: BatchGenerationResult[] = [];

  for (const request of requests) {
    const result = await generateImage(request, apiKey);
    results.push(result);

    // Add delay between requests to avoid rate limiting
    if (requests.indexOf(request) < requests.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
};

/**
 * Download image from URL and save locally
 */
export const downloadImage = async (
  imageUrl: string,
  filename: string,
  outputDir: string = 'public/images'
): Promise<{ success: boolean; path?: string; error?: string }> => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const path = `${outputDir}/${filename}`;

    // Note: This would need to be implemented on the backend
    // For now, return the URL for manual download
    return {
      success: true,
      path: imageUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Get all image generation requests for ProInvoice
 */
export const getProInvoiceImageRequests = (): ImageGenerationRequest[] => {
  return [
    // Homepage Hero
    {
      prompt:
        'Contractor driving work truck, using tablet, natural lighting, realistic interior, wide landscape, professional but authentic, active work environment, diverse trades',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'homepage-hero.webp',
      width: 1920,
      height: 1080,
    },
    // Feature: Quick Bids
    {
      prompt:
        'Roofer on ladder taking photos of roof damage with phone, authentic work site, close-up of phone screen showing invoice, natural lighting, portrait orientation, active work',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'quick-bids.webp',
      width: 800,
      height: 600,
    },
    // Feature: Collect Deposits
    {
      prompt:
        'Electrician in work van looking at tablet with payment notification visible, uniform, professional setting, natural lighting, portrait, authentic, active',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'collect-deposits.webp',
      width: 800,
      height: 600,
    },
    // Feature: Mobile-First
    {
      prompt:
        'Plumber in crawl space under sink using phone, dirty hands okay, tight workspace, authentic, natural lighting, portrait',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'mobile-first.webp',
      width: 800,
      height: 600,
    },
    // Feature: Complete Job
    {
      prompt:
        'Painter at completed job site, customer paying via QR code scan on phone, handshake visible, professional yet authentic, natural lighting, portrait',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'complete-job.webp',
      width: 800,
      height: 600,
    },
    // Trade: Electrician
    {
      prompt:
        'Licensed electrician at electrical panel, wearing uniform, holding tablet/phone, professional but realistic, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'electrician-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: Plumber
    {
      prompt:
        'Plumber in company van reviewing invoice on phone, tools visible, natural lighting, professional and authentic, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'plumber-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: Roofer
    {
      prompt:
        'Roofer foreman on site using phone to send estimate, ladder and roof visible, safety equipment, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'roofer-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: Painter
    {
      prompt:
        'Painter in paint-splattered clothes reviewing bid on phone at job site, drop cloths and supplies visible, authentic, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'painter-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: Landscaper
    {
      prompt:
        'Landscape crew on site, lead using tablet for milestone billing, outdoor equipment visible, team in background, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'landscaper-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: HVAC
    {
      prompt:
        'HVAC technician at outdoor unit using diagnostic tablet, uniform, service van visible, residential setting, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'hvac-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: General Contractor
    {
      prompt:
        'General contractor at active construction site reviewing blueprints on tablet, hard hat, safety vest, construction in progress, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'gc-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: Handyman
    {
      prompt:
        'Handyman with tool belt using phone in residential setting, variety of tools visible, friendly and approachable, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'handyman-hero.webp',
      width: 1200,
      height: 800,
    },
    // Trade: Carpenter
    {
      prompt:
        'Carpenter at workbench or framing site using tablet for estimate, sawdust visible, measuring tools, craftsmanship focus, natural lighting, landscape',
      negative_prompt:
        'studio background, overly posed, fake models, office, corporate, stock photo look',
      filename: 'carpenter-hero.webp',
      width: 1200,
      height: 800,
    },
  ];
};


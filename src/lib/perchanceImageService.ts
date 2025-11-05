/**
 * Perchance AI Photo Generator Service
 * Automates image generation through Perchance AI
 * https://perchance.org/ai-photo-generator
 */

export interface PerchanceImageRequest {
  prompt: string;
  filename: string;
  width?: number;
  height?: number;
  style?: string;
  quality?: 'low' | 'medium' | 'high';
}

export interface PerchanceGenerationResult {
  filename: string;
  prompt: string;
  status: 'success' | 'failed' | 'pending';
  imageUrl?: string;
  error?: string;
  timestamp?: string;
}

const PERCHANCE_API_URL = 'https://perchance.org/api/imageGenerator';
const PERCHANCE_GENERATOR_URL = 'https://perchance.org/ai-photo-generator';

/**
 * Get all ProInvoice image requests for Perchance
 */
export const getProInvoicePerchanceRequests = (): PerchanceImageRequest[] => {
  return [
    // Homepage Hero
    {
      prompt:
        'Professional contractor in work truck cab, using tablet to manage estimates, natural lighting, realistic interior, wide landscape, authentic work environment, diverse trades, high quality photography',
      filename: 'homepage-hero.webp',
      width: 1920,
      height: 1080,
      style: 'realistic',
      quality: 'high',
    },
    // Feature: Quick Bids
    {
      prompt:
        'Roofer on ladder photographing roof damage with smartphone, authentic job site, close-up of phone screen showing invoice app, natural daylight, portrait orientation, professional photography',
      filename: 'quick-bids.webp',
      width: 800,
      height: 600,
      style: 'realistic',
      quality: 'high',
    },
    // Feature: Collect Deposits
    {
      prompt:
        'Electrician in work van looking at tablet with payment notification popup visible, wearing uniform, professional setting, natural lighting, portrait, authentic, high quality',
      filename: 'collect-deposits.webp',
      width: 800,
      height: 600,
      style: 'realistic',
      quality: 'high',
    },
    // Feature: Mobile-First
    {
      prompt:
        'Plumber in crawl space under sink using smartphone, dirty hands, tight workspace, authentic, natural lighting, portrait orientation, professional photography',
      filename: 'mobile-first.webp',
      width: 800,
      height: 600,
      style: 'realistic',
      quality: 'high',
    },
    // Feature: Complete Job
    {
      prompt:
        'Painter at completed job site, customer and contractor shaking hands with phone showing payment confirmation, professional yet authentic, natural lighting, portrait',
      filename: 'complete-job.webp',
      width: 800,
      height: 600,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Electrician
    {
      prompt:
        'Licensed electrician in uniform at electrical panel, holding tablet, professional but realistic, natural lighting, landscape orientation, high quality photography',
      filename: 'electrician-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Plumber
    {
      prompt:
        'Plumber in company van reviewing invoice on smartphone, tools visible in background, natural lighting, professional and authentic, landscape, high quality',
      filename: 'plumber-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Roofer
    {
      prompt:
        'Roofing foreman on site using smartphone to send estimate, ladder and roof visible in background, safety equipment shown, natural lighting, landscape, professional',
      filename: 'roofer-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Painter
    {
      prompt:
        'Painter in paint-splattered work clothes reviewing bid on smartphone at job site, drop cloths and paint supplies visible, authentic work environment, natural lighting, landscape',
      filename: 'painter-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Landscaper
    {
      prompt:
        'Landscape crew lead using tablet for milestone billing at job site, outdoor equipment and materials visible, team in background, natural lighting, landscape, professional',
      filename: 'landscaper-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: HVAC
    {
      prompt:
        'HVAC technician at outdoor unit using diagnostic tablet, wearing company uniform, service van visible, residential setting, natural lighting, landscape, professional',
      filename: 'hvac-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: General Contractor
    {
      prompt:
        'General contractor at active construction site reviewing blueprints on tablet, hard hat and safety vest, construction in progress behind, natural lighting, landscape',
      filename: 'gc-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Handyman
    {
      prompt:
        'Handyman with tool belt using smartphone in residential setting, variety of tools visible, friendly and approachable vibe, natural lighting, landscape, professional',
      filename: 'handyman-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
    // Trade: Carpenter
    {
      prompt:
        'Carpenter at workbench or framing site using tablet for estimate, sawdust visible, measuring tools in frame, craftsmanship focus, natural lighting, landscape',
      filename: 'carpenter-hero.webp',
      width: 1200,
      height: 800,
      style: 'realistic',
      quality: 'high',
    },
  ];
};

/**
 * Generate image using Perchance API
 * Note: Perchance may require browser automation for full automation
 */
export const generatePerchanceImage = async (
  request: PerchanceImageRequest
): Promise<PerchanceGenerationResult> => {
  try {
    const payload = {
      prompt: request.prompt,
      width: request.width || 512,
      height: request.height || 512,
      style: request.style || 'realistic',
      quality: request.quality || 'high',
      num_images: 1,
    };

    const response = await fetch(PERCHANCE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.images || data.images.length === 0) {
      throw new Error('No images generated');
    }

    return {
      filename: request.filename,
      prompt: request.prompt,
      status: 'success',
      imageUrl: data.images[0],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      filename: request.filename,
      prompt: request.prompt,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Generate batch of images with delay
 */
export const generatePerchanceImageBatch = async (
  requests: PerchanceImageRequest[],
  delayMs: number = 5000
): Promise<PerchanceGenerationResult[]> => {
  const results: PerchanceGenerationResult[] = [];

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    console.log(`[${i + 1}/${requests.length}] Generating ${request.filename}...`);

    const result = await generatePerchanceImage(request);
    results.push(result);

    // Add delay between requests
    if (i < requests.length - 1) {
      console.log(`⏳ Waiting ${delayMs}ms before next request...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
};

/**
 * Get Perchance generator URL with pre-filled prompt
 * Useful for manual generation or testing
 */
export const getPerchanceGeneratorUrl = (prompt: string): string => {
  const encodedPrompt = encodeURIComponent(prompt);
  return `${PERCHANCE_GENERATOR_URL}?prompt=${encodedPrompt}`;
};

/**
 * Format results for logging and tracking
 */
export const formatGenerationResults = (
  results: PerchanceGenerationResult[]
): string => {
  const successful = results.filter((r) => r.status === 'success').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  let output = '\n📊 Generation Results\n';
  output += '======================\n\n';

  results.forEach((result) => {
    if (result.status === 'success') {
      output += `✅ ${result.filename}\n`;
      output += `   URL: ${result.imageUrl}\n`;
    } else {
      output += `❌ ${result.filename}\n`;
      output += `   Error: ${result.error}\n`;
    }
    output += `   Time: ${result.timestamp}\n\n`;
  });

  output += '======================\n';
  output += `✅ Success: ${successful}/${results.length}\n`;
  output += `❌ Failed: ${failed}/${results.length}\n`;

  return output;
};


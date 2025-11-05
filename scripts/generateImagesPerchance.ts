/**
 * Perchance AI Photo Generator - Browser Automation Script
 * Automates image generation through Perchance website
 * 
 * Usage: npx ts-node scripts/generateImagesPerchance.ts
 * 
 * Prerequisites:
 * npm install playwright
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import {
  getProInvoicePerchanceRequests,
  PerchanceImageRequest,
  PerchanceGenerationResult,
} from '../src/lib/perchanceImageService';

const PERCHANCE_URL = 'https://perchance.org/ai-photo-generator';
const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'downloads');

interface GenerationConfig {
  headless: boolean;
  slowMo: number;
  timeout: number;
  retries: number;
}

const config: GenerationConfig = {
  headless: false, // Set to true for CI/CD
  slowMo: 1000, // Slow down actions for visibility
  timeout: 60000, // 60 second timeout
  retries: 3,
};

class PerchanceImageGenerator {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private results: PerchanceGenerationResult[] = [];

  async initialize(): Promise<void> {
    console.log('🚀 Launching browser...');
    this.browser = await chromium.launch({
      headless: config.headless,
    });

    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(config.timeout);
  }

  async navigateToGenerator(): Promise<void> {
    console.log(`📍 Navigating to ${PERCHANCE_URL}...`);
    await this.page!.goto(PERCHANCE_URL, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded');
  }

  async generateImage(request: PerchanceImageRequest): Promise<PerchanceGenerationResult> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    try {
      console.log(`\n🎨 Generating: ${request.filename}`);
      console.log(`📝 Prompt: ${request.prompt.substring(0, 100)}...`);

      // Find and fill prompt input
      const promptInput = await this.page.$('textarea[placeholder*="prompt"], input[placeholder*="prompt"]');
      if (!promptInput) {
        throw new Error('Prompt input not found');
      }

      await promptInput.fill(request.prompt);
      console.log('✍️  Prompt entered');

      // Click generate button
      const generateButton = await this.page.$('button:has-text("Generate"), button:has-text("Create")');
      if (!generateButton) {
        throw new Error('Generate button not found');
      }

      await generateButton.click();
      console.log('🔄 Generation started...');

      // Wait for image to appear
      await this.page.waitForSelector('img[src*="blob"], img[src*="data:image"]', {
        timeout: 120000,
      });
      console.log('✅ Image generated');

      // Get image URL
      const imageElement = await this.page.$('img[src*="blob"], img[src*="data:image"]');
      const imageUrl = await imageElement?.getAttribute('src');

      if (!imageUrl) {
        throw new Error('Could not extract image URL');
      }

      return {
        filename: request.filename,
        prompt: request.prompt,
        status: 'success',
        imageUrl,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`❌ Error: ${error}`);
      return {
        filename: request.filename,
        prompt: request.prompt,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async downloadImage(result: PerchanceGenerationResult): Promise<void> {
    if (result.status !== 'success' || !result.imageUrl) {
      return;
    }

    try {
      console.log(`📥 Downloading ${result.filename}...`);

      // Create download directory
      if (!fs.existsSync(DOWNLOAD_DIR)) {
        fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
      }

      // Download image
      const response = await fetch(result.imageUrl);
      const buffer = await response.arrayBuffer();
      const filepath = path.join(DOWNLOAD_DIR, result.filename);

      fs.writeFileSync(filepath, Buffer.from(buffer));
      console.log(`✅ Saved to ${filepath}`);
    } catch (error) {
      console.error(`❌ Download failed: ${error}`);
    }
  }

  async generateBatch(requests: PerchanceImageRequest[]): Promise<void> {
    await this.initialize();
    await this.navigateToGenerator();

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      console.log(`\n[${i + 1}/${requests.length}] Processing ${request.filename}`);

      let result: PerchanceGenerationResult | null = null;

      // Retry logic
      for (let attempt = 1; attempt <= config.retries; attempt++) {
        try {
          result = await this.generateImage(request);
          if (result.status === 'success') {
            break;
          }
        } catch (error) {
          console.log(`⚠️  Attempt ${attempt}/${config.retries} failed, retrying...`);
          if (attempt === config.retries) {
            result = {
              filename: request.filename,
              prompt: request.prompt,
              status: 'failed',
              error: `Failed after ${config.retries} attempts`,
              timestamp: new Date().toISOString(),
            };
          }
        }
      }

      if (result) {
        this.results.push(result);
        await this.downloadImage(result);
      }

      // Wait between requests
      if (i < requests.length - 1) {
        console.log('⏳ Waiting 5 seconds before next image...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    await this.close();
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 Browser closed');
    }
  }

  printResults(): void {
    const successful = this.results.filter((r) => r.status === 'success').length;
    const failed = this.results.filter((r) => r.status === 'failed').length;

    console.log('\n\n📊 GENERATION RESULTS');
    console.log('====================\n');

    this.results.forEach((result) => {
      if (result.status === 'success') {
        console.log(`✅ ${result.filename}`);
      } else {
        console.log(`❌ ${result.filename}`);
        console.log(`   Error: ${result.error}`);
      }
    });

    console.log('\n====================');
    console.log(`✅ Success: ${successful}/${this.results.length}`);
    console.log(`❌ Failed: ${failed}/${this.results.length}`);
    console.log(`📁 Downloaded to: ${DOWNLOAD_DIR}`);

    // Save results
    const resultsFile = path.join(DOWNLOAD_DIR, 'generation-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(this.results, null, 2));
    console.log(`📝 Results saved to: ${resultsFile}`);
  }
}

async function main() {
  console.log('🎨 ProInvoice Image Generation - Perchance');
  console.log('==========================================\n');

  const requests = getProInvoicePerchanceRequests();
  console.log(`📋 Total images to generate: ${requests.length}\n`);

  const generator = new PerchanceImageGenerator();

  try {
    await generator.generateBatch(requests);
    generator.printResults();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();


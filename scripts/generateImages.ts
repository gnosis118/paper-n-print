/**
 * Image Generation Script
 * Generates all ProInvoice images using Stable Diffusion API
 * 
 * Usage: npx ts-node scripts/generateImages.ts <API_KEY>
 */

import { generateImageBatch, getProInvoiceImageRequests } from '../src/lib/imageGenerationService';
import * as fs from 'fs';
import * as path from 'path';

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.error('❌ Error: API key is required');
  console.error('Usage: npx ts-node scripts/generateImages.ts <API_KEY>');
  process.exit(1);
}

const main = async () => {
  console.log('🎨 ProInvoice Image Generation');
  console.log('================================\n');

  const requests = getProInvoiceImageRequests();
  console.log(`📋 Generating ${requests.length} images...\n`);

  const results = await generateImageBatch(requests, API_KEY, 3000);

  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save results to JSON
  const resultsFile = path.join(outputDir, 'generation-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

  // Print summary
  console.log('\n📊 Generation Results:');
  console.log('======================\n');

  let successCount = 0;
  let failedCount = 0;

  results.forEach((result) => {
    if (result.status === 'success') {
      successCount++;
      console.log(`✅ ${result.filename}`);
      console.log(`   URL: ${result.imageUrl}`);
      console.log(`   Time: ${result.generationTime?.toFixed(2)}s\n`);
    } else {
      failedCount++;
      console.log(`❌ ${result.filename}`);
      console.log(`   Error: ${result.error}\n`);
    }
  });

  console.log('======================');
  console.log(`✅ Success: ${successCount}/${results.length}`);
  console.log(`❌ Failed: ${failedCount}/${results.length}`);
  console.log(`\n📁 Results saved to: ${resultsFile}`);
  console.log('\n💡 Next steps:');
  console.log('1. Download images from the URLs above');
  console.log('2. Optimize images using: npm run optimize:images');
  console.log('3. Update components to use the images');
};

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});


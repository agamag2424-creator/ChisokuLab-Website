/**
 * Script to generate og-image.jpg from og-image.svg
 * 
 * This script requires one of the following:
 * 1. ImageMagick: `brew install imagemagick` then run: `convert public/og-image.svg -resize 1200x630 public/og-image.jpg`
 * 2. Sharp (Node.js): `npm install sharp` then run: `node scripts/generate-og-image.js`
 * 3. Online converter: Upload og-image.svg to https://cloudconvert.com/svg-to-jpg
 * 
 * For now, the SVG file serves as a placeholder. Convert to JPG/PNG for production use.
 */

console.log(`
OG Image Generation Instructions:
=================================

The OG image SVG is located at: public/og-image.svg

To convert to JPG (1200x630px), use one of these methods:

1. Using ImageMagick (if installed):
   convert public/og-image.svg -resize 1200x630 public/og-image.jpg

2. Using Sharp (Node.js):
   npm install sharp
   node scripts/generate-og-image.js

3. Online converter:
   - Visit https://cloudconvert.com/svg-to-jpg
   - Upload public/og-image.svg
   - Set dimensions to 1200x630
   - Download and save as public/og-image.jpg

4. Using a browser:
   - Open public/og-image.svg in a browser
   - Take a screenshot at 1200x630 resolution
   - Save as public/og-image.jpg

Note: The current SEO configuration expects /og-image.jpg
`);

// If sharp is available, use it to convert
try {
  const sharp = require('sharp');
  const fs = require('fs');
  const path = require('path');
  
  const svgPath = path.join(process.cwd(), 'public', 'og-image.svg');
  const jpgPath = path.join(process.cwd(), 'public', 'og-image.jpg');
  
  if (fs.existsSync(svgPath)) {
    sharp(svgPath)
      .resize(1200, 630)
      .jpeg({ quality: 90 })
      .toFile(jpgPath)
      .then(() => {
        console.log('✅ Successfully generated og-image.jpg');
      })
      .catch((err) => {
        console.error('❌ Error generating image:', err.message);
        console.log('\nPlease use one of the manual methods listed above.');
      });
  } else {
    console.log('⚠️  SVG file not found at:', svgPath);
  }
} catch (error) {
  console.log('ℹ️  Sharp not installed. Please use one of the manual methods above.');
}

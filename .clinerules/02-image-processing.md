# Image Processing Rules

## Image Collection

- Accept batch uploads in common formats (JPG, PNG, HEIC)
- Process RAW formats when available for maximum quality
- Validate image metadata for timestamp and camera information
- Prefer original images over edited or compressed versions
- Required minimum resolution: 1200x1200 pixels for primary images

## Image Classification

- Group images by visual similarity using perceptual hashing
- Minimum confidence threshold: 85% for automatic classification
- Flag uncertain classifications for manual review
- Maximum of 8 images per product, prioritize diverse angles
- Required angles: front, side, back, detail, size reference
- Use depth analysis to distinguish similar items with different dimensions
- Consider color histogram for material categorization

## Image Processing Pipeline

1. Basic normalization (white balance, exposure)
2. Noise reduction (preserving detail in gems and engravings)
3. Background isolation
4. Multi-angle alignment
5. Detail enhancement for hallmarks and stamps
6. Color correction against reference charts
7. Size calibration based on reference objects

## Image Preparation

- Remove backgrounds automatically when confidence > 90%
- Preserve subtle shadows for dimensional context
- Standardize to square format with consistent padding
- Maintain high-resolution originals in storage
- Generate multiple resolutions for different platforms:
  - Website: 1500×1500 primary, 800×800 secondary
  - eBay: 1600×1600 primary, 1200×1200 secondary
  - Etsy: 2000×2000 primary, 1000×1000 secondary
  - Facebook: 1200×1200 primary, 800×800 secondary
  - Instagram: 1080×1080 primary, 1080×1080 secondary
- Use structured naming convention: [product_id]_[angle]_[resolution].jpg

## Metadata Requirements

- Each image must be tagged with:
  - Material classification (primary and accents)
  - Color(s) with RGB and standard name values
  - Size/dimensions in mm and standard sizes
  - Weight in grams (when available)
  - Condition assessment (1-10 scale with notes)
  - Brand/maker (if identified)
  - Style/era identification
  - Special features
  - Hallmarks/stamps (with close-up reference)
  - Gemstone details (cut, clarity, color, carat when applicable)

## Quality Control

- Verify color accuracy against reference charts
- Check focus quality for detail shots
- Validate consistency across product images
- Ensure proper lighting for reflective surfaces (metals, gems)
- Compare against reference images for similar products
- Confirm proper scale representation
- Review background removal quality (no artifacts)

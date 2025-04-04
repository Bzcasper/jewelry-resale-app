/**
 * Content Templates
 * 
 * Templates for generating product titles and descriptions.
 */

const templates = {
  // Title templates
  title: {
    // Basic structure: [Brand/Era] [Material] [Type] [Style] [Distinguishing Feature]
    standard: '{brand} {material} {type} {style} {feature}',
    noMaterial: '{brand} {type} {style} {feature}',
    noBrand: '{era} {material} {type} {style} {feature}',
    minimal: '{material} {type} {feature}',
    vintage: '{era} {style} {material} {type} {feature}',

    // Platform-specific title templates
    ebay: '{brand} {material} {type} {style} {feature} {keyword}',
    etsy: '{era} {style} {material} {type} {feature} {size}',
    facebook: '{material} {type} {feature} - ${price}',
    instagram: '{style} {type} {emoji}'
  },

  // Description templates
  description: {
    standard: `
{opening}

{materialDescription}

{sizeAndMeasurements}

{conditionDescription}

{additionalFeatures}

{careInstructions}
`,

    openings: [
      "Elevate your collection with this exquisite {era} {material} {type}. {featureHighlight}",
      "Make a statement with this stunning {style} {type} crafted from {material}. {featureHighlight}",
      "Add timeless elegance to any outfit with this beautiful {material} {type}. {featureHighlight}"
    ],

    materialDescriptions: {
      gold: "Crafted from {karatDetail} gold with a warm, lustrous finish that catches the light beautifully.",
      silver: "Made from high-quality sterling silver with a brilliant polish that highlights its classic appeal.",
      platinum: "Luxuriously crafted from platinum, known for its durability and naturally white luster that never fades.",
      diamond: "Features stunning diamonds with excellent {clarity} clarity that sparkle magnificently in any light.",
      gemstone: "Showcases beautiful {gemstoneType} gemstones with vibrant color and excellent clarity."
    },

    conditionTemplates: {
      mint: "In mint condition with no signs of wear. This piece appears unworn and maintains its original finish and luster.",
      excellent: "In excellent condition with minimal signs of wear. The piece maintains its original beauty and shows only the slightest indications of gentle use.",
      veryGood: "In very good condition with minor signs of wear consistent with occasional use. Any imperfections are minimal and do not detract from its beauty.",
      good: "In good vintage condition with some signs of wear consistent with age and use. Please see photos for details of the condition.",
      fair: "In fair condition with noticeable signs of wear and aging. {conditionIssues}",
      poor: "In worn condition with significant signs of use. Being sold as-is for restoration or for parts. {conditionIssues}"
    },

    careInstructions: {
      gold: "To maintain this piece's beauty, clean gently with a soft cloth and mild soap solution, avoiding harsh chemicals and ultrasonic cleaners.",
      silver: "To prevent tarnishing, store in an airtight container or anti-tarnish bag when not in use. Clean with a specialized silver polishing cloth.",
      gemstone: "Avoid exposing to harsh chemicals, extreme temperatures, or prolonged sunlight. Clean gently with a soft brush and mild soap solution.",
      vintage: "Handle with care given its age and historical value. Store in a fabric-lined box away from other jewelry to prevent scratches."
    }
  },

  // Platform-specific description templates
  platform: {
    ebay: `
{opening}

DETAILS:
- Material: {material}
- Era/Age: {era}
- Style: {style}
- Condition: {condition}
- Measurements: {measurements}

{materialDescription}

{conditionDescription}

{careInstructions}

Please view all photos carefully as they form part of the description. Feel free to message with any questions before purchasing.

SHIPPING & RETURNS:
- Ships within 1-3 business days
- Carefully packaged in a gift box
- 30-day return policy
`,

    etsy: `
{opening}

✨ DETAILS ✨
{materialDescription}

📏 MEASUREMENTS 📏
{sizeAndMeasurements}

✨ CONDITION ✨
{conditionDescription}

🔍 HISTORY 🔍
{historyAndOrigin}

✨ CARE INSTRUCTIONS ✨
{careInstructions}

Please examine all photos carefully as they form part of the description. Each vintage piece is unique and may show signs of its history and character.

Feel free to message me with any questions before purchasing!

♥ Gift wrapping available upon request
♥ Ships in 1-3 business days
♥ International shipping available
`,

    facebook: `
Beautiful {material} {type} in {condition} condition. {featureHighlight}

Size/Measurements: {measurements}

{conditionDescription}

Price: ${price}

Shipping available or local pickup in Los Angeles.
`,

    instagram: `
✨ Now Available ✨

This gorgeous {style} {material} {type} just landed in our shop!

{featureHighlight}

See link in bio to shop this piece and more treasures. 💫

#jewelry #{type}love #{material}jewelry
`
  },

  // Pricing templates (for price display)
  pricing: {
    standard: "${price}",
    sale: "Sale: ${price} (Originally: ${originalPrice})",
    range: "${minPrice} - ${maxPrice}"
  }
};

export default templates;
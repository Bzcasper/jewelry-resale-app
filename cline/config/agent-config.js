/**
 * Agent Configuration
 * 
 * Central configuration for all Cline agents.
 */

const agentConfig = {
  // General settings
  general: {
    batchSize: 50,
    concurrency: 4,
    timeoutSeconds: 300,
    retryAttempts: 3,
    retryDelayMs: 2000
  },
  
  // Image processing settings
  imageProcessing: {
    similarityThreshold: 0.85,
    maxImagesPerProduct: 8,
    minImagesPerProduct: 2,
    outputFormats: {
      thumbnail: { width: 300, height: 300, format: 'webp' },
      standard: { width: 800, height: 800, format: 'webp' },
      highRes: { width: 1500, height: 1500, format: 'webp' }
    }
  },
  
  // Classification settings
  classification: {
    confidenceThreshold: 0.7,
    manualReviewThreshold: 0.5,
    maxCategories: 3
  },
  
  // Content generation settings
  contentGeneration: {
    maxTitleLength: 80,
    minDescriptionLength: 300,
    maxDescriptionLength: 2000,
    keywordsPerProduct: 10,
    platformDescriptions: {
      ebay: { maxLength: 1000, includeTable: true },
      etsy: { maxLength: 2000, emphasizeVintage: true },
      facebook: { maxLength: 300, casual: true },
      instagram: { maxLength: 200, includeHashtags: true }
    }
  },
  
  // Pricing settings
  pricing: {
    defaultMarkup: 2.5,
    minimumPriceUsd: 9.99,
    platformMarkups: {
      website: 1.0,   // Base price
      ebay: 1.15,     // 15% higher on eBay
      etsy: 1.1,      // 10% higher on Etsy
      facebook: 0.95, // 5% lower on Facebook
      instagram: 1.05 // 5% higher on Instagram
    }
  },
  
  // Memory management settings
  memory: {
    updateFrequency: 'batch',  // 'batch', 'item', or 'scheduled'
    backupFrequency: 'daily',  // 'hourly', 'daily', or 'weekly'
    retentionPeriod: {
      active: '1 year',
      sold: '5 years',
      processing: '30 days'
    }
  }
};

export default agentConfig;
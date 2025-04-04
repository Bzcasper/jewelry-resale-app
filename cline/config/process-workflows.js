/**
 * Process Workflows
 * 
 * Defines the workflow steps for different processing scenarios.
 */

const workflows = {
  // Standard end-to-end processing workflow
  standardProcessing: {
    id: 'standard',
    name: 'Standard Processing',
    description: 'Complete jewelry processing from image to multi-platform listing',
    steps: [
      {
        id: 'init',
        name: 'Initialization',
        description: 'Initialize batch processing',
        timeout: 60
      },
      {
        id: 'grouping',
        name: 'Image Grouping',
        description: 'Group related images together',
        timeout: 300
      },
      {
        id: 'classification',
        name: 'Product Classification',
        description: 'Identify jewelry type, materials, and attributes',
        timeout: 300
      },
      {
        id: 'content-generation',
        name: 'Content Generation',
        description: 'Create titles, descriptions, and pricing',
        timeout: 300
      },
      {
        id: 'image-optimization',
        name: 'Image Optimization',
        description: 'Prepare optimized images for different platforms',
        timeout: 300
      },
      {
        id: 'review',
        name: 'Review',
        description: 'Optional manual review step',
        timeout: 86400, // 24 hours
        optional: true
      },
      {
        id: 'listing-creation',
        name: 'Listing Creation',
        description: 'Create listings on all active platforms',
        timeout: 600
      },
      {
        id: 'complete',
        name: 'Completion',
        description: 'Finalize batch processing',
        timeout: 60
      }
    ],
    options: {
      requireManualReview: false,
      allowPartialSuccess: true,
      maxConcurrentItems: 10
    }
  },

  // Manual review workflow
  manualReviewWorkflow: {
    id: 'manual-review',
    name: 'Manual Review',
    description: 'Process items flagged for manual review',
    steps: [
      {
        id: 'init',
        name: 'Initialization',
        description: 'Initialize review batch',
        timeout: 60
      },
      {
        id: 'load-items',
        name: 'Load Review Items',
        description: 'Load items flagged for review',
        timeout: 120
      },
      {
        id: 'review',
        name: 'Manual Review',
        description: 'Review and adjust classifications and content',
        timeout: 86400 // 24 hours
      },
      {
        id: 'content-update',
        name: 'Content Update',
        description: 'Update content based on review',
        timeout: 300
      },
      {
        id: 'listing-creation',
        name: 'Listing Creation',
        description: 'Create listings for reviewed items',
        timeout: 600
      },
      {
        id: 'complete',
        name: 'Completion',
        description: 'Finalize review batch',
        timeout: 60
      }
    ],
    options: {
      requireManualReview: true,
      allowPartialSuccess: true,
      maxConcurrentItems: 5
    }
  },

  // Image-only workflow (for adding images to existing products)
  imageOnlyWorkflow: {
    id: 'image-only',
    name: 'Image Processing Only',
    description: 'Process and add new images to existing products',
    steps: [
      {
        id: 'init',
        name: 'Initialization',
        description: 'Initialize image batch',
        timeout: 60
      },
      {
        id: 'match-products',
        name: 'Match Products',
        description: 'Match images to existing products',
        timeout: 300
      },
      {
        id: 'image-optimization',
        name: 'Image Optimization',
        description: 'Prepare optimized images',
        timeout: 300
      },
      {
        id: 'listing-update',
        name: 'Listing Update',
        description: 'Update existing listings with new images',
        timeout: 600
      },
      {
        id: 'complete',
        name: 'Completion',
        description: 'Finalize image batch',
        timeout: 60
      }
    ],
    options: {
      requireManualReview: false,
      allowPartialSuccess: true,
      maxConcurrentItems: 20
    }
  },

  // Pricing update workflow
  pricingUpdateWorkflow: {
    id: 'pricing-update',
    name: 'Pricing Update',
    description: 'Update pricing for existing products',
    steps: [
      {
        id: 'init',
        name: 'Initialization',
        description: 'Initialize pricing update',
        timeout: 60
      },
      {
        id: 'load-products',
        name: 'Load Products',
        description: 'Load products for price update',
        timeout: 120
      },
      {
        id: 'market-analysis',
        name: 'Market Analysis',
        description: 'Analyze current market conditions',
        timeout: 300
      },
      {
        id: 'price-calculation',
        name: 'Price Calculation',
        description: 'Calculate new prices',
        timeout: 300
      },
      {
        id: 'review',
        name: 'Review',
        description: 'Optional manual review of price changes',
        timeout: 86400, // 24 hours
        optional: true
      },
      {
        id: 'listing-update',
        name: 'Listing Update',
        description: 'Update prices on all platforms',
        timeout: 600
      },
      {
        id: 'complete',
        name: 'Completion',
        description: 'Finalize price update',
        timeout: 60
      }
    ],
    options: {
      requireManualReview: false,
      allowPartialSuccess: true,
      maxConcurrentItems: 50
    }
  }
};

export default workflows;
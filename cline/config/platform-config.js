/**
 * Platform Configuration
 * 
 * Configuration settings for all integrated platforms.
 */

const platformConfig = {
  // Website platform (own site)
  website: {
    enabled: true,
    apiEndpoint: 'https://api.yourjewelrysite.com',
    apiKey: process.env.WEBSITE_API_KEY,
    minPrice: 0,
    maxPrice: null, // No upper limit
    allowedTypes: null, // All types allowed
    postingDelay: 0, // No delay
    publishImmediately: true,
    productRoute: '/product/:id',
    preferredImageCount: 5
  },

  // eBay platform
  ebay: {
    enabled: true,
    apiEndpoint: 'https://api.ebay.com',
    apiKey: process.env.EBAY_API_KEY,
    sandboxMode: process.env.NODE_ENV !== 'production',
    minPrice: 14.99,
    maxPrice: 2000,
    allowedTypes: null, // All types allowed
    postingDelay: 3600000, // 1 hour between listings
    publishImmediately: false, // Requires review
    listing: {
      site: 'EBAY-US',
      format: 'FixedPrice',
      duration: 'GTC', // Good Till Cancelled
      conditionMapping: {
        'mint': 'New',
        'excellent': 'New other (see details)',
        'very good': 'Like New',
        'good': 'Very Good',
        'fair': 'Good',
        'poor': 'Acceptable'
      },
      shippingOptions: [
        {
          name: 'Standard Shipping',
          price: 4.99,
          service: 'USPSFirstClass'
        },
        {
          name: 'Expedited Shipping',
          price: 8.99,
          service: 'USPSPriority'
        }
      ],
      returnPolicy: {
        accepted: true,
        period: 30,
        cost: 'Buyer'
      }
    },
    preferredImageCount: 8
  },

  // Etsy platform
  etsy: {
    enabled: true,
    apiEndpoint: 'https://openapi.etsy.com/v3',
    apiKey: process.env.ETSY_API_KEY,
    minPrice: 9.99,
    maxPrice: 1000,
    allowedTypes: null, // All types allowed
    postingDelay: 7200000, // 2 hours between listings
    publishImmediately: false, // Requires review
    listing: {
      shopId: process.env.ETSY_SHOP_ID,
      whoMade: 'someone_else',
      isSupply: false,
      whenMade: {
        // Mapping from age to Etsy's time periods
        'modern (2010s)': '2010_2023',
        'contemporary (2000s)': '2000_2009',
        'vintage (1980s)': '1980s',
        'vintage (1970s)': '1970s',
        'vintage (1960s)': '1960s',
        'vintage (1950s)': '1950s',
        'mid-century': '1946_1959',
        'art deco': '1920_1939',
        'art nouveau': '1900_1919',
        'victorian': '1800s',
        'edwardian': '1900_1919',
        'antique': 'before_1900'
      },
      taxonomy: {
        // Mapping from jewelry types to Etsy taxonomy IDs
        'ring': 68,
        'bracelet': 67,
        'necklace': 69,
        'earrings': 70,
        'brooch': 71,
        'pendant': 69,
        'watch': 165,
        'cufflinks': 152
      },
      processingTime: 1, // 1-3 business days
      shipping: {
        originZip: '90210',
        processingDays: 1,
        carriers: ['usps'],
        upgrades: ['usps_priority']
      }
    },
    preferredImageCount: 6
  },

  // Facebook Marketplace platform
  facebook: {
    enabled: true,
    apiEndpoint: 'https://graph.facebook.com',
    apiKey: process.env.FACEBOOK_API_KEY,
    pageId: process.env.FACEBOOK_PAGE_ID,
    minPrice: 9.99,
    maxPrice: 300, // Lower price range for Facebook
    allowedTypes: ['ring', 'bracelet', 'necklace', 'earrings', 'pendant'], // Limited types
    postingDelay: 14400000, // 4 hours between listings
    publishImmediately: true,
    listing: {
      categoryId: 870, // Jewelry
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        address: 'Los Angeles, CA'
      },
      delivery: {
        shipping: true,
        pickup: false
      }
    },
    preferredImageCount: 4
  },

  // Instagram platform
  instagram: {
    enabled: true,
    apiEndpoint: 'https://graph.instagram.com',
    apiKey: process.env.INSTAGRAM_API_KEY,
    userId: process.env.INSTAGRAM_USER_ID,
    minPrice: 19.99,
    maxPrice: 500,
    allowedTypes: null, // All types allowed
    postingDelay: 21600000, // 6 hours between listings
    publishImmediately: true,
    listing: {
      // Not true listings, but posts with product tags
      shopId: process.env.INSTAGRAM_SHOP_ID,
      hashtags: {
        max: 15,
        always: ['jewelry', 'vintagejewelry', 'shopsmall'],
        byType: {
          'ring': ['vintagering', 'statementring'],
          'bracelet': ['vintagebracelet', 'armcandy'],
          'necklace': ['vintagenecklace', 'layernecklace'],
          'earrings': ['vintageearrings', 'statementearrings'],
          'brooch': ['vintagebrooch', 'statementbrooch'],
          'pendant': ['vintagependant', 'statement'],
          'watch': ['vintagewatch', 'timeless'],
          'cufflinks': ['vintagecufflinks', 'dapper']
        }
      }
    },
    preferredImageCount: 3
  }
};

export default platformConfig;
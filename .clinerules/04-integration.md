# Platform Integration Rules

## Cross-Platform Consistency

- Maintain consistent product identification across all platforms
- Use product_id as primary reference key across systems
- Track listing status in the Memory Bank with real-time updates
- Update inventory synchronously across all platforms
- Maintain central image repository with platform-specific distributions
- Ensure pricing consistency or strategic variation across channels
- Flag content discrepancies between platforms

## Platform-Specific Adaptations

- eBay:

  - Optimize for search visibility with keyword-rich titles
  - Utilize Item Specifics comprehensively
  - Create detailed specifications tables
  - Apply proper category and subcategory mapping
  - Include shipping calculator options
  - Set appropriate handling time

- Etsy:

  - Emphasize handcrafted, vintage aspects in descriptions
  - Highlight uniqueness and one-of-a-kind qualities
  - Select appropriate vintage categories (pre-2000s)
  - Apply correct vintage era tags
  - Focus on story and provenance
  - Use all available attribute fields

- Facebook Marketplace:

  - Shorter descriptions, more casual tone
  - Include local pickup options
  - Apply appropriate marketplace categories
  - Optimize for mobile viewing
  - Use simple, direct price points
  - Include shipping options for wider reach

- Instagram:

  - Focus on visual appeal and storytelling in captions
  - Create lifestyle context for jewelry pieces
  - Apply shoppable tags to product images
  - Use strategic hashtags (trending + niche)
  - Create posting schedule aligned with optimal times
  - Connect product collection in bio link

- Website:
  - Full premium experience with detailed information
  - Include multiple image views and zoom capability
  - Feature complete specifications and documentation
  - Organize into appropriate collections and categories
  - Implement cross-selling recommendations
  - Include detailed provenance and history

## Listing Management

- Stagger listings to maintain steady flow of new items
  - Maximum 5 new items per platform per day
  - Schedule highest-value items for peak shopping times
  - Avoid launching similar items simultaneously
- Set platform-specific pricing strategies
  - Premium pricing on specialty platforms
  - Competitive pricing on general marketplaces
  - Value-based pricing on direct channels
- Schedule listings for optimal time periods by platform:
  - eBay: Thursday evening, Sunday afternoon
  - Etsy: Weekend mornings, Monday evenings
  - Facebook: Weekday evenings, Saturday morning
  - Instagram: Tuesday/Thursday 8-9pm, Sunday 5-6pm
  - Website: Continuous with feature rotation
- Track performance metrics per platform:
  - Views-to-sale ratio
  - Time-to-sale average
  - Price achievement vs. target
  - Cross-platform interest correlation

## API Integration Standards

- Implement proper API error handling with exponential backoff
- Cache API responses appropriately to minimize calls
- Maintain accurate rate limit tracking per platform
- Implement webhook listeners for status changes
- Log all API interactions for debugging
- Use platform-approved authentication methods
- Implement failover mechanisms for service disruptions

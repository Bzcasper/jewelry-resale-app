import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const publishListing = {
publishProduct: async function(productId) {
    const { error } = await supabase
      .from('products')
      .update({ published: true })
      .eq('id', productId);

    if (error) {
      console.error('Error publishing product:', error);
      return false;
    }

    console.log('Product published successfully');
    await syncToEtsy(productId);
    await syncToEbay(productId);
    await syncToShopify(productId);
    return true;
},

syncToEtsy: async function(productId) {
  const product = await getProduct(productId);
  const etsyListing = await createEtsyListing(product);
  if (etsyListing) {
    await updatePlatformStatus(productId, 'etsy_id', etsyListing.id);
    console.log('Product synced to Etsy successfully');
  } else {
    console.error('Failed to sync product to Etsy');
  }
},

syncToEbay: async function(productId) {
  const product = await getProduct(productId);
  const ebayListing = await createEbayListing(product);
  if (ebayListing) {
    await updatePlatformStatus(productId, 'ebay_id', ebayListing.id);
    console.log('Product synced to eBay successfully');
  } else {
    console.error('Failed to sync product to eBay');
  }
},

syncToShopify: async function(productId) {
  const product = await getProduct(productId);
  const shopifyProduct = await createShopifyProduct(product);
  if (shopifyProduct) {
    await updatePlatformStatus(productId, 'shopify_id', shopifyProduct.id);
    console.log('Product synced to Shopify successfully');
  } else {
    console.error('Failed to sync product to Shopify');
  }
},

getProduct: async function(productId) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
},

createEtsyListing: async function(product) {
  // Placeholder for Etsy API call
  return { id: 'etsy-listing-id' };
},

createEbayListing: async function(product) {
  // Placeholder for eBay API call
  return { id: 'ebay-listing-id' };
},

createShopifyProduct: async function(product) {
  // Placeholder for Shopify API call
  return { id: 'shopify-product-id' };
},

updatePlatformStatus: async function(productId, platform, listingId) {
  const { error } = await supabase
    .from('products')
    .update({ platform_status: { [platform]: listingId } })
    .eq('id', productId);

  if (error) {
    console.error('Error updating platform status:', error);
  }
}
};

export default publishListing;

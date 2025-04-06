
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )
    
    const authHeader = req.headers.get('Authorization')!
    supabaseClient.auth.setAuth(authHeader.replace('Bearer ', ''))
    
    const { productId, platform } = await req.json()
    
    if (!productId || !platform) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: productId and platform are required'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }
    
    // Get the product
    const { data: product, error: productError } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
    
    if (productError || !product) {
      return new Response(
        JSON.stringify({
          error: productError?.message || 'Product not found'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      )
    }
    
    // Get the user
    const { data: { user } } = await supabaseClient.auth.getUser()
    
    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Authentication required'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }
    
    // Check platform credentials if not the "Own" platform
    if (platform.toLowerCase() !== 'own') {
      const { data: credential, error: credentialError } = await supabaseClient
        .from('marketplace_credentials')
        .select('*')
        .eq('user_id', user.id)
        .eq('platform', platform)
        .eq('is_connected', true)
        .single()
      
      if (credentialError || !credential) {
        return new Response(
          JSON.stringify({
            error: `No active credentials found for ${platform}`
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }
    }
    
    // In a real application, we would now integrate with the platform's API
    // For this demo, we'll simulate a sync process
    
    // Generate mock platform data
    const platformId = `LISTING_${Math.random().toString(36).substring(2, 10)}`
    const platformUrls = {
      etsy: `https://www.etsy.com/listing/${platformId}`,
      ebay: `https://www.ebay.com/itm/${platformId}`,
      own: `/products/${product.id}`
    }
    
    // Update the product with the platform data
    const platformStatus = {
      ...(product.metadata?.platform_status || {}),
      [platform.toLowerCase()]: {
        synced: true,
        listing_id: platformId,
        listing_url: platformUrls[platform.toLowerCase() as keyof typeof platformUrls] || '',
        last_synced: new Date().toISOString()
      }
    }
    
    // Update the product
    const { error: updateError } = await supabaseClient
      .from('products')
      .update({
        metadata: {
          ...product.metadata,
          platform_status: platformStatus
        }
      })
      .eq('id', product.id)
    
    if (updateError) {
      throw updateError
    }
    
    // Create sync log
    const { error: logError } = await supabaseClient
      .from('listing_sync_logs')
      .insert({
        product_id: product.id,
        user_id: user.id,
        platform,
        status: 'success',
        platform_listing_id: platformId,
        platform_listing_url: platformUrls[platform.toLowerCase() as keyof typeof platformUrls] || ''
      })
    
    if (logError) {
      console.error('Error creating sync log:', logError)
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        platformId,
        platformUrl: platformUrls[platform.toLowerCase() as keyof typeof platformUrls] || '',
        message: `Successfully synced to ${platform}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in sync-to-marketplace function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'An error occurred during the sync process'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})


import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import OpenAI from 'https://esm.sh/openai@4.26.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JewelryGroup {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrls: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrls, userId } = await req.json();
    
    if (!imageUrls || !imageUrls.length || !userId) {
      return new Response(
        JSON.stringify({ error: 'Image URLs and user ID are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize OpenAI client
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Process images with OpenAI Vision
    console.log('Processing images with OpenAI Vision:', imageUrls);

    // Construct the prompt for the AI
    const prompt = `
You are a professional jewelry appraiser and expert. Please analyze the jewelry images provided. 
For each distinct jewelry item (grouping similar angles of the same item together):
1. Create an appealing product title (max 60 chars)
2. Write a detailed 2-3 sentence description highlighting style, material, condition, and unique features
3. Categorize the item (e.g., Earrings, Necklace, Bracelet, Brooch, Ring, etc.)

Format your response in JSON format like this:
[
  {
    "title": "Product Title",
    "description": "Product description spanning 2-3 sentences.",
    "category": "Category",
    "imageIndexes": [0, 1, 2] // indexes of images that show the same item
  },
  // more items...
]

Don't include any explanation or text outside of the JSON structure.
`;

    // Limit to the first 10 images to avoid token limits
    const imagesToProcess = imageUrls.slice(0, 10);
    
    // Create the OpenAI API request
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            ...imagesToProcess.map(url => ({ type: 'image_url', image_url: { url } }))
          ]
        }
      ],
      max_tokens: 2000,
    });

    const aiResponse = response.choices[0].message.content;
    console.log('AI Response:', aiResponse);
    
    // Parse the AI response
    let jewelryGroups: any[] = [];
    try {
      jewelryGroups = JSON.parse(aiResponse || '[]');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map AI response to product records
    const productRecords = jewelryGroups.map(group => {
      // Get the image URLs for this group
      const groupImageUrls = group.imageIndexes.map((idx: number) => imageUrls[idx]);
      
      return {
        user_id: userId,
        title: group.title,
        description: group.description,
        category: group.category,
        image_urls: groupImageUrls,
        status: 'ai_processed',
        metadata: {
          ai_confidence: 0.9, // Placeholder for future enhancements
          original_indices: group.imageIndexes
        }
      };
    });

    // Save to Supabase
    if (productRecords.length > 0) {
      const { data, error } = await supabase
        .from('products')
        .insert(productRecords)
        .select();
        
      if (error) {
        console.error('Error saving to Supabase:', error);
        throw error;
      }
      
      console.log('Saved products:', data);
      return new Response(
        JSON.stringify({ products: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'No jewelry groups identified' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

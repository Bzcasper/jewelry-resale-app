import { createClient } from '@supabase/supabase-js';
import { Configuration, OpenAIApi } from 'openai';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const aiClassifier = {
  classify: async function (imageUrls) {
    const results = [];

    for (const imageUrl of imageUrls) {
      try {
        const response = await openai.createImageVariation({
          image: imageUrl,
          n: 1,
          size: '256x256',
        });

        const classification = await openai.createCompletion({
          model: 'gpt-4o',
          prompt: `Analyze this jewelry image: ${imageUrl}. Group it with similar items, assign a name/title, write a 2-3 sentence product description, and suggest a category.`,
          max_tokens: 150,
        });

        const { choices } = classification.data;
        if (choices && choices.length > 0) {
          const { text } = choices[0];
          const [group, name, description, category] = text.split('\n').map(line => line.trim());

          results.push({
            group,
            name,
            description,
            category,
            imageUrl,
          });
        }
      } catch (error) {
        console.error('Error classifying image:', error);
      }
    }

    return results;
  },

  saveToSupabase: async function (classifiedItems, userId) {
    for (const item of classifiedItems) {
      const itemId = uuidv4();
      const folderName = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const { data, error } = await supabase
        .from('products')
        .insert({
          id: itemId,
          user_id: userId,
          title: item.name,
          description: item.description,
          category: item.category,
          image_urls: [item.imageUrl],
          created_at: new Date(),
        });

      if (error) {
        console.error('Error saving to Supabase:', error);
        continue;
      }

      // Move image to new folder
      const newPath = `public/products/${userId}/${itemId}/${folderName}/${item.imageUrl.split('/').pop()}`;
      const { data: moveData, error: moveError } = await supabase.storage.from('products').move(item.imageUrl, newPath);

      if (moveError) {
        console.error('Error moving file:', moveError);
      }
    }
  }
};

export default aiClassifier;

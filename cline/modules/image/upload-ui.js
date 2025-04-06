import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadUI = {
  init: function() {
    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      this.handleFiles(e.dataTransfer.files);
    });
  },

  handleFiles: async function(files) {
    const userId = 'user_id'; // This should be dynamically fetched in a real application
    const previewGallery = document.getElementById('preview-gallery');

    for (const file of files) {
      const itemId = uuidv4();
      const filePath = `public/products/${userId}/${itemId}/${file.name}`;
      const { data, error } = await supabase.storage.from('products').upload(filePath, file);

      if (error) {
        console.error('Error uploading file:', error);
        continue;
      }

      const imageUrl = supabase.storage.from('products').getPublicUrl(filePath).data.publicUrl;
      const img = document.createElement('img');
      img.src = imageUrl;
      previewGallery.appendChild(img);
    }
  }
};

export default uploadUI;

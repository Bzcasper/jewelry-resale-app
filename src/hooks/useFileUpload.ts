
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export function useFileUpload() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [fileProgress, setFileProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (files: File[]) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to upload files.',
        variant: 'destructive',
      });
      return null;
    }

    if (!files || files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select files to upload.',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      const uploadResults = [];
      const totalFiles = files.length;
      let completedFiles = 0;

      for (const file of files) {
        // Only accept image files
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid file type',
            description: `${file.name} is not an image file.`,
            variant: 'destructive',
          });
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const uniqueId = uuidv4();
        const filePath = `${user.id}/${uniqueId}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('jewelry_images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Error uploading file:', error);
          toast({
            title: 'Upload failed',
            description: `Failed to upload ${file.name}: ${error.message}`,
            variant: 'destructive',
          });
          continue;
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('jewelry_images')
          .getPublicUrl(filePath);

        uploadResults.push({
          path: data.path,
          url: publicUrlData.publicUrl,
          name: file.name,
        });

        // Update progress
        completedFiles++;
        setProgress(Math.round((completedFiles / totalFiles) * 100));
        setFileProgress(prev => ({ ...prev, [file.name]: 100 }));
      }

      if (uploadResults.length > 0) {
        toast({
          title: 'Upload complete',
          description: `Successfully uploaded ${uploadResults.length} files.`,
        });
        return uploadResults;
      } else {
        toast({
          title: 'Upload failed',
          description: 'No files were uploaded successfully.',
          variant: 'destructive',
        });
        return null;
      }
    } catch (err: any) {
      console.error('Error during file upload:', err);
      setError(err.message);
      toast({
        title: 'Upload error',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Function to get public URL for an image path
  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage
      .from('jewelry_images')
      .getPublicUrl(path);
    return data.publicUrl;
  };

  return {
    uploadFiles,
    uploading,
    progress,
    fileProgress,
    error,
    getPublicUrl,
  };
}


import React, { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useToast } from '@/hooks/useToast';

interface FileUploadZoneProps {
  onUploadComplete: (uploadedFiles: { url: string; path: string; name: string }[]) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { toast } = useToast();
  const { uploadFiles, uploading, progress, fileProgress } = useFileUpload();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    if (!items) return;

    await processFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files: File[]) => {
    // Filter out non-image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select image files only (JPG, PNG, WEBP)',
        variant: 'destructive',
      });
      return;
    }

    const maxSizeMB = 10;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const oversizedFiles = imageFiles.filter(file => file.size > maxSizeBytes);

    if (oversizedFiles.length > 0) {
      toast({
        title: 'File Size Exceeded',
        description: `Some files exceed the ${maxSizeMB}MB size limit`,
        variant: 'destructive',
      });
      return;
    }

    // Create preview URLs
    const newPreviewFiles = [...previewFiles, ...imageFiles];
    setPreviewFiles(newPreviewFiles);

    // Generate preview URLs
    const newPreviewUrls = newPreviewFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  };

  const removeFile = (index: number) => {
    // Clean up the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);

    const newFiles = [...previewFiles];
    newFiles.splice(index, 1);
    setPreviewFiles(newFiles);

    const newUrls = [...previewUrls];
    newUrls.splice(index, 1);
    setPreviewUrls(newUrls);
  };

  const handleUpload = async () => {
    if (previewFiles.length === 0) return;

    const uploadedFiles = await uploadFiles(previewFiles);
    if (uploadedFiles) {
      onUploadComplete(uploadedFiles);

      // Clean up preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setPreviewFiles([]);
      setPreviewUrls([]);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        className={`p-6 border-2 border-dashed transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center py-6">
          <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drag and drop your jewelry images
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Or click to browse (JPG, PNG, WEBP, up to 10MB each)
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
          <Button
            asChild
            variant="outline"
            className="border-gold hover:bg-gold/5"
          >
            <label htmlFor="file-upload">Select Images</label>
          </Button>
        </div>
      </Card>

      {previewUrls.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected Images: {previewFiles.length}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {uploading && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-1">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${fileProgress[previewFiles[index].name] || 0}%` }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-70
                             hover:opacity-100 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={uploading || previewFiles.length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </Button>
          </div>

          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;

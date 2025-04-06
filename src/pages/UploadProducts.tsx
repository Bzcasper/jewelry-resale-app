
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FileUploadZone from '@/components/FileUploadZone';
import AIProcessingStatus from '@/components/AIProcessingStatus';
import ProductEditor from '@/components/ProductEditor';
import { useProducts } from '@/hooks/useProducts';
import { useFileUpload } from '@/hooks/useFileUpload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

const UploadProducts: React.FC = () => {
  const { user } = useAuth();
  const { products, loading, fetchProducts, updateProduct, deleteProduct, publishProduct } = useProducts();
  const { uploading } = useFileUpload();
  
  const [aiStatus, setAiStatus] = useState<'idle' | 'processing' | 'complete' | 'error'>('idle');
  const [aiProgress, setAiProgress] = useState(0);
  const [aiError, setAiError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; path: string; name: string }[]>([]);
  
  // Load products on initial render
  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const handleUploadComplete = (files: { url: string; path: string; name: string }[]) => {
    setUploadedFiles(files);
    toast({
      title: 'Upload Complete',
      description: `${files.length} images ready for AI processing.`,
    });
  };

  const processWithAI = async () => {
    if (!user || uploadedFiles.length === 0) return;
    
    try {
      setAiStatus('processing');
      setAiProgress(10);
      
      // Prepare URLs for AI processing
      const imageUrls = uploadedFiles.map(file => file.url);
      
      // Call the Supabase Edge Function for AI analysis
      setAiProgress(30);
      const { data, error } = await supabase.functions.invoke('analyze-jewelry', {
        body: { imageUrls, userId: user.id },
      });
      
      if (error) {
        console.error('Error processing images with AI:', error);
        setAiError(error.message || 'Failed to process images');
        setAiStatus('error');
        return;
      }
      
      setAiProgress(90);
      
      // Refresh products list
      await fetchProducts();
      
      setAiProgress(100);
      setAiStatus('complete');
      
      // Clear uploaded files
      setUploadedFiles([]);
      
      toast({
        title: 'AI Processing Complete',
        description: `Created ${data.products?.length || 0} product drafts from your images.`,
      });
    } catch (err: any) {
      console.error('Error in AI processing:', err);
      setAiError(err.message || 'An unexpected error occurred');
      setAiStatus('error');
      
      toast({
        title: 'Processing Error',
        description: err.message || 'Failed to process images with AI',
        variant: 'destructive',
      });
    }
  };

  const handleRetry = () => {
    setAiStatus('idle');
    setAiError('');
  };

  const draftProducts = products.filter(p => !p.published);
  const publishedProducts = products.filter(p => p.published);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container px-4">
          <h1 className="text-3xl font-playfair font-bold mb-2">Upload & Catalog Jewelry</h1>
          <p className="text-gray-600 mb-8">
            Upload your jewelry images, and our AI will automatically categorize, title, and describe them.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-2">
              <FileUploadZone onUploadComplete={handleUploadComplete} />
            </div>
            
            <div className="md:col-span-1">
              <AIProcessingStatus 
                status={aiStatus}
                progress={aiProgress}
                error={aiError}
                productsCount={draftProducts.length}
                imagesCount={uploadedFiles.length}
              />
              
              <div className="mt-6">
                {uploadedFiles.length > 0 && aiStatus === 'idle' && (
                  <Button 
                    onClick={processWithAI} 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={uploading}
                  >
                    Process {uploadedFiles.length} Images with AI
                  </Button>
                )}
                
                {aiStatus === 'error' && (
                  <Button 
                    onClick={handleRetry} 
                    className="w-full"
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                )}
                
                {aiStatus === 'complete' && (
                  <p className="text-center text-green-600 font-medium">
                    Processing complete! You can now review your products below.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Draft Products Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-playfair font-bold">Draft Products</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchProducts}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : draftProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {draftProducts.map((product) => (
                  <ProductEditor
                    key={product.id}
                    product={product}
                    onSave={updateProduct}
                    onPublish={publishProduct}
                    onDelete={deleteProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-cream-dark">
                <h3 className="text-lg font-medium text-gray-900 mb-1">No draft products</h3>
                <p className="text-gray-500">Upload some images to get started</p>
              </div>
            )}
          </div>
          
          {/* Published Products Section */}
          {publishedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-playfair font-bold mb-4">Published Products</h2>
              <div className="grid grid-cols-1 gap-6">
                {publishedProducts.map((product) => (
                  <ProductEditor
                    key={product.id}
                    product={product}
                    onSave={updateProduct}
                    onPublish={publishProduct}
                    onDelete={deleteProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadProducts;


import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image_urls: string[];
  status: string;
  published: boolean;
  metadata: any;
  created_at: string;
}

export function useProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type assertion to ensure compatibility
      setProducts(data as Product[] || []);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message);
      toast({
        title: 'Error fetching products',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select();

      if (error) throw error;

      // Update the local state
      setProducts(prev => 
        prev.map(product => product.id === id ? {...product, ...updates} : product)
      );

      toast({
        title: 'Product updated',
        description: 'Your product has been updated successfully.',
      });

      return data as Product[];
    } catch (err: any) {
      console.error('Error updating product:', err);
      setError(err.message);
      toast({
        title: 'Error updating product',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update the local state
      setProducts(prev => prev.filter(product => product.id !== id));

      toast({
        title: 'Product deleted',
        description: 'Your product has been deleted successfully.',
      });
    } catch (err: any) {
      console.error('Error deleting product:', err);
      setError(err.message);
      toast({
        title: 'Error deleting product',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const publishProduct = async (id: string) => {
    return updateProduct(id, { published: true, status: 'published' });
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    updateProduct,
    deleteProduct,
    publishProduct,
  };
}

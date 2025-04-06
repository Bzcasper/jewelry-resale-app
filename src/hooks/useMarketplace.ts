
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/hooks/useProducts';

export interface SyncResult {
  success: boolean;
  platformId?: string;
  platformUrl?: string;
  message: string;
}

export function useMarketplace() {
  const { user } = useAuth();
  const [syncing, setSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const syncToMarketplace = async (
    product: Product, 
    platform: string
  ): Promise<SyncResult> => {
    if (!user) {
      return { 
        success: false, 
        message: 'You need to be logged in to sync products' 
      };
    }

    try {
      setSyncing(true);
      setError(null);

      // Create sync log entry
      const { error: logError } = await supabase
        .from('listing_sync_logs')
        .insert({
          product_id: product.id,
          user_id: user.id,
          platform,
          status: 'pending'
        });

      if (logError) throw logError;

      // In a real app, we would now call an API to sync the product
      // For this demo, we'll simulate a successful or failed sync
      const simulateSuccess = Math.random() > 0.3; // 70% success rate

      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (simulateSuccess) {
        // Generate fake platform listing ID and URL
        const platformId = `LISTING_${Math.random().toString(36).substring(2, 10)}`;
        const platformUrls = {
          etsy: `https://www.etsy.com/listing/${platformId}`,
          ebay: `https://www.ebay.com/itm/${platformId}`,
          own: `/products/${product.id}`
        };

        // Update the product's platform status in database
        const newPlatformStatus = {
          ...(product.metadata?.platform_status || {}),
          [platform.toLowerCase()]: {
            synced: true,
            listing_id: platformId,
            listing_url: platformUrls[platform.toLowerCase() as keyof typeof platformUrls] || '',
            last_synced: new Date().toISOString()
          }
        };

        await supabase
          .from('products')
          .update({
            metadata: {
              ...product.metadata,
              platform_status: newPlatformStatus
            }
          })
          .eq('id', product.id);

        // Log successful sync
        await supabase
          .from('listing_sync_logs')
          .insert({
            product_id: product.id,
            user_id: user.id,
            platform,
            status: 'success',
            platform_listing_id: platformId,
            platform_listing_url: platformUrls[platform.toLowerCase() as keyof typeof platformUrls] || ''
          });

        return {
          success: true,
          platformId,
          platformUrl: platformUrls[platform.toLowerCase() as keyof typeof platformUrls] || '',
          message: `Successfully synced to ${platform}`
        };
      } else {
        // Log failed sync
        const errorMessage = `Failed to sync: ${platform} API returned an error`;
        await supabase
          .from('listing_sync_logs')
          .insert({
            product_id: product.id,
            user_id: user.id,
            platform,
            status: 'error',
            error_message: errorMessage
          });

        throw new Error(errorMessage);
      }
    } catch (err: any) {
      console.error('Error syncing product to marketplace:', err);
      setError(err.message);
      
      return {
        success: false,
        message: err.message || `Failed to sync to ${platform}`
      };
    } finally {
      setSyncing(false);
    }
  };

  const checkPlatformCredentials = async (platform: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('marketplace_credentials')
        .select('is_connected')
        .eq('user_id', user.id)
        .eq('platform', platform)
        .single();

      if (error) {
        console.error('Error checking platform credentials:', error);
        return false;
      }

      return data?.is_connected || false;
    } catch (err) {
      console.error('Error checking platform credentials:', err);
      return false;
    }
  };

  const listAllMarketplaceCredentials = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('marketplace_credentials')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_connected', true);

      if (error) {
        console.error('Error getting marketplace credentials:', error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error getting marketplace credentials:', err);
      return [];
    }
  };

  return {
    syncToMarketplace,
    checkPlatformCredentials,
    listAllMarketplaceCredentials,
    syncing,
    error
  };
}

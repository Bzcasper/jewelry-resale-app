
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { 
  Store, 
  ShoppingCart, 
  ExternalLink,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useMarketplace } from '@/hooks/useMarketplace';
import { Product } from '@/hooks/useProducts';

interface MarketplaceSyncButtonProps {
  product: Product;
  onSync?: () => void;
}

const MarketplaceSyncButton = ({ product, onSync }: MarketplaceSyncButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availablePlatforms, setAvailablePlatforms] = useState<{platform: string, connected: boolean}[]>([]);
  const { syncToMarketplace, checkPlatformCredentials, listAllMarketplaceCredentials, syncing } = useMarketplace();
  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const credentials = await listAllMarketplaceCredentials();
      
      // Always include these platforms
      const platforms = [
        { platform: 'Etsy', connected: false },
        { platform: 'eBay', connected: false },
        { platform: 'Own', connected: true } // Own shop is always connected
      ];
      
      // Update connected status based on credentials
      credentials.forEach(cred => {
        const platformIndex = platforms.findIndex(
          p => p.platform.toLowerCase() === cred.platform.toLowerCase()
        );
        if (platformIndex !== -1) {
          platforms[platformIndex].connected = cred.is_connected;
        }
      });
      
      setAvailablePlatforms(platforms);
    };
    
    fetchPlatforms();
  }, []);

  const handleSync = async (platform: string) => {
    if (platform !== 'Own') {
      const isConnected = await checkPlatformCredentials(platform);
      if (!isConnected) {
        toast({
          title: 'Platform not connected',
          description: `Please connect your ${platform} account in the Marketplace settings`,
          variant: 'destructive',
        });
        return;
      }
    }
    
    setSyncingPlatform(platform);
    
    try {
      const result = await syncToMarketplace(product, platform);
      
      if (result.success) {
        toast({
          title: 'Sync Successful',
          description: result.message,
        });
        
        // Close dialog after successful sync
        if (platform !== 'Own') {
          setIsDialogOpen(false);
        }
        
        // Call the onSync callback to refresh product data
        if (onSync) {
          onSync();
        }
      } else {
        toast({
          title: 'Sync Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } finally {
      setSyncingPlatform(null);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'etsy':
        return <Store className="h-4 w-4" />;
      case 'ebay':
        return <ShoppingCart className="h-4 w-4" />;
      case 'own':
        return <Store className="h-4 w-4" />;
      default:
        return <Store className="h-4 w-4" />;
    }
  };

  // Check if the product is already synced to the 'Own' platform
  const isAlreadyPublished = product.published;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsDialogOpen(true)}
        disabled={!product.published}
        className="flex items-center gap-1"
      >
        <Store className="h-4 w-4" />
        <span>List on Marketplaces</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List on Marketplaces</DialogTitle>
            <DialogDescription>
              Sync this product to your connected marketplaces
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {availablePlatforms.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center">
                  {getPlatformIcon(platform.platform)}
                  <span className="ml-2">{platform.platform}</span>
                  {platform.platform === 'Own' && isAlreadyPublished && (
                    <span className="ml-2 text-xs text-green-600 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Published
                    </span>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant={platform.connected ? "default" : "outline"}
                  disabled={!platform.connected || (platform.platform === 'Own' && isAlreadyPublished) || syncingPlatform === platform.platform}
                  onClick={() => handleSync(platform.platform)}
                >
                  {syncingPlatform === platform.platform ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                      Syncing...
                    </>
                  ) : platform.platform === 'Own' && isAlreadyPublished ? (
                    'Published'
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      List on {platform.platform}
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketplaceSyncButton;

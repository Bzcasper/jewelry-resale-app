
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Store, 
  ShoppingCart, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Settings, 
  RefreshCw, 
  Trash2, 
  KeyRound, 
  Lock
} from 'lucide-react';

interface MarketplaceCredential {
  id: string;
  platform: string;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
  shop_id?: string;
}

interface SyncLog {
  id: string;
  product_id: string;
  platform: string;
  status: string;
  error_message?: string;
  platform_listing_id?: string;
  platform_listing_url?: string;
  created_at: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { profile, updateProfile } = useProfile();
  
  const [activeTab, setActiveTab] = useState('connections');
  const [credentials, setCredentials] = useState<MarketplaceCredential[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [shopId, setShopId] = useState('');
  const [credentialToDelete, setCredentialToDelete] = useState<string | null>(null);
  
  const autoSyncPreferences = profile?.auto_sync_preferences || {
    etsy: false,
    ebay: false,
    shopify: false
  };

  useEffect(() => {
    if (user) {
      fetchCredentials();
      fetchSyncLogs();
    }
  }, [user]);

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('marketplace_credentials')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setCredentials(data || []);
    } catch (err: any) {
      console.error('Error fetching marketplace credentials:', err);
      toast({
        title: 'Error',
        description: 'Failed to fetch marketplace connections',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSyncLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('listing_sync_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSyncLogs(data || []);
    } catch (err: any) {
      console.error('Error fetching sync logs:', err);
    }
  };

  const handleConnect = (platform: string) => {
    setCurrentPlatform(platform);
    setApiKey('');
    setApiSecret('');
    setShopId('');
    setIsDialogOpen(true);
  };

  const handleSaveCredentials = async () => {
    if (!currentPlatform || !user) return;
    
    try {
      setLoading(true);
      
      // In a real app, we would validate these credentials with the platform API first
      const { data, error } = await supabase
        .from('marketplace_credentials')
        .upsert({
          user_id: user.id,
          platform: currentPlatform,
          access_token: apiKey,
          refresh_token: apiSecret,
          shop_id: shopId || null,
          is_connected: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, platform' })
        .select();

      if (error) throw error;

      setCredentials(prev => {
        const exists = prev.some(cred => cred.platform === currentPlatform);
        if (exists) {
          return prev.map(cred => 
            cred.platform === currentPlatform 
              ? { ...cred, is_connected: true, updated_at: new Date().toISOString() } 
              : cred
          );
        }
        return [...prev, data?.[0] as MarketplaceCredential];
      });

      setIsDialogOpen(false);
      
      toast({
        title: 'Connected',
        description: `${currentPlatform} has been successfully connected to your account`,
      });
    } catch (err: any) {
      console.error('Error saving marketplace credentials:', err);
      toast({
        title: 'Error',
        description: `Failed to connect to ${currentPlatform}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = (credentialId: string, platform: string) => {
    setCredentialToDelete(credentialId);
    setCurrentPlatform(platform);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDisconnect = async () => {
    if (!credentialToDelete) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('marketplace_credentials')
        .delete()
        .eq('id', credentialToDelete);

      if (error) throw error;

      setCredentials(prev => prev.filter(cred => cred.id !== credentialToDelete));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: 'Disconnected',
        description: `${currentPlatform} has been successfully disconnected`,
      });
    } catch (err: any) {
      console.error('Error disconnecting marketplace:', err);
      toast({
        title: 'Error',
        description: `Failed to disconnect from ${currentPlatform}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAutoSync = async (platform: string, enabled: boolean) => {
    if (!profile) return;
    
    const newPreferences = {
      ...autoSyncPreferences,
      [platform.toLowerCase()]: enabled
    };
    
    try {
      await updateProfile({ auto_sync_preferences: newPreferences });
      
      toast({
        title: enabled ? 'Auto-sync enabled' : 'Auto-sync disabled',
        description: `Auto-sync for ${platform} has been ${enabled ? 'enabled' : 'disabled'}`
      });
    } catch (err: any) {
      console.error('Error updating auto-sync preferences:', err);
      toast({
        title: 'Error',
        description: 'Failed to update auto-sync preferences',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  if (!user) {
    return null; // Will be handled by ProtectedRoute
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold mb-2">Marketplace Integrations</h1>
        <p className="text-gray-600 mb-8">
          Connect your store to popular marketplaces and manage your listings across platforms.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="sync-logs">Sync History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Etsy Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="font-playfair">Etsy</CardTitle>
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>
                    Connect to Etsy to list and sell your jewelry on the largest handmade marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {credentials.find(c => c.platform.toLowerCase() === 'etsy')?.is_connected ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> 
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mb-4">
                      Not Connected
                    </Badge>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Auto-sync new items:</span>
                      <span className="font-medium">
                        {autoSyncPreferences.etsy ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {credentials.find(c => c.platform.toLowerCase() === 'etsy')?.is_connected ? (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const credential = credentials.find(c => c.platform.toLowerCase() === 'etsy');
                        if (credential) {
                          handleDisconnect(credential.id, 'Etsy');
                        }
                      }}
                      className="mr-2"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleConnect('Etsy')}
                      size="sm"
                    >
                      Connect
                    </Button>
                  )}
                  
                  <a 
                    href="https://www.etsy.com/your/shops/me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" /> 
                      Visit
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              
              {/* eBay Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="font-playfair">eBay</CardTitle>
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>
                    List your jewelry on eBay to reach millions of potential buyers worldwide.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {credentials.find(c => c.platform.toLowerCase() === 'ebay')?.is_connected ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> 
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mb-4">
                      Not Connected
                    </Badge>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Auto-sync new items:</span>
                      <span className="font-medium">
                        {autoSyncPreferences.ebay ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {credentials.find(c => c.platform.toLowerCase() === 'ebay')?.is_connected ? (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const credential = credentials.find(c => c.platform.toLowerCase() === 'ebay');
                        if (credential) {
                          handleDisconnect(credential.id, 'eBay');
                        }
                      }}
                      className="mr-2"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleConnect('eBay')}
                      size="sm"
                    >
                      Connect
                    </Button>
                  )}
                  
                  <a 
                    href="https://www.ebay.com/sh/ovw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" /> 
                      Visit
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              
              {/* Your Shop Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="font-playfair">Your Shop</CardTitle>
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <CardDescription>
                    List products on your own branded storefront managed by GoldenLoop.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> 
                    Available
                  </Badge>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Auto-publish new items:</span>
                      <span className="font-medium">
                        {autoSyncPreferences.own ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    size="sm"
                    onClick={() => navigate('/products')}
                  >
                    View Shop
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleAutoSync('own', !autoSyncPreferences.own)}
                  >
                    <Settings className="h-4 w-4 mr-1" /> 
                    Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sync-logs">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Sync History</CardTitle>
                <CardDescription>
                  Records of your recent product listings and synchronization attempts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {syncLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-1">No sync history yet</h3>
                    <p>When you sync products to marketplaces, they'll appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Platform</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Product ID</TableHead>
                          <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {syncLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">
                              {new Date(log.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {getPlatformIcon(log.platform)}
                                <span className="ml-2 capitalize">{log.platform}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {getStatusIcon(log.status)}
                                <span className="ml-1 capitalize">{log.status}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {log.product_id.slice(0, 8)}...
                            </TableCell>
                            <TableCell className="text-right">
                              {log.platform_listing_url ? (
                                <a
                                  href={log.platform_listing_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center justify-end"
                                >
                                  <span className="mr-1">View</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : log.error_message ? (
                                <span className="text-red-600">
                                  {log.error_message.length > 20 
                                    ? `${log.error_message.slice(0, 20)}...` 
                                    : log.error_message}
                                </span>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Auto-sync Settings</CardTitle>
                <CardDescription>
                  Configure automatic synchronization preferences for each marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Etsy Settings */}
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Store className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="font-medium">Etsy</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      Automatically sync new products to Etsy
                    </p>
                  </div>
                  <Switch
                    checked={autoSyncPreferences.etsy}
                    onCheckedChange={(checked) => handleToggleAutoSync('etsy', checked)}
                    disabled={!credentials.find(c => c.platform.toLowerCase() === 'etsy')?.is_connected}
                  />
                </div>
                
                {/* eBay Settings */}
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="font-medium">eBay</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      Automatically sync new products to eBay
                    </p>
                  </div>
                  <Switch
                    checked={autoSyncPreferences.ebay}
                    onCheckedChange={(checked) => handleToggleAutoSync('ebay', checked)}
                    disabled={!credentials.find(c => c.platform.toLowerCase() === 'ebay')?.is_connected}
                  />
                </div>
                
                {/* Your Shop Settings */}
                <div className="flex items-center justify-between py-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Store className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="font-medium">Your Shop</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      Automatically publish new products to your shop
                    </p>
                  </div>
                  <Switch
                    checked={autoSyncPreferences.own}
                    onCheckedChange={(checked) => handleToggleAutoSync('own', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to {currentPlatform}</DialogTitle>
            <DialogDescription>
              Enter your API credentials to connect your {currentPlatform} account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="relative">
                <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="api-key"
                  className="pl-9"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-secret">API Secret</Label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="api-secret"
                  type="password"
                  className="pl-9"
                  placeholder="Enter your API secret"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shop-id">Shop ID (Optional)</Label>
              <Input
                id="shop-id"
                placeholder="Enter your shop ID"
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCredentials} disabled={!apiKey || !apiSecret}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {currentPlatform}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove your {currentPlatform} API credentials. Your existing listings won't be affected, but you won't be able to sync new products until you reconnect.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDisconnect}>
              <Trash2 className="h-4 w-4 mr-2" />
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default Marketplace;

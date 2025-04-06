
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreview from "@/components/AdminPreview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts, Product } from "@/utils/mockData";
import { BadgeCheck, AlertCircle, Clock, ArrowUpDown, Filter, Loader2, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isPublishing, setIsPublishing] = useState(false);
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  const pendingProducts = products.filter(product => !product.listed);
  const listedProducts = products.filter(product => product.listed);

  const handleApprove = (id: string) => {
    // Simulate approving a product
    toast({
      title: "Product Approved",
      description: "The product will be listed shortly",
    });
    
    // Start publishing simulation
    setIsPublishing(true);
    
    setTimeout(() => {
      setProducts(products.map(product => 
        product.id === id ? { ...product, listed: true, platforms: { ...product.platforms, own: true } } : product
      ));
      setIsPublishing(false);
      
      toast({
        title: "Product Published",
        description: "The product has been successfully published to your store",
        variant: "default",
      });
    }, 2000);
  };

  const handleReject = (id: string) => {
    // In a real implementation, you would likely want to ask for rejection reason
    toast({
      title: "Product Rejected",
      description: "The product has been removed from the queue",
      variant: "destructive",
    });
    
    // Remove the product from the list
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (id: string) => {
    // In a real implementation, this would open an edit screen
    toast({
      title: "Edit Product",
      description: "Editing functionality will be implemented soon",
    });
  };

  const handleCrossPost = (id: string, platform: string) => {
    // Simulate cross-posting to a platform
    toast({
      title: "Cross-posting to " + platform,
      description: "Your listing is being prepared for " + platform,
    });
    
    // Start cross-posting simulation
    setIsPublishing(true);
    
    setTimeout(() => {
      setProducts(products.map(product => 
        product.id === id ? { 
          ...product, 
          platforms: { 
            ...product.platforms, 
            [platform.toLowerCase()]: `https://${platform.toLowerCase()}.com/listing/${Math.floor(Math.random() * 100000)}` 
          } 
        } : product
      ));
      setIsPublishing(false);
      
      toast({
        title: "Cross-posting Complete",
        description: `Your product has been listed on ${platform}`,
        variant: "default",
      });
    }, 2500);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isPublishing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium">Processing...</p>
            <p className="text-gray-500 text-sm">This may take a few moments</p>
          </div>
        </div>
      )}
      <main className="flex-grow py-8 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Your Profile</CardTitle>
                  <CardDescription>Account information and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium">{profile?.full_name || user?.email}</h3>
                    <p className="text-gray-500 text-sm">{profile?.user_type || "Reseller"}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-gray-500">{profile?.email || user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Account created</p>
                      <p className="text-gray-500">
                        {profile?.created_at 
                          ? new Date(profile.created_at).toLocaleDateString() 
                          : new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total listings</p>
                      <p className="text-gray-500">{products.length}</p>
                    </div>
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <Link to="/upload">Upload New Items</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-playfair font-bold mb-1">Your Jewelry Dashboard</h1>
                  <p className="text-gray-600">
                    Manage your listings and cross-platform integrations
                  </p>
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="pending" className="relative">
                    Pending Review
                    {pendingProducts.length > 0 && (
                      <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                        {pendingProducts.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="published">
                    Published Listings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending" className="mt-0 space-y-6">
                  {pendingProducts.length > 0 ? (
                    <>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start mb-6">
                        <AlertCircle className="text-amber-500 h-5 w-5 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-amber-800 mb-1">Listings Awaiting Approval</h3>
                          <p className="text-amber-700 text-sm">
                            Review these AI-generated listings before publishing them to your store or marketplace.
                            You can edit details, approve, or reject them.
                          </p>
                        </div>
                      </div>
                      
                      {pendingProducts.map((product) => (
                        <AdminPreview 
                          key={product.id}
                          product={product}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onEdit={handleEdit}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-cream-dark">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Items</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        There are no items waiting for review. Upload some jewelry images to get started.
                      </p>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <a href="/upload">Upload Jewelry</a>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="published" className="mt-0 space-y-6">
                  {listedProducts.length > 0 ? (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start mb-6">
                        <BadgeCheck className="text-green-500 h-5 w-5 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-800 mb-1">Published Listings</h3>
                          <p className="text-green-700 text-sm">
                            These items are live on your store. You can cross-post them to other marketplaces or edit them.
                          </p>
                        </div>
                      </div>
                      
                      {listedProducts.map((product) => (
                        <div key={product.id} className="mb-6">
                          <AdminPreview 
                            product={product}
                            onEdit={handleEdit}
                          />
                          
                          <div className="bg-white rounded-lg mt-2 p-4 border border-cream-dark">
                            <h4 className="text-sm font-medium mb-3">Cross-post to Marketplaces:</h4>
                            <div className="flex flex-wrap gap-2">
                              {!product.platforms.etsy && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-primary/30 text-primary hover:bg-primary/5"
                                  onClick={() => handleCrossPost(product.id, "Etsy")}
                                >
                                  Post to Etsy
                                </Button>
                              )}
                              
                              {!product.platforms.ebay && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-primary/30 text-primary hover:bg-primary/5"
                                  onClick={() => handleCrossPost(product.id, "Ebay")}
                                >
                                  Post to eBay
                                </Button>
                              )}
                              
                              {!product.platforms.poshmark && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-primary/30 text-primary hover:bg-primary/5"
                                  onClick={() => handleCrossPost(product.id, "Poshmark")}
                                >
                                  Post to Poshmark
                                </Button>
                              )}
                              
                              {(product.platforms.etsy && product.platforms.ebay && product.platforms.poshmark) && (
                                <span className="text-sm text-gray-500">
                                  This item is cross-posted to all supported marketplaces
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-cream-dark">
                      <BadgeCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Published Items</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        You don't have any published listings yet. Review and approve your pending items to get started.
                      </p>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <a href="/upload">Upload Jewelry</a>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

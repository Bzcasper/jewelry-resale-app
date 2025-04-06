
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image, FileText, CheckCircle, Clock } from "lucide-react";

const UploadPage = () => {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "complete">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUploadProcess();
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateUploadProcess();
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const simulateUploadProcess = () => {
    setUploadState("uploading");
    setUploadProgress(0);
    
    // Simulate file upload
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newValue = prev + 5;
        if (newValue >= 100) {
          clearInterval(uploadInterval);
          setUploadState("processing");
          simulateProcessing();
          return 100;
        }
        return newValue;
      });
    }, 200);
  };
  
  const simulateProcessing = () => {
    setProcessingProgress(0);
    
    // Simulate AI processing
    const processingInterval = setInterval(() => {
      setProcessingProgress(prev => {
        const newValue = prev + 2;
        if (newValue >= 100) {
          clearInterval(processingInterval);
          setUploadState("complete");
          return 100;
        }
        return newValue;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold mb-2">Upload Your Jewelry Collection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI will automatically organize your images, generate product descriptions, and prepare listings for multiple platforms.
            </p>
          </div>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="upload" disabled={uploadState !== "idle" && uploadState !== "complete"}>
                Upload Files
              </TabsTrigger>
              <TabsTrigger value="process" disabled={uploadState === "idle"}>
                AI Processing
              </TabsTrigger>
              <TabsTrigger value="results" disabled={uploadState !== "complete"}>
                Results
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  {uploadState === "idle" ? (
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h2 className="text-lg font-medium text-gray-900 mb-2">
                        Drag and drop your files
                      </h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Upload ZIP files containing your jewelry images (max 100MB)
                      </p>
                      <input
                        type="file"
                        id="file-upload"
                        accept=".zip"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <label htmlFor="file-upload">Select Files</label>
                      </Button>
                    </div>
                  ) : uploadState === "complete" ? (
                    <div className="p-6 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h2 className="text-lg font-medium text-gray-900 mb-2">
                        Upload Complete!
                      </h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Your jewelry has been processed and is ready to view
                      </p>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <a href="/dashboard">View Results</a>
                      </Button>
                      
                      <div className="mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setUploadState("idle")}
                          className="border-primary text-primary hover:bg-primary/5"
                        >
                          Upload More Files
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {uploadState === "uploading" ? "Uploading Files..." : "Processing Files..."}
                      </h2>
                      
                      {uploadState === "uploading" ? (
                        <div>
                          <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2 mb-6" />
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>AI Processing...</span>
                            <span>{processingProgress}%</span>
                          </div>
                          <Progress value={processingProgress} className="h-2 mb-6" />
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        {uploadState === "uploading" ? (
                          <>
                            <p className="flex items-center text-sm">
                              <FileText className="h-4 w-4 mr-2 text-primary" />
                              <span>Uploading jewelry-collection.zip</span>
                            </p>
                            <p className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>Preparing for AI analysis</span>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              <span>Upload complete</span>
                            </p>
                            <p className="flex items-center text-sm">
                              <Image className="h-4 w-4 mr-2 text-primary" />
                              <span>Analyzing images and grouping similar items</span>
                            </p>
                            <p className="flex items-center text-sm">
                              <FileText className="h-4 w-4 mr-2 text-primary" />
                              <span>Generating product descriptions and metadata</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Upload Tips:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="min-w-4 mr-2">•</div>
                    <p>Use high-quality, well-lit photos from multiple angles</p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 mr-2">•</div>
                    <p>Include close-ups of any markings, hallmarks, or signatures</p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 mr-2">•</div>
                    <p>Group similar angles of the same item together in your folder structure</p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 mr-2">•</div>
                    <p>Use neutral backgrounds for the best AI detection results</p>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="process" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">AI Processing Pipeline</h2>
                    
                    <div className="space-y-4">
                      <div className="relative pt-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-primary">Image Analysis</span>
                          <span className="text-sm text-gray-500">
                            {uploadState === "processing" && processingProgress >= 30 ? "Complete" : "In progress..."}
                          </span>
                        </div>
                        <Progress 
                          value={uploadState === "processing" ? Math.min(100, processingProgress * 3) : 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-primary">Grouping Similar Items</span>
                          <span className="text-sm text-gray-500">
                            {uploadState === "processing" && processingProgress >= 50 ? "Complete" : 
                             (uploadState === "processing" && processingProgress >= 30 ? "In progress..." : "Waiting...")}
                          </span>
                        </div>
                        <Progress 
                          value={uploadState === "processing" ? 
                            (processingProgress < 30 ? 0 : Math.min(100, (processingProgress - 30) * 5)) : 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-primary">Generating Descriptions</span>
                          <span className="text-sm text-gray-500">
                            {uploadState === "processing" && processingProgress >= 70 ? "Complete" : 
                             (uploadState === "processing" && processingProgress >= 50 ? "In progress..." : "Waiting...")}
                          </span>
                        </div>
                        <Progress 
                          value={uploadState === "processing" ? 
                            (processingProgress < 50 ? 0 : Math.min(100, (processingProgress - 50) * 5)) : 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-primary">Creating Listings</span>
                          <span className="text-sm text-gray-500">
                            {uploadState === "processing" && processingProgress >= 90 ? "Complete" : 
                             (uploadState === "processing" && processingProgress >= 70 ? "In progress..." : "Waiting...")}
                          </span>
                        </div>
                        <Progress 
                          value={uploadState === "processing" ? 
                            (processingProgress < 70 ? 0 : Math.min(100, (processingProgress - 70) * 5)) : 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                    
                    <div className="bg-cream rounded-lg p-4 text-sm">
                      <h3 className="font-medium mb-2">Processing Details:</h3>
                      <p className="text-gray-600 mb-2">
                        Our AI is identifying jewelry types, materials, and styles from your images. It's also
                        grouping related images together and generating SEO-friendly product information.
                      </p>
                      <p className="text-gray-600">
                        This process typically takes 1-3 minutes per 10 images, depending on complexity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="results" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-playfair font-medium text-gray-900 mb-2">
                      Processing Complete!
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Your jewelry collection has been processed and is ready for review.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <a href="/dashboard">View in Dashboard</a>
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setUploadState("idle")}
                        className="border-primary text-primary hover:bg-primary/5"
                      >
                        Upload More Items
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-cream-dark">
                <h3 className="font-medium mb-4">Processing Summary:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>6 unique jewelry pieces identified</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>24 images processed and organized</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>6 product descriptions generated</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>All items ready for review in your dashboard</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;

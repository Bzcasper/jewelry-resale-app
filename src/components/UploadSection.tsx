
import { useState } from "react";
import { Upload, File, Check, FileImage, FileText, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Check if files were dropped
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Check if it's a ZIP file
      if (file.type === "application/zip" || file.name.endsWith('.zip')) {
        toast({
          title: "Upload Started",
          description: `Processing "${file.name}" - ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        });
        simulateUpload();
      } else {
        toast({
          title: "Invalid File Format",
          description: "Please upload a ZIP file containing your jewelry images.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if it's a ZIP file
      if (file.type === "application/zip" || file.name.endsWith('.zip')) {
        toast({
          title: "Upload Started",
          description: `Processing "${file.name}" - ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        });
        simulateUpload();
      } else {
        toast({
          title: "Invalid File Format",
          description: "Please upload a ZIP file containing your jewelry images.",
          variant: "destructive",
        });
      }
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    setProcessingStage("uploading");
    
    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(uploadInterval);
          simulateProcessing();
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const simulateProcessing = () => {
    setProcessingStage("extracting");
    
    // Simulate file extraction
    setTimeout(() => {
      setProcessingStage("analyzing");
      
      // Simulate image analysis
      setTimeout(() => {
        setProcessingStage("generating");
        
        // Simulate product generation
        setTimeout(() => {
          setProcessingStage("complete");
          setUploadComplete(true);
          toast({
            title: "Processing Complete",
            description: "Your jewelry images have been processed successfully!",
          });
        }, 3000);
      }, 2000);
    }, 2000);
  };

  const renderUploadStatus = () => {
    if (processingStage === "uploading") {
      return (
        <div>
          <File className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Uploading...</h3>
          <div className="max-w-md mx-auto mb-4">
            <Progress value={uploadProgress} className="h-2" />
          </div>
          <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
        </div>
      );
    } else if (processingStage === "extracting") {
      return (
        <div>
          <File className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Extracting ZIP Contents...</h3>
          <p className="text-sm text-gray-500 mb-4">Preparing your images for AI analysis</p>
          <Progress value={100} className="h-2 max-w-md mx-auto" />
        </div>
      );
    } else if (processingStage === "analyzing") {
      return (
        <div>
          <FileImage className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Images...</h3>
          <p className="text-sm text-gray-500 mb-4">Our AI is identifying jewelry types and details</p>
          <Progress value={100} className="h-2 max-w-md mx-auto" />
        </div>
      );
    } else if (processingStage === "generating") {
      return (
        <div>
          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Listings...</h3>
          <p className="text-sm text-gray-500 mb-4">Creating product descriptions and metadata</p>
          <Progress value={100} className="h-2 max-w-md mx-auto" />
        </div>
      );
    } else if (processingStage === "complete") {
      return (
        <div className="py-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Upload Complete!</h3>
          <p className="text-gray-500 mb-6">Your jewelry images have been processed by AI.</p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <a href="/dashboard">View in Dashboard</a>
          </Button>
        </div>
      );
    }
    
    return (
      <div>
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drop your ZIP file here
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          or click to browse your files (ZIP only, max 100MB)
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".zip"
          onChange={handleFileSelect}
        />
        <Button
          asChild
          variant="outline"
          className="border-gold hover:bg-gold/5"
        >
          <label htmlFor="file-upload">Select File</label>
        </Button>
      </div>
    );
  };

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Upload Your Jewelry Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Drag and drop a ZIP file with your jewelry images for instant AI processing.
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {renderUploadStatus()}
        </div>
        
        {processingStage && processingStage !== "complete" && (
          <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-medium mb-3">Processing Details:</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm">
                <Tag className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                <span>Detecting materials, styles, and jewelry types</span>
              </li>
              <li className="flex items-start text-sm">
                <FileImage className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                <span>Grouping similar angles of the same jewelry piece</span>
              </li>
              <li className="flex items-start text-sm">
                <FileText className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                <span>Creating SEO-friendly product descriptions</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileImage, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface AIProcessingStatusProps {
  status: 'idle' | 'processing' | 'complete' | 'error';
  progress?: number;
  error?: string;
  productsCount?: number;
  imagesCount?: number;
}

const AIProcessingStatus: React.FC<AIProcessingStatusProps> = ({ 
  status, 
  progress = 0,
  error = '',
  productsCount = 0,
  imagesCount = 0
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        {status === 'idle' && (
          <div className="text-center py-8">
            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Waiting for images
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Upload your jewelry images to start the AI classification process.
            </p>
          </div>
        )}
          
        {status === 'processing' && (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-center">
              <div className="animate-pulse">
                <FileImage className="h-16 w-16 text-primary mx-auto" />
              </div>
            </div>
            
            <h3 className="text-xl font-medium text-gray-900 text-center mb-4">
              AI Processing Your Images
            </h3>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Analyzing images...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="bg-cream rounded-lg p-4 text-sm">
              <p className="text-gray-600">
                Our AI is analyzing your jewelry images to identify and group similar items. 
                It will automatically create product titles, descriptions, and categories.
              </p>
            </div>
          </div>
        )}
          
        {status === 'complete' && (
          <div className="text-center py-6">
            <div className="rounded-full bg-green-100 p-4 mx-auto w-fit mb-4">
              <CheckCircle className="h-14 w-14 text-green-600" />
            </div>
            
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Processing Complete!
            </h3>
            
            <p className="text-gray-600 mb-6">
              AI has successfully processed your jewelry images.
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-4">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-semibold text-primary">{productsCount}</p>
                <p className="text-sm text-gray-600">Products Created</p>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-3xl font-semibold text-primary">{imagesCount}</p>
                <p className="text-sm text-gray-600">Images Processed</p>
              </div>
            </div>
          </div>
        )}
          
        {status === 'error' && (
          <div className="text-center py-6">
            <div className="rounded-full bg-red-100 p-4 mx-auto w-fit mb-4">
              <AlertCircle className="h-14 w-14 text-red-600" />
            </div>
            
            <h3 className="text-xl font-medium text-red-600 mb-2">
              Processing Error
            </h3>
            
            <p className="text-gray-600 mb-6">
              {error || 'An error occurred while processing your images. Please try again.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProcessingStatus;


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Edit, Trash2, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/hooks/useProducts';

interface ProductEditorProps {
  product: Product;
  onSave: (id: string, updates: Partial<Product>) => void;
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ 
  product, 
  onSave, 
  onPublish,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || '');
  const [selectedImages, setSelectedImages] = useState<string[]>(product.image_urls || []);

  const handleSave = () => {
    onSave(product.id, {
      title,
      description,
      category,
      image_urls: selectedImages,
      status: 'edited'
    });
    setIsEditing(false);
  };

  const handlePublish = () => {
    onPublish(product.id);
  };

  const handleDeleteImage = (imageUrl: string) => {
    setSelectedImages(prev => prev.filter(url => url !== imageUrl));
  };

  const categories = [
    'Earrings', 'Necklace', 'Bracelet', 'Ring', 'Brooch', 
    'Pendant', 'Anklet', 'Watch', 'Cufflinks', 'Hair Accessory', 'Other'
  ];

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge 
            variant={product.published ? "default" : "outline"} 
            className={product.published ? "bg-green-600" : ""}
          >
            {product.published ? 'Published' : product.status.replace('_', ' ')}
          </Badge>
          {!isEditing && (
            <h3 className="font-medium text-lg">{product.title}</h3>
          )}
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              {!product.published && (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  size="sm" 
                  onClick={handlePublish}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> Publish
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90" 
                onClick={handleSave}
              >
                <CheckCircle className="h-4 w-4 mr-1" /> Save
              </Button>
            </>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`title-${product.id}`}>Title</Label>
              <Input
                id={`title-${product.id}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`category-${product.id}`}>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id={`category-${product.id}`} className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor={`description-${product.id}`}>Description</Label>
              <Textarea
                id={`description-${product.id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div>
              <Label>Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                {selectedImages.map((url, index) => (
                  <div key={`${product.id}-img-${index}`} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                      <img
                        src={url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteImage(url)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-70 
                                hover:opacity-100 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="aspect-square overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                {product.image_urls && product.image_urls.length > 0 ? (
                  <img
                    src={product.image_urls[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              {product.image_urls && product.image_urls.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                  {product.image_urls.slice(1).map((url, index) => (
                    <div 
                      key={`${product.id}-thumb-${index}`}
                      className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`${product.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="capitalize">{product.category || 'Uncategorized'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="text-gray-700">{product.description || 'No description'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Images</h4>
                <p>{product.image_urls?.length || 0} image(s)</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductEditor;

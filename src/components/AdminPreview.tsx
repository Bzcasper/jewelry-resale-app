
import { useState } from "react";
import { Check, X, ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/utils/mockData";

interface AdminPreviewProps {
  product: Product;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const AdminPreview = ({ product, onApprove, onReject, onEdit }: AdminPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="elegant-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="aspect-square md:aspect-auto">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-2 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-playfair font-medium text-lg text-gray-800">
              {product.title}
            </h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onEdit && onEdit(product.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {product.type}
            </Badge>
            {product.material.slice(0, 2).map((mat, index) => (
              <Badge key={index} variant="outline" className="capitalize">
                {mat}
              </Badge>
            ))}
            {product.style.slice(0, 2).map((style, index) => (
              <Badge key={index} variant="outline" className="capitalize text-secondary">
                {style}
              </Badge>
            ))}
            <Badge variant="outline" className="capitalize">
              {product.condition}
            </Badge>
          </div>

          <p className={`text-gray-600 text-sm ${isExpanded ? "" : "line-clamp-3"}`}>
            {product.description}
          </p>
          <button
            className="text-primary text-xs mt-1 hover:underline focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 ml-2">Suggested price</span>
            </div>
            <div className="flex gap-2">
              {product.listed ? (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Listed on:</span>
                  <div className="flex gap-1">
                    {product.platforms.own && (
                      <Badge variant="secondary" className="text-xs">Your Shop</Badge>
                    )}
                    {product.platforms.etsy && (
                      <Badge variant="secondary" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Etsy
                      </Badge>
                    )}
                    {product.platforms.ebay && (
                      <Badge variant="secondary" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        eBay
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => onApprove && onApprove(product.id)}
                  >
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => onReject && onReject(product.id)}
                  >
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminPreview;

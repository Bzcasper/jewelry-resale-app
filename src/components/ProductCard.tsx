
import { useState } from "react";
import { Heart, Share2, ExternalLink, Eye, Gem } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/mockData";

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
}

const ProductCard = ({ product, isAdmin = false }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden h-full bg-[#F8F5F0] border border-[#EDEDED] hover:border-[#D4AF37] transition-colors duration-300 shadow-sm hover:shadow-md">
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden relative group">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-[#2E2E2E] hover:bg-white"
            >
              <Eye className="h-4 w-4 mr-1" /> Quick View
            </Button>
          </div>
        </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-[#800020] text-[#800020]' : 'text-[#2E2E2E]'}`} />
          </Button>
        {product.listed && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-primary text-white">{product.platforms.etsy ? 'Listed on Etsy' : 'Listed'}</Badge>
          </div>
        )}
      </div>

        <CardContent className="pt-4 px-4 pb-4">
        <div className="space-y-3">
          <h3 className="font-playfair font-medium text-[#2E2E2E] line-clamp-2 text-lg">
            {product.title}
          </h3>
          <div className="flex justify-between items-center">
            <div>
            <span className="text-lg font-medium text-[#800020]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="flex gap-1">
              <Badge variant="outline" className="text-xs capitalize border-[#EDEDED]">
                {product.type}
              </Badge>
              {product.material && (
                <Badge variant="outline" className="text-xs">
                  {product.material}
                </Badge>
              )}
              {product.gemstones?.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Gem className="h-3 w-3 mr-1" />
                  {product.gemstones.length > 1
                    ? `${product.gemstones.length} gems`
                    : product.gemstones[0]}
                </Badge>
              )}
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {Object.entries(product.platforms)
                .filter(([platform, value]) => platform !== 'own' && value)
                .map(([platform, _]) => (
                  <Badge key={platform} variant="secondary" className="text-xs capitalize">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {platform}
                  </Badge>
                ))}
              {!product.listed && (
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                  Not Listed
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                <Share2 className="h-3 w-3 mr-1" /> Share
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;


import { useState } from "react";
import { Product } from "@/utils/mockData";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  showFilters?: boolean;
}

const ProductGrid = ({ products, showFilters = true }: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get unique values for filters
  const types = Array.from(new Set(products.map((product) => product.type)));
  const materials = Array.from(
    new Set(products.flatMap((product) => product.material))
  );

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm === "" || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || product.type === selectedType;
    
    const matchesMaterial = !selectedMaterial || 
      product.material.includes(selectedMaterial);
    
    const matchesPrice = 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesMaterial && matchesPrice;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType(null);
    setSelectedMaterial(null);
    setPriceRange([0, 100]);
  };

  const renderFilters = () => {
    if (!showFilters) return null;
    
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-cream-dark p-4 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Filters</h2>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search Filter */}
          <div>
            <Label htmlFor="search" className="text-sm font-medium mb-1.5 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Search jewelry..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-2.5 top-2.5"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <Label htmlFor="type" className="text-sm font-medium mb-1.5 block">Type</Label>
            <Select 
              value={selectedType || "all-types"}
              onValueChange={(value) => setSelectedType(value === "all-types" ? null : value)}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Material Filter */}
          <div>
            <Label htmlFor="material" className="text-sm font-medium mb-1.5 block">Material</Label>
            <Select 
              value={selectedMaterial || "all-materials"}
              onValueChange={(value) => setSelectedMaterial(value === "all-materials" ? null : value)}
            >
              <SelectTrigger id="material" className="w-full">
                <SelectValue placeholder="All Materials" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-materials">All Materials</SelectItem>
                {materials.map((material) => (
                  <SelectItem key={material} value={material} className="capitalize">
                    {material.replace(/-/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between mb-1.5">
              <Label htmlFor="price-range" className="text-sm font-medium">Price Range</Label>
              <span className="text-xs text-gray-500">${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <Slider
              id="price-range"
              defaultValue={[0, 100]}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-4"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Mobile Filter Toggle */}
      {showFilters && (
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center" 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters {filteredProducts.length !== products.length && `(${filteredProducts.length})`}
            </span>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="col-span-1">
            {renderFilters()}
          </div>
        )}

        {/* Product Grid */}
        <div className={`${showFilters ? 'col-span-1 md:col-span-3' : 'col-span-1 md:col-span-4'}`}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-cream-dark">
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              {searchTerm || selectedType || selectedMaterial || priceRange[0] > 0 || priceRange[1] < 100 ? (
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Reset Filters
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;

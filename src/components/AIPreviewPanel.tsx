
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileImage, BookOpen, Tag, Info } from "lucide-react";

// These would come from the real AI processing later
const mockJewelryData = [
  {
    id: "item-1",
    name: "Vintage Pearl Necklace",
    category: "Necklace",
    style: "Vintage",
    material: "Pearl, Gold-Tone",
    confidence: 0.92,
    tags: ["vintage", "pearl", "gold-tone", "necklace", "elegant"],
    description: "Elegant vintage pearl necklace with gold-tone clasp. Features graduated pearl beads with a delicate design perfect for special occasions."
  },
  {
    id: "item-2",
    name: "Art Deco Diamond Ring",
    category: "Ring",
    style: "Art Deco",
    material: "Silver, Diamond",
    confidence: 0.87,
    tags: ["art deco", "diamond", "silver", "ring", "statement"],
    description: "Stunning Art Deco inspired silver ring with diamond accents. Features geometric patterns typical of the era, making it a perfect statement piece."
  },
  {
    id: "item-3",
    name: "Boho Beaded Bracelet",
    category: "Bracelet",
    style: "Bohemian",
    material: "Wood, Glass Beads",
    confidence: 0.95, 
    tags: ["boho", "beaded", "bracelet", "colorful", "casual"],
    description: "Colorful bohemian bracelet with wooden and glass beads. Features an adjustable length and vibrant colors perfect for casual wear."
  }
];

interface AIPreviewPanelProps {
  isVisible: boolean;
}

const AIPreviewPanel = ({ isVisible }: AIPreviewPanelProps) => {
  if (!isVisible) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            AI Analysis Preview
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here's how our AI has categorized your jewelry items. You can approve or edit before publishing.
          </p>
        </div>

        <div className="bg-cream/50 border border-cream-dark rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Info className="text-primary h-5 w-5 mr-3 mt-0.5" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">Preview Mode:</span> This is a simulation of AI-powered analysis. In the full version, these details will be generated automatically for each item in your collection.
            </p>
          </div>
        </div>

        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="items">
              <FileImage className="h-4 w-4 mr-2" />
              <span>Items</span>
            </TabsTrigger>
            <TabsTrigger value="descriptions">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Descriptions</span>
            </TabsTrigger>
            <TabsTrigger value="tags">
              <Tag className="h-4 w-4 mr-2" />
              <span>Tags</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockJewelryData.map(item => (
                <Card key={item.id} className="elegant-card overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileImage className="h-12 w-12 text-gray-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                      {item.name}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                        {item.style}
                      </Badge>
                    </div>
                    
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Material: {item.material}</p>
                    
                    <div className="flex items-center mt-3">
                      <span className="text-xs text-gray-500 mr-2">AI Confidence:</span>
                      <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${item.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{Math.round(item.confidence * 100)}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="descriptions" className="mt-0">
            <div className="space-y-4">
              {mockJewelryData.map(item => (
                <Card key={item.id} className="elegant-card">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                        <FileImage className="h-8 w-8 text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                        <div className="text-xs text-gray-500">Generated for: {item.category} / {item.style}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tags" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockJewelryData.map(item => (
                <Card key={item.id} className="elegant-card">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">{item.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AIPreviewPanel;

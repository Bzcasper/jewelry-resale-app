
import { Upload, Zap, ShoppingCart, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: "Bulk Upload",
    description:
      "Upload entire collections at once. Our system will automatically organize and group similar jewelry items.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "AI-Powered Analysis",
    description:
      "Automatically generate detailed product descriptions, categorize materials, and identify jewelry types.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: "Instant Listings",
    description:
      "Create professional product listings with just a few clicks. Edit and customize before publishing.",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Multi-Platform Selling",
    description:
      "Seamlessly list your items across popular marketplaces like eBay, Etsy, and Poshmark.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform streamlines your jewelry selling process from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="elegant-card overflow-hidden hover:translate-y-[-5px] transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-cream rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

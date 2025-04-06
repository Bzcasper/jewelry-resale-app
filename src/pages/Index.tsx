
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadSection from "@/components/UploadSection";
import AIPreviewPanel from "@/components/AIPreviewPanel";
import HowItWorks from "@/components/HowItWorks";
import TestimonialSection from "@/components/TestimonialSection";
import { ArrowRight, ImageIcon, Upload, ScanEye, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product, mockProducts } from "@/utils/mockData";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  // Only show the first 4 products on the homepage
  const featuredProducts = mockProducts.slice(0, 4);
  const [showAIPreview, setShowAIPreview] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        {/* Jewelry Categories */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair font-bold text-center mb-8">Our Jewelry Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
                <div key={category} className="group relative overflow-hidden rounded-lg aspect-square bg-gray-50">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
                  <div className="absolute inset-0 flex items-end p-6 z-20">
                    <h3 className="text-xl font-medium text-white">{category}</h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                    <ImageIcon className="h-24 w-24 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />

        {/* Enhanced How It Works for Jewelry */}
        <HowItWorks
          steps={[
            {
              title: "Upload Your Jewelry",
              description: "Simply take photos of your jewelry pieces and upload them through our secure platform.",
              icon: <Upload className="h-8 w-8" />
            },
            {
              title: "AI Valuation",
              description: "Our AI analyzes materials, craftsmanship, and market trends to provide an accurate valuation.",
              icon: <ScanEye className="h-8 w-8" />
            },
            {
              title: "Get Paid",
              description: "Receive an offer and get paid quickly once you accept. We handle all the logistics.",
              icon: <Banknote className="h-8 w-8" />
            }
          ]}
        />

        {/* Featured Products Section */}
        <section className="py-16 bg-gradient-to-b from-white to-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-playfair font-bold">Featured Jewelry</h2>
                <p className="text-gray-600 mt-2">Discover our latest treasures</p>
              </div>
              <Button asChild variant="link" className="text-primary">
                <Link to="/products" className="flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <UploadSection />
        <AIPreviewPanel isVisible={showAIPreview} />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

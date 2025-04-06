
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-cream py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gold-light/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gold-light/10 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/5 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-white/40 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium text-secondary">AI-Powered Jewelry Resale</span>
          </div>
          
          <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            <span className="gold-gradient">Rediscover</span> the Beauty of <br className="hidden sm:inline" />Vintage Jewelry
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Transform your collection with AI-powered organization, listing creation, and cross-platform selling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-medium text-base">
              <Link to="/upload">
                Start Uploading
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gold hover:bg-gold/5 text-gray-800">
              <Link to="/products">View Shop</Link>
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500 flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Multi-Platform Selling</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Time-Saving Automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

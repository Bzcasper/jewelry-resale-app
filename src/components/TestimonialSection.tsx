
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "This platform completely transformed my jewelry business. What used to take me hours now happens in minutes!",
    author: "Sarah Johnson",
    role: "Vintage Jewelry Seller"
  },
  {
    quote: "The AI descriptions are better than what I could write myself. My sales have increased 40% since I started using this platform.",
    author: "Michael Chen",
    role: "Estate Jewelry Dealer"
  },
  {
    quote: "Cross-posting to multiple platforms with one click saved me so much time. Absolutely worth every penny.",
    author: "Emma Rodriguez",
    role: "Boutique Owner"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of jewelry sellers who have transformed their business with our AI-powered platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="elegant-card overflow-hidden hover:translate-y-[-5px] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-gold-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700 italic flex-grow mb-6">{testimonial.quote}</p>
                  <div className="mt-auto">
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

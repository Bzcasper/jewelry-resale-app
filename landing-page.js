import { Header, Footer, ProductCard } from './components.js';
import { colors, typography, spacing, borderRadius, shadows, animations } from './branding-tokens.json';

export const LandingPage = () => (
  <div className="bg-background text-primaryText">
    <Header />

    <main className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Discover Unique Jewelry</h1>
        <p className="text-lg text-center mb-8">Explore our curated collection of vintage and costume jewelry</p>
        <div className="flex justify-center">
          <button className="bg-accentGold text-background px-6 py-3 rounded-full hover:bg-accentBold">Shop Now</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-accentGold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <h3 className="text-lg font-bold mb-2">Browse</h3>
            <p>Explore our curated collection of unique pieces.</p>
          </div>
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-accentGold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <h3 className="text-lg font-bold mb-2">Select</h3>
            <p>Find the perfect item that speaks to you.</p>
          </div>
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-accentGold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <h3 className="text-lg font-bold mb-2">Purchase</h3>
            <p>Securely purchase and enjoy your new treasure.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-secondaryBackground">
        <h2 className="text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background rounded-2xl p-6 shadow-md">
            <p className="mb-4">"I found the most beautiful vintage necklace here. The quality and service were exceptional!"</p>
            <p className="text-accentGold font-bold">- Sarah J.</p>
          </div>
          <div className="bg-background rounded-2xl p-6 shadow-md">
            <p className="mb-4">"The selection is incredible, and the website is so easy to navigate. I'll definitely be back!"</p>
            <p className="text-accentGold font-bold">- Michael T.</p>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard product={{
            name: "Vintage Art Deco Necklace",
            description: "Stunning Art Deco necklace with intricate detailing",
            image: "art-deco-necklace.jpg",
            price: "120.00"
          }} />
          <ProductCard product={{
            name: "Retro Gold Earrings",
            description: "Elegant gold earrings from the 1970s",
            image: "retro-earrings.jpg",
            price: "85.00"
          }} />
          <ProductCard product={{
            name: "Victorian Cameo Brooch",
            description: "Beautiful Victorian cameo brooch with detailed craftsmanship",
            image: "victorian-brooch.jpg",
            price: "150.00"
          }} />
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

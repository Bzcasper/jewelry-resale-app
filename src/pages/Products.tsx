
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { mockProducts } from "@/utils/mockData";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-playfair font-bold">Jewelry Collection</h1>
            <p className="text-gray-600">
              Discover unique pieces for every style and occasion
            </p>
          </div>

          <ProductGrid products={mockProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

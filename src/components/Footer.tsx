
import { Mail, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4">Sparkle</h3>
            <p className="text-gray-600 mb-4">
              Transforming vintage and second-hand jewelry into treasures for a new generation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">
                  Upload
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-600 mb-2">
              Email: hello@sparklejewelry.com
            </p>
            <p className="text-gray-600 mb-4">
              Phone: +1 (555) 123-4567
            </p>
            <form className="mt-4">
              <label htmlFor="newsletter" className="text-sm font-medium text-gray-700 block mb-2">
                Subscribe to our newsletter
              </label>
              <div className="flex">
                <input 
                  type="email" 
                  id="newsletter" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 border border-cream-dark rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-cream-dark mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sparkle Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

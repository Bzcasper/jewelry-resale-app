
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-cream-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-playfair text-2xl font-bold gold-gradient">Sparkle</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Shop
            </Link>
            
            {user && (
              <>
                <Link to="/upload" className="font-medium text-gray-700 hover:text-primary transition-colors">
                  Upload
                </Link>
                <Link to="/dashboard" className="font-medium text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-cream focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-cream-dark animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cream hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cream hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/upload" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cream hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Upload
                </Link>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cream hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cream hover:text-primary"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block px-3 py-2 rounded-md text-base font-medium text-primary bg-cream hover:bg-primary hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

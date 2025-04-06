import { colors, typography, spacing, borderRadius, shadows, animations } from './branding-tokens.json';

// Header Component
export const Header = () => (
  <header className="bg-background text-primaryText p-6 flex justify-between items-center">
    <div className="text-2xl font-bold">{/* Logo or Brand Name */}</div>
    <nav className="space-x-4">
      <a href="#" className="hover:text-accentGold">Home</a>
      <a href="#" className="hover:text-accentGold">Shop</a>
      <a href="#" className="hover:text-accentGold">About</a>
      <a href="#" className="hover:text-accentGold">Contact</a>
    </nav>
    <div>
      <button className="bg-accentGold text-background px-4 py-2 rounded-full hover:bg-accentBold">Sign In</button>
    </div>
  </header>
);

// Footer Component
export const Footer = () => (
  <footer className="bg-secondaryBackground text-primaryText p-6">
    <div className="flex justify-between">
      <div>
        <h3 className="text-lg font-bold">About Us</h3>
        <p>We are dedicated to bringing you the finest vintage and costume jewelry.</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Contact</h3>
        <p>Email: info@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Follow Us</h3>
        <div className="flex space-x-2">
          <a href="#" className="text-accentGold hover:text-accentBold">Instagram</a>
          <a href="#" className="text-accentGold hover:text-accentBold">Facebook</a>
        </div>
      </div>
    </div>
    <p className="text-center mt-4">&copy; 2025 Jewelry Resale Platform</p>
  </footer>
);

// Product Card Component
export const ProductCard = ({ product }) => (
  <div className="bg-background rounded-2xl shadow-md border border-gray-200 hover:border-accentGold hover:shadow-lg transition duration-300 ease-in-out">
    <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-2xl" />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-accentGold font-bold">${product.price}</p>
    </div>
  </div>
);

// Upload Interface Component
export const UploadInterface = () => (
  <div className="bg-background p-6 rounded-2xl border-2 border-dashed border-accentGold">
    <h2 className="text-2xl font-bold mb-4">Upload Your Jewelry</h2>
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
    <div className="mt-4">
      <button className="bg-accentGold text-background px-4 py-2 rounded-full hover:bg-accentBold">Upload</button>
    </div>
  </div>
);

// Modal Component
export const Modal = ({ isOpen, onClose, children }) => (
  isOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-background rounded-2xl shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-accentGold hover:text-accentBold">&times;</button>
        {children}
      </div>
    </div>
  )
);

// Filter Component
export const Filter = ({ options, onChange }) => (
  <div className="bg-background p-4 rounded-2xl shadow-md">
    <h3 className="text-lg font-bold mb-2">Filter</h3>
    {options.map((option, index) => (
      <div key={index} className="mb-2">
        <label className="flex items-center">
          <input type="checkbox" value={option.value} onChange={onChange} className="mr-2" />
          <span>{option.label}</span>
        </label>
      </div>
    ))}
  </div>
);


export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  type: 'ring' | 'necklace' | 'bracelet' | 'earrings' | 'brooch' | 'other';
  material: string;
  gemstones?: string[];
  color: string[];
  style: string[];
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  listed: boolean;
  platforms: {
    own: boolean;
    etsy?: string;
    ebay?: string;
    poshmark?: string;
  };
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Gold-Tone Floral Brooch with Pearl Accents',
    description: 'A beautiful vintage brooch featuring a delicate floral design with faux pearl accents. The gold-tone metal shows minimal wear, perfect for adding a touch of elegance to any outfit.',
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=400&h=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=400&h=400&auto=format&fit=crop',
    ],
    price: 34.99,
    type: 'brooch',
    material: 'Gold-tone metal with faux pearl accents',
    originalPrice: 49.99,
    gemstones: ['Faux pearl'],
    color: ['gold', 'white'],
    style: ['vintage', 'floral', '1970s'],
    condition: 'excellent',
    listed: true,
    platforms: {
      own: true,
      etsy: 'https://etsy.com/listing/12345',
    },
    createdAt: '2023-05-15T14:22:00Z'
  },
  {
    id: '2',
    title: 'Art Deco Style Silver Statement Necklace',
    description: 'An eye-catching statement necklace with geometric Art Deco inspired design. Features silver-tone metal with clear crystal accents. An elegant piece that adds sophistication to any ensemble.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&h=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&h=400&auto=format&fit=crop',
    ],
    price: 49.99,
    type: 'necklace',
    material: 'Silver-tone metal with crystal accents',
    originalPrice: 79.99,
    gemstones: ['Crystal'],
    color: ['silver', 'clear'],
    style: ['art deco', 'statement', 'geometric'],
    condition: 'good',
    listed: true,
    platforms: {
      own: true,
      ebay: 'https://ebay.com/itm/12345',
      etsy: 'https://etsy.com/listing/67890',
    },
    createdAt: '2023-06-02T09:15:00Z'
  },
  {
    id: '3',
    title: 'Bohemian Style Beaded Wrap Bracelet',
    description: 'A colorful bohemian-style wrap bracelet featuring various beads including wood, glass, and turquoise. The bracelet wraps multiple times around the wrist and secures with a button closure.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&h=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&h=400&auto=format&fit=crop',
    ],
    price: 29.99,
    type: 'bracelet',
    material: 'Mixed beads including wood, glass and turquoise',
    gemstones: ['Turquoise'],
    color: ['blue', 'brown', 'multi'],
    style: ['bohemian', 'boho', 'wrap', 'earthy'],
    condition: 'good',
    listed: false,
    platforms: {
      own: false,
    },
    createdAt: '2023-06-10T15:45:00Z'
  },
  {
    id: '4',
    title: 'Mid-Century Modern Silver Hoop Earrings',
    description: 'These elegant silver-tone hoop earrings feature a mid-century modern design with textured patterns. The hoops have a comfortable lever-back closure and are lightweight for all-day wear.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=400&h=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=400&h=400&auto=format&fit=crop',
    ],
    price: 24.99,
    type: 'earrings',
    material: 'Silver-tone metal',
    color: ['silver'],
    style: ['mid-century', 'modernist', 'textured', 'hoop'],
    condition: 'fair',
    listed: true,
    platforms: {
      own: true,
      poshmark: 'https://poshmark.com/listing/12345',
    },
    createdAt: '2023-06-20T11:30:00Z'
  },
  {
    id: '5',
    title: 'Victorian Style Filigree Ring with Amethyst Stone',
    description: 'A stunning statement ring featuring an ornate Victorian-inspired filigree design. The centerpiece is a beautiful purple amethyst-colored stone set in antiqued gold-tone metal.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&h=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&h=400&auto=format&fit=crop',
    ],
    price: 39.99,
    type: 'ring',
    material: 'Gold-tone filigree with faux amethyst',
    originalPrice: 59.99,
    gemstones: ['Faux amethyst'],
    color: ['gold', 'purple'],
    style: ['victorian', 'ornate', 'statement'],
    condition: 'excellent',
    listed: true,
    platforms: {
      own: true,
      etsy: 'https://etsy.com/listing/54321',
      ebay: 'https://ebay.com/itm/54321',
    },
    createdAt: '2023-07-05T16:20:00Z'
  },
  {
    id: '6',
    title: '1980s Chunky Gold Chain Necklace',
    description: 'An authentic vintage 1980s chunky gold-tone chain necklace. Features large, bold links with a secure lobster clasp. In excellent vintage condition with minimal wear.',
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=400&h=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=400&h=400&auto=format&fit=crop',
    ],
    price: 54.99,
    type: 'necklace',
    material: 'Gold-tone metal',
    originalPrice: 69.99,
    color: ['gold'],
    style: ['vintage', '1980s', 'chunky', 'chain'],
    condition: 'good',
    listed: false,
    platforms: {
      own: false,
    },
    createdAt: '2023-07-12T13:10:00Z'
  }
];

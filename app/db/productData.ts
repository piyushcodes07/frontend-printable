export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  colors?: string[];
  images: string[];
  brand?: string;
  availability?: string;
  specifications?: Specification[];
  highlights?: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: "klip-gel-pen",
    name: "Klip 0.5mm Gel Pen",
    price: 89.1,
    originalPrice: 120,
    colors: ["#000000", "#FF0000", "#808080"],
    images: [
      "/MarketPlace/pen1.svg",
      "/MarketPlace/pen2.svg",
      "/MarketPlace/pen3.svg",
      "/MarketPlace/pen4.svg",
    ],
    brand: "Klip",
    availability: "In Stock",
    specifications: [
      { key: "Ink Color", value: "Black, Red, Grey" },
      { key: "Tip Size", value: "0.5mm" },
      { key: "Material", value: "Plastic" },
    ],
    highlights: [
      "Smooth 0.5mm tip for precise writing",
      "Available in black, red, and grey ink",
      "Ergonomic grip for comfortable use",
      "Ideal for school, college, or office",
    ],
    category: "pens",
  },
  {
    id: "klip-gel-pen-blue",
    name: "Klip 0.7mm Gel Pen Blue",
    price: 99.9,
    colors: ["#0000FF"],
    images: [
      "/MarketPlace/pen1.svg",
      "/MarketPlace/pen2.svg",
    ],
    brand: "Klip",
    availability: "In Stock",
    specifications: [
      { key: "Ink Color", value: "Blue" },
      { key: "Tip Size", value: "0.7mm" },
      { key: "Material", value: "Plastic" },
    ],
    highlights: [
      "Smooth 0.7mm tip for bolder writing",
      "Blue ink for clarity",
    ],
    category: "pens",
  },
  {
    id: "solo-notebook",
    name: "Solo 5 Subject Notebook A5",
    price: 256.1,
    originalPrice: 300,
    colors: ["#FFFFFF", "#FFFFE0"],
    images: [
      "/MarketPlace/book1.svg",
      "/MarketPlace/book2.svg",
      "/MarketPlace/book3.svg",
      "/MarketPlace/book4.svg",
    ],
    brand: "Solo",
    availability: "Only 3 left in stock!",
    specifications: [
      { key: "Pages", value: "300" },
      { key: "Size", value: "A5" },
      { key: "Cover", value: "Hardcover" },
    ],
    highlights: [
      "300 ruled pages with crisp paper",
      "5 subject dividers for better organization",
      "A5 size fits easily in bags and backpacks",
      "Durable hardcover with stylish design",
    ],
    category: "notebooks",
  },
  {
    id: "notebook-sticky",
    name: "Sticky Notes Pack",
    price: 129,
    colors: ["#FFFF00", "#FF69B4"],
    images: [
      "/MarketPlace/notebook1.svg",
    ],
    brand: "NoteMaster",
    availability: "In Stock",
    specifications: [
      { key: "Sheets", value: "200" },
      { key: "Adhesive", value: "Strong" },
    ],
    highlights: [
      "Bright colors for reminders",
      "Easy to peel and stick",
    ],
    category: "notebooks",
  },
  {
    id: "mi-diary",
    name: "Mi Erase Manifestation A5",
    price: 359,
    originalPrice: 399,
    colors: ["#FFD700", "#FFFACD"],
    images: [
      "/MarketPlace/diary1.svg",
      "/MarketPlace/diary2.svg",
      "/MarketPlace/diary3.svg",
      "/MarketPlace/diary4.svg",
    ],
    brand: "Mi",
    availability: "Available",
    specifications: [
      { key: "Pages", value: "200" },
      { key: "Feature", value: "Reusable Erase Pages" },
      { key: "Size", value: "A5" },
    ],
    highlights: [
      "Reusable erasable pages for eco-friendly journaling",
      "Perfect for goal-setting, affirmations, and doodles",
      "Includes smart page templates",
      "A5 portable size, stylish golden cover",
    ],
    category: "diaries",
  },
  {
    id: "diary-premium",
    name: "Premium Leather Diary",
    price: 799,
    colors: ["#8B4513"],
    images: [
      "/MarketPlace/diary1.svg",
    ],
    brand: "LuxDiary",
    availability: "Available",
    specifications: [
      { key: "Pages", value: "250" },
      { key: "Cover", value: "Leather" },
    ],
    highlights: [
      "Elegant leather cover",
      "Perfect for professionals",
    ],
    category: "diaries",
  },
  {
    id: "kangaro-punch",
    name: "Kangaro SP-800 Paper Punch",
    price: 1885.1,
    originalPrice: 2000,
    colors: ["#C0C0C0", "#0000FF"],
    images: [
      "/MarketPlace/calci1.svg",
      "/MarketPlace/pen2.svg",
      "/MarketPlace/pen3.svg",
      "/MarketPlace/pen4.svg",
    ],
    brand: "Kangaro",
    availability: "In Stock",
    specifications: [
      { key: "Punch Capacity", value: "30 Sheets" },
      { key: "Material", value: "Metal Body" },
      { key: "Color", value: "Silver/Blue" },
    ],
    highlights: [
      "Heavy-duty punch handles up to 30 sheets",
      "Strong metal build for durability",
      "Non-slip base for stable operation",
      "Compact design for easy storage",
    ],
    category: "office-supplies",
  },
  {
    id: "art-brush-set",
    name: "Artist Pro Brush Set",
    price: 499.99,
    colors: ["#FFFFFF"],
    images: [
      "/MarketPlace/art1.svg",
      "/MarketPlace/art2.svg",
    ],
    brand: "ArtistPro",
    availability: "Limited Stock",
    specifications: [
      { key: "Brushes", value: "10 pieces" },
      { key: "Material", value: "Synthetic Hair" },
    ],
    highlights: [
      "Ideal for watercolor and acrylics",
      "Ergonomic handles for comfort",
    ],
    category: "art-essentials",
  },
  // Doubled Data Below
  {
    id: "klip-gel-pen-copy",
    name: "Klip 0.5mm Gel Pen",
    price: 89.1,
    originalPrice: 120,
    colors: ["#000000", "#FF0000", "#808080"],
    images: [
      "/MarketPlace/pen1.svg",
      "/MarketPlace/pen2.svg",
      "/MarketPlace/pen3.svg",
      "/MarketPlace/pen4.svg",
    ],
    brand: "Klip",
    availability: "In Stock",
    specifications: [
      { key: "Ink Color", value: "Black, Red, Grey" },
      { key: "Tip Size", value: "0.5mm" },
      { key: "Material", value: "Plastic" },
    ],
    highlights: [
      "Smooth 0.5mm tip for precise writing",
      "Available in black, red, and grey ink",
      "Ergonomic grip for comfortable use",
      "Ideal for school, college, or office",
    ],
    category: "pens",
  },
  {
    id: "klip-gel-pen-blue-copy",
    name: "Klip 0.7mm Gel Pen Blue",
    price: 99.9,
    colors: ["#0000FF"],
    images: [
      "/MarketPlace/pen1.svg",
      "/MarketPlace/pen2.svg",
    ],
    brand: "Klip",
    availability: "In Stock",
    specifications: [
      { key: "Ink Color", value: "Blue" },
      { key: "Tip Size", value: "0.7mm" },
      { key: "Material", value: "Plastic" },
    ],
    highlights: [
      "Smooth 0.7mm tip for bolder writing",
      "Blue ink for clarity",
    ],
    category: "pens",
  },
  {
    id: "solo-notebook-copy",
    name: "Solo 5 Subject Notebook A5",
    price: 256.1,
    originalPrice: 300,
    colors: ["#FFFFFF", "#FFFFE0"],
    images: [
      "/MarketPlace/book1.svg",
      "/MarketPlace/book2.svg",
      "/MarketPlace/book3.svg",
      "/MarketPlace/book4.svg",
    ],
    brand: "Solo",
    availability: "Only 3 left in stock!",
    specifications: [
      { key: "Pages", value: "300" },
      { key: "Size", value: "A5" },
      { key: "Cover", value: "Hardcover" },
    ],
    highlights: [
      "300 ruled pages with crisp paper",
      "5 subject dividers for better organization",
      "A5 size fits easily in bags and backpacks",
      "Durable hardcover with stylish design",
    ],
    category: "notebooks",
  },
  {
    id: "notebook-sticky-copy",
    name: "Sticky Notes Pack",
    price: 129,
    colors: ["#FFFF00", "#FF69B4"],
    images: [
      "/MarketPlace/notebook1.svg",
    ],
    brand: "NoteMaster",
    availability: "In Stock",
    specifications: [
      { key: "Sheets", value: "200" },
      { key: "Adhesive", value: "Strong" },
    ],
    highlights: [
      "Bright colors for reminders",
      "Easy to peel and stick",
    ],
    category: "notebooks",
  },
  {
    id: "mi-diary-copy",
    name: "Mi Erase Manifestation A5",
    price: 359,
    originalPrice: 399,
    colors: ["#FFD700", "#FFFACD"],
    images: [
      "/MarketPlace/diary1.svg",
      "/MarketPlace/diary2.svg",
      "/MarketPlace/diary3.svg",
      "/MarketPlace/diary4.svg",
    ],
    brand: "Mi",
    availability: "Available",
    specifications: [
      { key: "Pages", value: "200" },
      { key: "Feature", value: "Reusable Erase Pages" },
      { key: "Size", value: "A5" },
    ],
    highlights: [
      "Reusable erasable pages for eco-friendly journaling",
      "Perfect for goal-setting, affirmations, and doodles",
      "Includes smart page templates",
      "A5 portable size, stylish golden cover",
    ],
    category: "diaries",
  },
  {
    id: "diary-premium-copy",
    name: "Premium Leather Diary",
    price: 799,
    colors: ["#8B4513"],
    images: [
      "/MarketPlace/diary1.svg",
    ],
    brand: "LuxDiary",
    availability: "Available",
    specifications: [
      { key: "Pages", value: "250" },
      { key: "Cover", value: "Leather" },
    ],
    highlights: [
      "Elegant leather cover",
      "Perfect for professionals",
    ],
    category: "diaries",
  },
  {
    id: "kangaro-punch-copy",
    name: "Kangaro SP-800 Paper Punch",
    price: 1885.1,
    originalPrice: 2000,
    colors: ["#C0C0C0", "#0000FF"],
    images: [
      "/MarketPlace/calci1.svg",
      "/MarketPlace/pen2.svg",
      "/MarketPlace/pen3.svg",
      "/MarketPlace/pen4.svg",
    ],
    brand: "Kangaro",
    availability: "In Stock",
    specifications: [
      { key: "Punch Capacity", value: "30 Sheets" },
      { key: "Material", value: "Metal Body" },
      { key: "Color", value: "Silver/Blue" },
    ],
    highlights: [
      "Heavy-duty punch handles up to 30 sheets",
      "Strong metal build for durability",
      "Non-slip base for stable operation",
      "Compact design for easy storage",
    ],
    category: "office-supplies",
  },
  {
    id: "art-brush-set-copy",
    name: "Artist Pro Brush Set",
    price: 499.99,
    colors: ["#FFFFFF"],
    images: [
      "/MarketPlace/art1.svg",
      "/MarketPlace/art2.svg",
    ],
    brand: "ArtistPro",
    availability: "Limited Stock",
    specifications: [
      { key: "Brushes", value: "10 pieces" },
      { key: "Material", value: "Synthetic Hair" },
    ],
    highlights: [
      "Ideal for watercolor and acrylics",
      "Ergonomic handles for comfort",
    ],
    category: "art-essentials",
  },
];
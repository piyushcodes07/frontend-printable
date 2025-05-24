'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaSearch, FaMicrophone, FaMapMarkerAlt, FaShoppingCart, FaListUl, FaPencilAlt } from 'react-icons/fa';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQKey = 'return' | 'refund';

export default function BusinessCardPage() {
  const [quantity, setQuantity] = useState(1);
  const [faqOpen, setFaqOpen] = useState<Record<FAQKey, boolean>>({
    return: false,
    refund: false,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pensOpen, setPensOpen] = useState(false);
const [notebooksOpen, setNotebooksOpen] = useState(false);
const [pencilsOpen, setPencilsOpen] = useState(false);
const [showEdit, setShowEdit] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [officeOpen, setOfficeOpen] = useState(false);
  const [artOpen, setArtOpen] = useState(false);
  const thumbnails = ['/businesscard1.jpg', '/businesscard2.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : thumbnails.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < thumbnails.length - 1 ? prev + 1 : 0));
  };

  const handleFlip = () => {
    setCurrentIndex((prev) => (prev + 1) % thumbnails.length);
  };

  const toggleOffice = () => {
    setOfficeOpen(!officeOpen);
    if (!officeOpen) setArtOpen(false);
  };

  const toggleArt = () => {
    setArtOpen(!artOpen);
    if (!artOpen) setOfficeOpen(false);
  };


  const toggleFAQ = (key: FAQKey) => {
    setFaqOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
    // replace this with actual search logic
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
      setPensOpen(false);
      setNotebooksOpen(false);
      setPencilsOpen(false);
      setOfficeOpen(false);
      setArtOpen(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 font-sans">
      
      {/* Search Bar */}
      <div className="flex items-center mb-6">
  <div className="relative w-[800px] flex-shrink-0">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <FaMicrophone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full h-[40px] rounded-md border px-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D1F4F]"
    />
  </div>

  {/* Increased margin-left for bigger gap */}
  <div className="flex items-center ml-88 space-x-6 flex-shrink-0">
    <FaMapMarkerAlt className="text-gray-600 cursor-pointer" />
    <FaShoppingCart className="text-gray-600 cursor-pointer" />
    <FaListUl className="text-gray-600 cursor-pointer" />
  </div>
</div>


      {/* Category Buttons */}
<div className="flex gap-4 mb-6 relative z-10">
{/* Stationery Dropdown */}
<div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown toggle */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-4 py-2 text-[#1D1F4F] text-sm rounded flex items-center space-x-1 cursor-pointer hover:bg-transparent"
      >
        <span>Stationery</span>
        <svg
          className="w-4 h-4 text-[#1D1F4F]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown content - rendered only if dropdownOpen is true */}
      {dropdownOpen && (
        <div className="absolute left-0 bg-white border rounded shadow-md mt-1 w-48 z-20 p-1 space-y-1">
          {/* Pens submenu */}
          <div className="relative">
  <button
    onClick={() => {
      setPensOpen(!pensOpen);
      setNotebooksOpen(false);
      setPencilsOpen(false);
    }}
    className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] flex items-center justify-between hover:bg-transparent"
  >
    Pens
    <svg
      className="w-4 h-4 text-[#1D1F4F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={pensOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  </button>

  {pensOpen && (
    <div className="bg-white border rounded shadow-md mt-1 w-full">
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Gel Pens</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Ball Pens</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Roller Ball Pens</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Fountain Pens</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Ink and Cartridges</button>
    </div>
  )}
</div>


{/* Notebooks submenu */}
<div className="relative">
  <button
    onClick={() => {
      setNotebooksOpen(!notebooksOpen);
      setPensOpen(false);
      setPencilsOpen(false);
    }}
    className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] flex justify-between items-center hover:bg-transparent"
  >
    Notebooks
    <svg
      className="w-4 h-4 text-[#1D1F4F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={notebooksOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  </button>
  {notebooksOpen && (
    <div className="bg-white border rounded shadow-md mt-1 w-full">
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">A5 Notebooks</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Spiral Notebooks</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Hardcover Notebooks</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Pocket Notebooks</button>
    </div>
  )}
</div>

{/* Pencils submenu */}
<div className="relative">
  <button
    onClick={() => {
      setPencilsOpen(!pencilsOpen);
      setPensOpen(false);
      setNotebooksOpen(false);
    }}
    className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] flex justify-between items-center hover:bg-transparent"
  >
    Pencils
    <svg
      className="w-4 h-4 text-[#1D1F4F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={pencilsOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  </button>
  {pencilsOpen && (
    <div className="bg-white border rounded shadow-md mt-1 w-full">
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">HB Pencils</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Colored Pencils</button>
      <button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100">Mechanical Pencils</button>
    </div>
  )}
</div>

{/* Other options */}
<button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100 rounded">
  Sharpeners
</button>
<button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100 rounded">
  Sticky Notes
</button>
<button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100 rounded">
  Eraser & Correction
</button>
<button className="w-full text-left px-4 py-2 text-sm text-[#1D1F4F] hover:bg-gray-100 rounded">
  Notepads
</button>

        </div>
      )}
    </div>


  {/* Office Supplies */}
      <div className="relative inline-block">
      <button
  onClick={toggleOffice}
  className="px-4 py-2 text-[#1D1F4F] text-sm rounded flex items-center cursor-pointer hover:bg-transparent"
>
  Office Supplies
  <svg
    className="w-4 h-4 ml-1 text-[#1D1F4F]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
  </svg>
</button>

      {/* Dropdown menu */}
      {officeOpen && (
        <div className="absolute left-0 mt-1 w-48 bg-white border rounded shadow-md z-20 p-2 space-y-1">
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
            Folders
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
            Papers
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
            Staplers
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
            Tape & Adhesives
          </button>
        </div>
      )}
    </div>

      {/* Art Supplies */}
      <div className="relative inline-block" >
  <button
    onClick={toggleArt}
    className="px-4 py-2 text-[#1D1F4F] text-sm rounded flex items-center cursor-pointer hover:bg-transparent"
  >
    Art Supplies
    <svg
      className="w-4 h-4 ml-1 text-[#1D1F4F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>

  {artOpen && (
    <div className="absolute left-0 mt-1 w-48 bg-white border rounded shadow-md z-20 p-2 space-y-1">
      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">Brushes</button>
      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">Paints</button>
      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">Sketch Pads</button>
      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">Easels</button>
    </div>
  )}
</div>

</div>



      <div className="flex items-center gap-4 mb-6">
  <span 
  className="text-lg text-gray-700 cursor-pointer"
  onClick={() => console.log('Arrow clicked!')}
>
  ←
</span>
  <select
  className="rounded-lg px-3 py-1 text-sm text-gray-700 border border-transparent shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
  style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}
>
  <option value="">Orientation</option>
  <option value="landscape">Landscape</option>
  <option value="square">Portrait</option>
</select>

<select
  className="rounded-lg px-3 py-1 text-sm text-gray-700 border border-transparent shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
  style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}
>
  <option value="">Corner</option>
  <option value="sharp">Sharp</option>
  <option value="beveled">Rounded</option>
</select>


</div>
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[400px]">
        {/* Image Section */}
        <div className="flex flex-col" style={{ height: '400px' }}>
  <div
  className="rounded-lg p-2 relative cursor-pointer flex-grow flex justify-center items-center"
  style={{ 
    minHeight: '350px',
    boxShadow: 'inset 0 10px 20px rgba(0, 0, 0, 0.4)'
  }}
  onClick={handleFlip}
>
  <img
    src={thumbnails[currentIndex]}
    alt="Business Card"
    style={{ maxWidth: '60%', maxHeight: '60%' }}
  />
  <p className="text-center text-sm text-gray-500 mt-4 w-full absolute bottom-2 left-0">
    Click on the card to flip
  </p>
  <button
    onClick={(e) => {
      e.stopPropagation();
      setShowEdit(true);
    }}
    className="absolute top-2 right-2 text-xl"
  >
    <FaPencilAlt />
  </button>
{showEdit && (
  <div className="min-h-screen bg-white flex items-center justify-center p-6">
    <div className="flex w-full max-w-7xl border rounded-2xl overflow-hidden shadow-md">
      {/* Left Preview */}
      <div className="w-6/12 bg-white flex items-center justify-center p-10">
        <div className="bg-white rounded-lg shadow-md p-4 w-[300px] h-[180px] flex items-center justify-center">
          <img
            src="/modal.png"
            alt="Business Card Preview"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      </div>  

      {/* Right Form */}
      <div className="w-6/12 bg-[#E6E6EE] p-8 relative rounded-r-2xl">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-black" onClick={() => setShowEdit(false)}>
  <X />
</button>

        <h2 className="text-2xl font-medium text-center mb-6">Enter your Details</h2>

        <div className="flex gap-4">
          {/* Left column inputs */}
          <div className="flex flex-col gap-3 w-1/2">
            <input placeholder="Name" className="px-3 py-2 rounded border border-gray-400 bg-white" />
            <input placeholder="Company Name" className="px-3 py-2 rounded border border-gray-400 bg-white" />
            <input placeholder="Mobile number" className="px-3 py-2 rounded border border-gray-400 bg-white" />
            <input placeholder="Office Contact No." className="px-3 py-2 rounded border border-gray-400 bg-white" />
          </div>

          {/* Upload box */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="h-[180px] w-full border border-dashed border-gray-500 rounded-md flex items-center justify-center text-center px-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-10 w-10 mb-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l6 6-6 6M21 7l-6 6 6 6" />
                </svg>
                <p className="text-sm text-gray-700">
                  Upload an image<br />
                  (Make sure the size is<br /> under 5 MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

          </div>

          {/* Thumbnail navigation */}
<div className="flex items-center justify-center mt-4 gap-2">
      <button onClick={handlePrev} className="px-2 text-lg">{'<'}</button>
      {thumbnails.map((src, index) => (
        <img
          key={index}
          src={src}
          onClick={() => setCurrentIndex(index)}
          className={`w-16 h-10 cursor-pointer border rounded ${index === currentIndex ? 'border-blue-500' : 'border-gray-300'}`}
          alt={`Thumbnail ${index + 1}`}
        />
      ))}
      <button onClick={handleNext} className="px-2 text-lg">{'>'}</button>
    </div>
  </div>

  {/* Right side - Details */}
  <div className="flex flex-col h-full p-4 justify-between">
    {/* Top: Title & Price */}
    <div>
      <h2 className="text-lg font-semibold mb-2">Business Card [Standard]</h2>
      <p className="text-sm mb-2">
        Price: <span className="text-lg font-bold">Rs 299/-</span>
      </p>
    </div>

    {/* Middle: List with flex-grow */}
    <ul className="text-sm text-gray-700 list-disc pl-5 mb-4 flex-grow overflow-auto">
      <li>4000+ design options available</li>
      <li>Standard glossy or matte paper included</li>
      <li>Need help in designing? You can avail our Design Services</li>
      <li>Same Day Delivery available on select pin codes in Mumbai</li>
      <li>
        Orders placed before 12 noon under Same Day delivery. Orders placed post 12
        noon will be delivered the next working day
      </li>
      <li>Same day delivery orders will be delivered between 6 PM to 10 PM</li>
      <li>
        Note: Please do not print designs belonging to Government/Quasi Government
        bodies
      </li>
    </ul>

    {/* Bottom: Color and Quantity controls */}
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm mb-1">Color:</p>
        <div className="flex gap-2">
          <span className="w-4 h-4 rounded-full bg-black inline-block"></span>
          <span className="w-4 h-4 rounded-full bg-purple-900 inline-block"></span>
          <span className="w-4 h-4 rounded-full bg-red-900 inline-block"></span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="border rounded px-2 py-1"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          className="border rounded px-2 py-1"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>


         {/* Action Buttons */}
<div className="flex gap-4 w-full mt-8">
  <button className="flex-1 bg-[#1D1F4F] text-white py-2 rounded hover:bg-[#15173a] transition">
    Add to Cart
  </button>
  <button className="flex-1 border border-[#1D1F4F] text-[#1D1F4F] py-2 rounded hover:bg-[#f0f0f0] transition">
    Buy Now
  </button>
</div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h3 className="font-semibold text-lg mb-4">Frequently Asked Question</h3>

        <div className="border-t py-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ('return')}
          >
            <span className="font-medium text-sm">How do I return a product?</span>
            {faqOpen.return ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {faqOpen.return && (
            <p className="text-sm text-gray-700 mt-2">
              You can initiate a return from your order history page.
            </p>
          )}
        </div>

        <div className="border-t py-3">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ('refund')}
          >
            <span className="font-medium text-sm">
              How long will it take to receive my refund?
            </span>
            {faqOpen.refund ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {faqOpen.refund && (
            <p className="text-sm text-gray-700 mt-2">
              Refunds are typically processed within 5-7 business days.
            </p>
          )}
        </div>
      </div>

      {/* Merged Top Picks Section */}
      <div className="mt-24">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Top Picks</h3>
          <a href="#" className="text-sm text-[#5B5B9E] hover:underline">View all</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              brand: 'Kaco',
              name: 'Klip 0.5mm Gel Pen',
              price: '₹899.10',
              original: '₹999.00',
              colors: ['#000000', '#7B1E1E', '#5A0000'],
            },
            {
              brand: 'Kaco',
              name: 'Klip 0.5mm Gel Pen',
              price: '₹899.10',
              original: '₹999.00',
              colors: ['#000000', '#7B1E1E', '#5A0000'],
            },
            {
              brand: 'Kaco',
              name: 'Klip 0.5mm Gel Pen',
              price: '₹899.10',
              original: '₹999.00',
              colors: ['#000000', '#7B1E1E', '#5A0000'],
            },
            {
              brand: 'Kaco',
              name: 'Klip 0.5mm Gel Pen',
              price: '₹899.10',
              original: '₹999.00',
              colors: ['#000000', '#7B1E1E', '#5A0000'],
            },
            {
              brand: 'Solo',
              name: 'Solo 5 Subject Notebook A5',
              price: '₹256.10',
              original: '₹285.00',
              colors: ['#FFDA00', '#E6007E', '#5A0000'],
            },
            {
              brand: 'XI Eleven',
              name: 'Manifestation A5',
              price: '₹350',
              original: '',
              colors: ['#1C1C4B', '#500000'],
            },
            {
              brand: 'Kangaroo',
              name: 'DP-800 paper Punch',
              price: '₹1,885.10',
              original: '₹1,985.00',
              colors: ['#000000'],
            },
          ].map((product, i) => (
            <div key={i} className="border rounded-lg p-3 shadow-sm">
              <img
                src="/modal.png"
                alt={product.name}
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-xs text-gray-500">{product.brand}</p>
              <p className="text-sm font-medium mb-1">{product.name}</p>
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="font-semibold">{product.price}</span>
                {product.original && (
                  <span className="line-through text-gray-400">{product.original}</span>
                )}
              </div>
              <div className="flex gap-1">
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

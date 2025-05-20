// CategoryPage.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { products as allProducts, Product } from "@/app/db/productData";
import ProductSearch from "./ProductSearch";
import DropdownFilter from "./DropdownFilter";
import Stationery from "@/components/MarketPlaceSection/Stationery";
import OfficeSupplies from "@/components/MarketPlaceSection/OfficeSupplies";
import ArtSupplies from "@/components/MarketPlaceSection/ArtSupplies";
import CategoryFilter from "./CategoryFilter";
import AllProducts from "./AllProducts";

interface CategoryPageProps {
  category: string;
  onProductClick: (id: string) => void;
  onBack: () => void;
}

const dropdownCategories = [
  { label: "Stationery", component: Stationery },
  { label: "Office Supplies", component: OfficeSupplies },
  { label: "Art Supplies", component: ArtSupplies },
];

const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  onProductClick,
  onBack,
}) => {
  const [filters, setFilters] = useState<
    Record<string, string[] | string | null>
  >({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.zIndex = "1";
    }
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    let matchesCategory = product.category === category;
    let matchesAvailability = true;
    let matchesBrand = true;
    let matchesPrice = true;

    return (
      matchesCategory && matchesAvailability && matchesBrand && matchesPrice
    );
  });

  const handleFiltersChanged = (
    newFilters: Record<string, string[] | string | null>
  ) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto p-4 mt-2 max-w-6xl" ref={containerRef}>
      {/* Added ref here */}
      <div className="px-4">
        {/* Search Bar */}
        <div className="mb-4">
          <ProductSearch />
        </div>

        {/* Dropdown Filters */}
        <div className="relative z-20">
          {/* Added z-index here */}
          <DropdownFilter categories={dropdownCategories} />
        </div>

        {/* Back Button */}
        <div className="mt-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:underline"
          >
            <img
              src="/MarketPlace/back.svg"
              alt="Back to Home"
              className="cursor-pointer w-6 h-6"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-around gap-12 p-4">
        <div>
          {/* Category Filter Component */}
          <CategoryFilter onFiltersChanged={handleFiltersChanged} />
        </div>
        <div>
          {/* Category Name Heading */}
          <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
          {/* Product Grid for the Current Category */}
          <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
            {filteredProducts.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              filteredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="min-w-[240px] bg-white rounded-lg  hover:shadow-lg transition duration-300 cursor-pointer relative"
                  onClick={() => onProductClick(product.id)}
                >
                  {/* Inner Shadow Effect */}
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <div className="relative z-10">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-contain p-4"
                    />
                  </div>
                  <div className="p-4 relative z-10">
                    <h3 className="text-sm font-semibold truncate">
                      {product.brand} {product.name}
                    </h3>
                    <p className="text-gray-700">₹{product.price.toFixed(2)}</p>
                    {/* Color display added here */}
                    <div className="flex space-x-2 mt-2">
                      {product.colors?.map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* All Products Component */}
      <div className="mt-10 px-2">
        <h2 className="text-2xl font-semibold mb-6">
          Other items you may like
        </h2>
        <AllProducts onProductClick={onProductClick} />
      </div>
    </div>
  );
};

export default CategoryPage;

// components/AllProducts.tsx
"use client";

import React from "react";
import { Product, products } from "@/app/db/productData";

interface AllProductsProps {
  onProductClick: (productId: string) => void;
}

const AllProducts: React.FC<AllProductsProps> = ({ onProductClick }) => {
  return (
    <div className="mt-8 px-2">
      <div className="flex justify-between items-center mb-4"></div>

      <div className="overflow-x-auto">
        <div className="flex space-x-6 w-max pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[240px] bg-white rounded-lg  hover:shadow-lg transition duration-300 cursor-pointer relative"
              onClick={() => onProductClick(product.id)}
            >
              {/* Inner Shadow Effect (using a pseudo-element) */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)", // Increased opacity
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
                <h3 className="text-sm font-semibold text-gray-700 truncate">
                  {product.brand} {product.name}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-gray-600">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

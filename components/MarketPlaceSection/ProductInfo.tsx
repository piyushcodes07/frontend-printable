import React from "react";
import { Product } from "@/app/db/productData";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-2xl font-bold text-gray-900">{product.brand}</h3>
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

      {/* Highlights Section */}
      {product.highlights && product.highlights.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm text-gray-700 font-medium mb-1 uppercase">
            Product Highlights
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            {product.highlights.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Price Display */}
      <div className="flex items-center space-x-3 mt-2">
        <span className="text-xl font-semibold text-gray-900">
          ₹{product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-sm line-through text-gray-400">
            ₹{product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

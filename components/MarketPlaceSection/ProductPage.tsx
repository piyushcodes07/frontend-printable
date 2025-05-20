"use client";

import React, { useState } from "react";
import { products } from "@/app/db/productData";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import ProductSearch from "./ProductSearch";
import ProductDetails from "./ProductDetails";
import FAQSection from "./FAQSection";
import DropdownFilter from "./DropdownFilter";
import Stationery from "./Stationery";
import OfficeSupplies from "./OfficeSupplies";
import ArtSupplies from "./ArtSupplies";

interface ProductPageProps {
  productId: string;
  onBack: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <p className="text-center mt-20 text-lg text-red-600">
        Product not found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-2 max-w-6xl">
      {/* Search Bar */}
      <div className="px-4">
        <div className="mb-4">
          <ProductSearch />
        </div>

        {/* Dropdown Filters */}
        <DropdownFilter
          categories={[
            { label: "Stationery", component: Stationery },
            { label: "Office Supplies", component: OfficeSupplies },
            { label: "Art Supplies", component: ArtSupplies },
          ]}
        />

        {/* Back Button */}
        <div className="mb-6 mt-4">
          <button
            onClick={onBack}
            className="text-black flex items-center gap-2 text-lg hover:no-underline focus:outline-none"
          >
            <img
              src="/MarketPlace/back.svg"
              alt="Go back"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col md:flex-row justify-around gap-12 p-4">
        <div className="w-full md:w-1/2">
          <ProductGallery images={product.images} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <ProductInfo product={product} />
          <ProductActions
            quantity={quantity}
            setQuantity={setQuantity}
            onBuy={() => console.log("Buying...", product)}
            onAddToCart={() => console.log("Adding to cart...", product)}
            colors={product.colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
      </div>

      <div>
        <ProductDetails product={product} />
        <div className="mt-4">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

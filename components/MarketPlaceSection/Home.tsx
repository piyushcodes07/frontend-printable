"use client";

import React, { useState } from "react";
import ProductSearch from "@/components/MarketPlaceSection/ProductSearch";
import Stationery from "@/components/MarketPlaceSection/Stationery";
import OfficeSupplies from "@/components/MarketPlaceSection/OfficeSupplies";
import ArtSupplies from "@/components/MarketPlaceSection/ArtSupplies";
import { Button } from "@/components/ui/button";
import { products } from "@/app/db/productData";
import ProductPage from "./ProductPage";
import DropdownFilter from "./DropdownFilter";
import CategoryPage from "./CategoryPage";
import AllProducts from "./AllProducts";

const categories = [
  { label: "Diary", value: "diaries", image: "/MarketPlace/diary1.svg" },
  { label: "Pens", value: "pens", image: "/MarketPlace/pen1.svg" },
  {
    label: "Calculator",
    value: "office-supplies",
    image: "/MarketPlace/calci1.svg",
  },
  {
    label: "Art Essentials",
    value: "art-essentials",
    image: "/MarketPlace/pen1.svg",
  },
];

const dropdownCategories = [
  { label: "Stationery", component: Stationery },
  { label: "Office Supplies", component: OfficeSupplies },
  { label: "Art Supplies", component: ArtSupplies },
];

const Home = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const productSubset = products.slice(0, 5);

  if (selectedProductId !== null) {
    return (
      <div className="container mx-auto p-4 mt-2 max-w-6xl">
        <ProductPage
          productId={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      </div>
    );
  }

  if (selectedCategory !== null) {
    return (
      <div className="container mx-auto p-4 mt-2 max-w-6xl">
        <CategoryPage
          category={selectedCategory}
          onProductClick={(id) => setSelectedProductId(id)}
          onBack={() => setSelectedCategory(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-2 max-w-6xl">
      <div className="px-4">
        <div className="mb-4">
          <ProductSearch />
        </div>

        <DropdownFilter categories={dropdownCategories} />
      </div>

      <div className="mt-10 px-4">
        <div className="w-full rounded-xl overflow-hidden shadow-xl bg-white">
          <img
            src="/MarketPlace/home.svg"
            alt="Marketplace Banner"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* Best Sellers */}
        <div className="mt-10 px-2">
          <h2 className="text-2xl font-semibold mb-6">BestSellers</h2>
          <AllProducts onProductClick={setSelectedProductId} />{" "}
          {/* Corrected prop passing */}
        </div>

        {/* Shop by Categories */}
        <div className="mt-10 px-2">
          <h2 className="text-2xl font-semibold mb-6">Shop by Categories</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-6 w-max whitespace-nowrap">
              {categories.map((category) => (
                <Button
                  key={category.label}
                  variant="ghost"
                  className="flex flex-col items-center text-lg w-48 h-48 rounded-lg p-6 bg-white shadow-md hover:bg-gray-200 hover:shadow-lg transition duration-300" // Increased w-40 to w-48 and h-40 to h-48 and p-4 to p-6
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <div className="w-32 h-32 rounded-md overflow-hidden mb-2">
                    {" "}
                    {/* Increased w-24 to w-32 and h-24 to h-32 */}
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-center">{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

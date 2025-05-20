import React, { useState, useEffect, useRef } from "react";
import Location from "@/components/MarketPlaceSection/Location";
import Cart from "./Cart";
import Sort from "./Sort";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanel, setActivePanel] = useState<
    "location" | "cart" | "sort" | null
  >(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setActivePanel(null);
      }
    };

    if (activePanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePanel]);

  return (
    <div className="relative flex flex-col space-y-4">
      {/* Top Row: Search + Icons */}
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div
          className="flex items-center bg-gray-200 rounded-full px-4 py-2 shadow-md"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <img
            src="./MarketPlace/Search.svg"
            alt="Search"
            className="h-5 w-5 mr-3"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
            className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
          <button className="rounded-full">
            <img
              src="./MarketPlace/mic.svg"
              alt="Mic"
              className="h-5 w-5 ml-3"
            />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-10 ml-4 relative">
          <button
            onClick={() =>
              setActivePanel(activePanel === "location" ? null : "location")
            }
            className="hover:shadow-lg hover:bg-gray-200 p-2 rounded-full"
          >
            <img
              src="./MarketPlace/location.png"
              alt="Location"
              className="h-5 w-5"
            />
          </button>
          <button
            onClick={() =>
              setActivePanel(activePanel === "cart" ? null : "cart")
            }
            className="hover:shadow-lg hover:bg-gray-200 p-2 rounded-full"
          >
            <img src="./MarketPlace/cart.svg" alt="Cart" className="h-5 w-5" />
          </button>
          <div className="relative" ref={panelRef}>
            <button
              onClick={() =>
                setActivePanel(activePanel === "sort" ? null : "sort")
              }
              className="hover:shadow-lg hover:bg-gray-200 p-2 rounded-full"
            >
              <img
                src="./MarketPlace/sort.svg"
                alt="Sort"
                className="h-5 w-5"
              />
            </button>

            {/* Sort panel (positioned absolutely under icon) */}
            {activePanel === "sort" && (
              <div className="absolute right-40 transform translate-x-full mt-2">
                <Sort />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;

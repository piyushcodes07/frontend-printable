"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Home from "../../components/MarketPlaceSection/Home";

type Page = "home" | "bestseller" | "product";

const MarketPlace: React.FC = () => {
  // State for the currently active dropdown ('stationery', 'office', 'art', or null).
  const [activeDropdown, setActiveDropdown] = useState<
    "stationery" | "office" | "art" | null
  >(null);

  // Ref for the dropdown container to detect outside clicks.
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State for the currently displayed page ('home', 'bestseller', 'product').
  const [activePage, setActivePage] = useState<Page>("home");

  // State for the ID of the selected product (for product details page).
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Effect to close the dropdown when clicking outside the dropdown area.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Runs once on mount and unmount.

  // Reusable component for the dropdown toggle buttons.
  const DropdownButton = ({
    label,
    id,
  }: {
    label: string;
    id: "stationery" | "office" | "art";
  }) => (
    <button
      onClick={() => setActiveDropdown((prev) => (prev === id ? null : id))}
      className="flex items-center space-x-1 font-medium hover:text-gray-600 focus:outline-none"
      type="button"
    >
      <span>{label}</span>
      <ChevronDown size={16} className="mt-0.5" />
    </button>
  );

  return (
    <div className="container mx-auto p-4 mt-2">
      {/* Renders the Home component for the marketplace. */}
      <Home />
    </div>
  );
};

export default MarketPlace;

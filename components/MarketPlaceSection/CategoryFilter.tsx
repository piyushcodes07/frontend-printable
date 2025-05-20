// CategoryFilter.tsx
"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid"; // For the Filter icon

interface CategoryFilterProps {
  onFiltersChanged: (filters: Record<string, string[] | string | null>) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onFiltersChanged,
}) => {
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const availabilityOptions = [
    { label: "In stock", count: 155 },
    { label: "Out of stock", count: 326 },
  ];
  const brandOptions = [
    { label: "Brand A", count: 50 },
    { label: "Brand B", count: 75 },
    { label: "Brand C", count: 100 },
    { label: "Brand D", count: 25 },
    { label: "Brand E", count: 60 },
  ];
  const colorOptions = [
    { label: "Black", count: 100, value: "black" },
    { label: "Blue", count: 80, value: "blue" },
    { label: "Red", count: 120, value: "red" },
    { label: "Green", count: 90, value: "green" },
  ];
  const priceRanges = [
    { label: "Under ₹50", count: 20, value: "under_50" },
    { label: "₹50 - ₹200", count: 60, value: "50_200" },
    { label: "₹200 - ₹500", count: 45, value: "200_500" },
    { label: "₹500+", count: 30, value: "500_plus" },
  ];

  const handleAvailabilityToggle = () => setAvailabilityOpen(!availabilityOpen);
  const handleBrandToggle = () => setBrandOpen(!brandOpen);
  const handleColorToggle = () => setColorOpen(!colorOpen);
  const handlePriceToggle = () => setPriceOpen(!priceOpen);

  const handleAvailabilityChange = (label: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
    onFiltersChanged({ ...currentFilters, availability: selectedAvailability });
  };

  const handleBrandChange = (label: string) => {
    setSelectedBrands((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
    onFiltersChanged({ ...currentFilters, brand: selectedBrands });
  };

  const handleColorChange = (value: string) => {
    setSelectedColors((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    onFiltersChanged({ ...currentFilters, color: selectedColors });
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    onFiltersChanged({ ...currentFilters, price: value });
  };

  const currentFilters = {
    availability: selectedAvailability,
    brand: selectedBrands,
    color: selectedColors,
    price: selectedPrice,
  };

  return (
    <div
      className="bg-white rounded-md shadow-lg shadow-gray-700  w-60 p-3"
      style={{
        minHeight: "350px", // Added minimum height
      }}
    >
      {/* Filter Button */}
      <button className="flex items-center text-sm text-gray-700 py-1 px-2 rounded-md border border-gray-300 bg-gray-50 w-fit mb-2 shadow-lg shadow-gray-500">
        <FunnelIcon className="w-4 h-4 mr-1" />
        Filter
      </button>

      {/* Availability Filter */}
      <div className="py-1">
        <button
          className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
          onClick={handleAvailabilityToggle}
        >
          Availability
          {availabilityOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {availabilityOpen && (
          <ul className="mt-1 pl-3">
            {availabilityOptions.map((option) => (
              <li key={option.label} className="py-0.5">
                <button
                  onClick={() => handleAvailabilityChange(option.label)}
                  className={`flex justify-between items-center text-sm text-gray-700 w-full ${
                    selectedAvailability.includes(option.label)
                      ? "font-semibold"
                      : ""
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-gray-500">({option.count})</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Brand Filter */}
      <div className="py-1">
        <button
          className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
          onClick={handleBrandToggle}
        >
          Brand
          {brandOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {brandOpen && (
          <ul className="mt-1 pl-3">
            {brandOptions.map((option) => (
              <li key={option.label} className="py-0.5">
                <button
                  onClick={() => handleBrandChange(option.label)}
                  className={`flex justify-between items-center text-sm text-gray-700 w-full ${
                    selectedBrands.includes(option.label) ? "font-semibold" : ""
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-gray-500">({option.count})</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Filter */}
      <div className="py-1">
        <button
          className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
          onClick={handlePriceToggle}
        >
          Price
          {priceOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {priceOpen && (
          <ul className="mt-1 pl-3">
            {priceRanges.map((option) => (
              <li key={option.value} className="py-0.5">
                <button
                  onClick={() => handlePriceChange(option.value)}
                  className={`flex justify-between items-center text-sm text-gray-700 w-full ${
                    selectedPrice === option.value ? "font-semibold" : ""
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-gray-500">({option.count})</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ink Color Filter (Example) */}
      <div className="py-1">
        <button
          className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
          onClick={handleColorToggle}
        >
          Ink Color
          {colorOpen ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {colorOpen && (
          <ul className="mt-1 pl-3">
            {colorOptions.map((option) => (
              <li key={option.value} className="py-0.5">
                <button
                  onClick={() => handleColorChange(option.value)}
                  className={`flex justify-between items-center text-sm text-gray-700 w-full ${
                    selectedColors.includes(option.value) ? "font-semibold" : ""
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-gray-500">({option.count})</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;

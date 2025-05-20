import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for toggling subcategories

const categories = [
  { title: "Paints", subcategories: ["Acrylic", "Oil", "Watercolor"] },
  { title: "Brushes", subcategories: ["Round", "Flat", "Fan"] },
  { title: "Canvas", subcategories: [] },
  { title: "Sketchbooks", subcategories: [] },
  { title: "Palettes", subcategories: [] },
  { title: "Easels", subcategories: [] },
];

const ArtSupplies = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory((prev) => (prev === title ? null : title));
  };

  return (
    <div className="absolute bg-white shadow-lg rounded-lg p-4 z-50 w-64 border border-gray-200">
      <ul className="space-y-2 text-sm">
        {categories.map((category) => (
          <li key={category.title}>
            {/* Category Header */}
            <div
              onClick={() => toggleCategory(category.title)}
              className="flex items-center justify-between font-semibold hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            >
              <span>{category.title}</span>
              {category.subcategories.length > 0 &&
                (expandedCategory === category.title ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                ))}
            </div>

            {/* Subcategories */}
            {expandedCategory === category.title &&
              category.subcategories.length > 0 && (
                <ul className="ml-4 mt-2 space-y-1 text-gray-700">
                  {category.subcategories.map((sub) => (
                    <li key={sub} className="cursor-pointer hover:underline">
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtSupplies;

// components/DropdownFilter.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownFilterProps {
  categories: {
    label: string;
    component: React.FC;
  }[];
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ categories }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // Close dropdown if clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex space-x-20 mt-10 font-medium text-[1.2rem] relative z-10"
      ref={dropdownRef}
    >
      {categories.map(({ label, component: Component }) => {
        const id = label.toLowerCase().replace(/\s+/g, "-");
        return (
          <div key={id} className="relative">
            <button
              onClick={() => handleDropdownClick(id)}
              className="flex items-center px-3 py-1 gap-2 cursor-pointer focus:outline-none"
            >
              <span className="text-[1.2rem] font-normal">{label}</span>
              <ChevronDown size={28} strokeWidth={2} />
            </button>
            {activeDropdown === id && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-xl p-2 z-50">
                <Component />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DropdownFilter;

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuItem {
  label: string;
  subItems?: string[];
}

interface DropdownProps {
  title: string;
  items: MenuItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 font-semibold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white shadow-lg border rounded-lg w-64 z-50 p-3">
          {items.map((item, idx) => (
            <div key={idx}>
              <div
                className="cursor-pointer font-semibold hover:text-blue-600 flex justify-between"
                onClick={() =>
                  setExpanded(expanded === item.label ? null : item.label)
                }
              >
                <span>{item.label}</span>
                {item.subItems && (
                  <span>
                    {expanded === item.label ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </span>
                )}
              </div>

              {item.subItems && expanded === item.label && (
                <div className="ml-4 mt-1 space-y-1 text-sm text-gray-700">
                  {item.subItems.map((sub, subIdx) => (
                    <div key={subIdx} className="hover:underline">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

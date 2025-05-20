import React from "react";

interface ProductActionsProps {
  quantity: number;
  setQuantity: (qty: number) => void;
  onBuy: () => void;
  onAddToCart: () => void;
  colors?: string[];
  selectedColor?: string;
  setSelectedColor?: (color: string) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  quantity,
  setQuantity,
  onBuy,
  onAddToCart,
  colors = [],
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <div className="mt-6 flex flex-col space-y-6">
      {/* Selection Section: Color + Quantity */}
      <div className="flex justify-between">
        {/* Color Selector */}
        {colors.length > 0 && setSelectedColor && (
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-700">Color:</span>
            <div className="flex space-x-2">
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color
                      ? "border-indigo-700 ring-2 ring-indigo-300"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center border rounded px-2 bg-gray-200">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 px-2 text-xl"
          >
            -
          </button>
          <span className="px-3">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 px-2 text-xl"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Section: Buy Now + Add to Cart */}
      <div className="flex justify-between">
        <button
          onClick={onBuy}
          className="bg-indigo-700 hover:bg-gray-400 text-white px-15 py-2 rounded-2xl"
        >
          Buy Now
        </button>
        <button
          onClick={onAddToCart}
          className="bg-indigo-700  hover:bg-gray-400 text-white px-15 py-2 rounded-2xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductActions;

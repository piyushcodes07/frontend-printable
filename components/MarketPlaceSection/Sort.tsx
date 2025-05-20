import React from "react";

const Sort = () => {
  const sortOptions = ["Name A-Z", "Size", "Popularity"];

  return (
    <div className="absolute bg-gray-200 shadow-lg rounded-lg p-2 mt-2 w-40 z-10">
      <ul className="space-y-2">
        {sortOptions.map((option) => (
          <li key={option}>
            <button className="w-full text-left p-2 bg-white rounded-md hover:bg-gray-300">
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;

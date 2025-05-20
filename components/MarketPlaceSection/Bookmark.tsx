import React, { useState } from "react";
import { Bookmark as BookmarkIcon } from "lucide-react";

interface BookmarkProps {
  productId: number;
}

const Bookmark: React.FC<BookmarkProps> = ({ productId }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
    // Optionally update a global store or localStorage here.
  };

  return (
    <button onClick={toggleBookmark} className="flex items-center space-x-2">
      <BookmarkIcon size={25} className="text-gray-500" />
      <span className="text-sm">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
    </button>
  );
};

export default Bookmark;

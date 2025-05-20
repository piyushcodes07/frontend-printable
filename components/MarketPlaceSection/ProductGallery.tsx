import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  const prevImage = () => {
    setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="relative w-full flex items-center justify-center ">
        <button onClick={prevImage} className="text-[3rem] px-4">
          &#x2039;
        </button>
        <div
          className="relative w-[400px] h-[300px]  rounded-lg overflow-hidden"
          style={{
            boxShadow:
              "10px -10px 15px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Image
            src={images[selected]}
            alt={`Product Image ${selected + 1}`}
            width={400}
            height={300}
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        <button onClick={nextImage} className="text-[3rem] px-4">
          &#x203A;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 mt-10">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`border rounded-md overflow-hidden w-16 h-16 ${
              selected === index ? "ring-2 ring-blue-600" : ""
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

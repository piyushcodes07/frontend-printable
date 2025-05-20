// components/ProductPage/ProductDetails.tsx
import React, { useState } from "react";
import { Product } from "@/app/db/productData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [openAvailability, setOpenAvailability] = useState(false);
  const [openSpec, setOpenSpec] = useState(false);

  return (
    <div className="mt-8">
      {/* Availability with Toggle */}
      {product.availability && (
        <div className="mb-4">
          <h3
            className="text-lg font-semibold cursor-pointer flex justify-between items-center"
            onClick={() => setOpenAvailability(!openAvailability)}
          >
            Availability
            {openAvailability ? (
              <ChevronUp size={20} strokeWidth={3} />
            ) : (
              <ChevronDown size={20} strokeWidth={3} />
            )}
          </h3>
          {openAvailability && (
            <p className="mt-2 text-gray-700 text-sm">{product.availability}</p>
          )}
        </div>
      )}

      {/* Specifications with Toggle */}
      <div className="pt-4">
        <h3
          className="text-lg font-semibold cursor-pointer flex justify-between items-center"
          onClick={() => setOpenSpec(!openSpec)}
        >
          Specifications
          {openSpec ? (
            <ChevronUp size={20} strokeWidth={3} />
          ) : (
            <ChevronDown size={20} strokeWidth={3} />
          )}
        </h3>
        {openSpec && (
          <div className="mt-3 text-sm text-gray-700">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
              {product.specifications?.map((spec) => (
                <React.Fragment key={spec.key}>
                  <dt className="font-medium">{spec.key}</dt>
                  <dd>{spec.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

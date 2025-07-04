"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Address = {
  id: number;
  label: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  cityStatePincode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "Jay Vasani",
    addressLine1: "144, Krishnapark Society, Nr. Radhika society",
    addressLine2: "Nansad Road, Nansad, Kamrej",
    cityStatePincode: "SURAT, GUJARAT 394185",
    country: "India.",
    phone: "9173664845",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Jay Vasani",
    addressLine1: "144, Krishnapark Society, Nr. Radhika society",
    addressLine2: "Nansad Road, Nansad, Kamrej",
    cityStatePincode: "SURAT, GUJARAT 394185",
    country: "India.",
    phone: "9173664845",
    isDefault: false,
  },
];

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const setAsDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const removeAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-8 md:px-12 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Saved Addresses</h2>
          <p className="text-sm text-gray-500">Manage your shipping addresses.</p>
        </div>
        <button className="flex items-center gap-2 border border-black px-4 py-2 rounded-full text-sm hover:bg-gray-100">
          <FaPlus />
          Add New Address
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-gray-100 rounded-lg p-6 w-[360px] shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{addr.label}</h3>
              {addr.isDefault && (
                <span className="text-xs border border-gray-300 px-2 py-0.5 rounded-full text-gray-600">
                  Default
                </span>
              )}
            </div>
            <p className="font-semibold">{addr.name}</p>
            <p>{addr.addressLine1}</p>
            <p>{addr.addressLine2}</p>
            <p>{addr.cityStatePincode}</p>
            <p>{addr.country}</p>
            <p className="mt-1">Phone number: {addr.phone}</p>

            <div className="mt-4 flex gap-4 text-sm text-gray-700 flex-wrap">
              <button className="hover:underline">Edit</button>
              <span>|</span>
              <button onClick={() => removeAddress(addr.id)} className="hover:underline">
                Remove
              </button>
              {!addr.isDefault && (
                <>
                  <span>|</span>
                  <button
                    onClick={() => setAsDefault(addr.id)}
                    className="hover:underline"
                  >
                    Set as Default
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { sign } from "crypto";

interface SigneeType {
  firstName: string;
  lastName: string;
  email: string;
  bg: string;
  outline?: string ;
}

interface SigneeProps {
  signees: SigneeType[];
  removeSignee: any;
}

const SigneeCard = ({ signees, removeSignee }: SigneeProps) => {
  return (
    <>
      {}
      {signees.length > 0 && (
        <div className=" rounded-[5px]  mb-4 ">
          <h2 className="text-lg font-semibold mb-2">Other signees</h2>
          {signees.map((signee, index) => {
            const backgroundColor = signee.bg;
            const initial = signee.firstName
              ? signee.firstName.charAt(0).toUpperCase()
              : "?";

            return (
              <div
                key={index}
                className={`flex slide-down items-center p-2 mb-2 border-2 border-b-blue-700 bg-white rounded-md `}
                style={{ border: `2px solid ${signee.outline}` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2"
                  style={{ backgroundColor }}
                >
                  {initial}
                </div>
                <div className="flex-1 w-[30vh] overflow-hidden  ">
                  <p className="font-medium">
                    {signee.firstName} {signee.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{signee.email}</p>
                </div>
                <svg
                  className="w-5 h-5 cursor-pointer text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => removeSignee(index)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default SigneeCard;

"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import SigneeCard from "./singeeCard";
import { useSignUrl } from "../useSign";
import { useUser } from "@clerk/nextjs";

interface Signee {
  email: string;
  firstName: string;
  lastName: string;
  bg: string;
  outline?: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
}

function SingerDetailsForm({ onlyOther }: { onlyOther: boolean }) {
  const [addSignee, setAddSignee] = useState(false);
  const { setSignerEmail } = useSignUrl();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signees, setSignees] = useState<Signee[]>([]);
  const { user } = useUser();
  const [errors, setErrors] = useState<FormErrors>({});

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const currentUser: Signee = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    bg: getRandomColor(),
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRepeat = signees.find((signee) => signee.email === email);

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    } else if (emailRepeat) {
      newErrors.email = "Email already added!";
    }

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSignee = () => {
    if (!validateForm()) return;

    const newSignee: Signee = {
      email,
      firstName,
      lastName,
      bg: getRandomColor(),
      outline: getRandomColor(),
    };

    setSignerEmail(email);
    setSignees((prev) => [...prev, newSignee]);
    setEmail("");
    setFirstName("");
    setLastName("");
    setAddSignee(false);
    setErrors({});
  };

  const removeSignee = (index: number) => {
    setSignees((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="signeeForm">
      {onlyOther && (
        <div className="rounded-[5px] fade-in mb-4">
          <h2 className="mb-2 font-bold">Your Details</h2>
          <div className="flex slide-down items-center p-2 mb-2 border-2 border-b-blue-700 bg-white rounded-md">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-2">
              <img
                src={user?.imageUrl}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 w-[30vh] overflow-hidden">
              <p className="font-medium">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>
      )}

      <SigneeCard signees={signees} removeSignee={removeSignee} />

      <div className="p-4 bg-white rounded-t-xl shadow border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium">Add signee information</h2>
          <button
            className="text-purple-800 cursor-pointer"
            onClick={() => setAddSignee(!addSignee)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {addSignee && (
        <div className="p-4 slide-down bg-white rounded-b-xl">
          <div className="space-y-2">
            <div>
              <label className="text-xs block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-3 py-2 h-[30px] text-sm bg-gray-200 rounded-md outline-none"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="enter first name"
                  className="w-full h-[30px] px-3 py-2 text-sm bg-gray-200 rounded-md outline-none"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-xs block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="enter last name"
                  className="w-full h-[30px] px-3 py-2 text-sm bg-gray-200 rounded-md outline-none"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                className="flex items-center gap-1 px-4 py-1.5 text-sm border border-purple-800 text-purple-800 rounded-full hover:bg-purple-50"
                onClick={handleAddSignee}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingerDetailsForm;

'use client';

import Head from 'next/head';
import React, { useState } from 'react';
import { FiEdit } from "react-icons/fi";

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  accountCreated: string;
}

// Custom SVG Icons as React components
const SaveIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 5a2 2 0 012-2h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm5.586-1H15a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3.586l-1-1z" clipRule="evenodd"></path>
  </svg>
);

const CancelIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const MyAccountPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState<UserProfile>({
    fullName: 'Jay Vasani',
    email: 'jayuuuxz48@gmail.com',
    phoneNumber: '+91 9173664845',
    profileImage: 'https://storage.googleapis.com/a1aa/image/23e92866-f7dd-4cb4-c2f5-36f4c1fc924c.jpg',
    accountCreated: 'January 15, 2023'
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({ ...originalProfile });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Save the changes
    setOriginalProfile({ ...userProfile });
    setIsEditing(false);
    // Here you would typically make an API call to save the data
    console.log('Profile saved:', userProfile);
  };

  const handleCancelEdit = () => {
    // Revert changes
    setUserProfile({ ...originalProfile });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Head>
        <title>My Account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" 
          rel="stylesheet"
        />
      </Head>
      
      <div className="bg-white min-h-screen p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
        <main className="mx-auto">
          <section>
            <h1 className="text-black font-semibold text-base leading-5 mb-1">
              My Account
            </h1>
            <p className="text-[10px] text-[#4b5563] leading-3 mb-6">
              Manage your account settings and personal information.
            </p>
            
            <div className="bg-[#f0f4f9] rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-black font-semibold text-sm leading-5 mb-1">
                    Profile Information
                  </h2>
                  <p className="text-[10px] text-[#4b5563] leading-3">
                    Update your personal details here.
                  </p>
                </div>
                
                {/* Edit button - only show when not editing */}
                {!isEditing && (
                  <button 
                    className="flex items-center gap-1 text-[10px] text-[#1e293b] border border-[#1e293b] rounded-xl px-3 py-2 bg-white hover:bg-[#06044B] hover:text-white transition duration-200"
                    type="button"
                    onClick={handleEditProfile}
                  >
                    <FiEdit className="w-3 h-3" />
                    <span className="ml-1">Edit Profile</span>
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <img 
                  alt="Profile image of Jay Vasani"
                  className="w-20 h-20 rounded-lg object-cover"
                  height={80}
                  src={userProfile.profileImage}
                  width={80}
                />
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="text-black font-semibold text-xl leading-7 mb-1 border border-gray-300 rounded px-2 py-1 bg-white w-full max-w-xs"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <h3 className="text-black font-semibold text-xl leading-7 mb-1">
                      {userProfile.fullName}
                    </h3>
                  )}
                  <p className="text-[10px] text-[#4b5563] leading-3">
                    Account created: {userProfile.accountCreated}
                  </p>
                </div>
              </div>
              
              <div className="border border-[#d1d5db] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] text-[#4b5563] mb-4">
                <div>
                  <p className="font-semibold text-black leading-4 mb-1">
                    Full Name
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userProfile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-[#4b5563] bg-white text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p>{userProfile.fullName}</p>
                  )}
                </div>
                
                <div>
                  <p className="font-semibold text-black leading-4 mb-1">
                    Email
                  </p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-[#4b5563] bg-white text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <p>{userProfile.email}</p>
                  )}
                </div>
                
                <div>
                  <p className="font-semibold text-black leading-4 mb-1">
                    Phone No.
                  </p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userProfile.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-[#4b5563] bg-white text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p>{userProfile.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Cancel & Save buttons - only show when editing */}
              {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t border-[#d1d5db]">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 text-[10px] text-black border border-black rounded-xl px-4 py-2 bg-white hover:bg-[#06044B] hover:text-white transition duration-200"
                  >
                    <span>Cancel</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="flex items-center gap-1 text-[10px] text-white bg-[#06044B] border border-[#1e293b] rounded-xl px-4 py-2 hover:bg-[#334155] transition duration-200"
                  >
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MyAccountPage;

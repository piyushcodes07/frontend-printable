import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Homefooter() {
  return (
    <footer className="bg-[#EFFDF3] w-full flex flex-col border-t border-t-gray-300 pt-[55px]">
      <div className="flex justify-between ml-[9%] mr-[8%]">
        {/* Left side - Logo and tagline */}
        <div className="max-w-xs">
          <div className="mb-6">
            <div className="flex">
              <Image
                src="/footerlogo.png"
                alt="Printable Logo"
                width={65}
                height={55}
              />
              <Image
                src="/Printable.svg"
                alt="Printable Logo"
                width={150}
                height={50}
                className="mb-2"
              />
            </div>
            <p className="text-lg text-black">Print • Anytime • Anywhere</p>
          </div>
          <div className="mt-4">
            <p className="text-base text-gray-600 mb-3">Printable Mobile App</p>
            <div className="flex space-x-4">
              <Image
                src="playstore.svg"
                alt="Get it on Google Play"
                width={120}
                height={40}
              />
              <Image
                src="appstore.svg"
                alt="Download on App Store"
                width={120}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Right side - Navigation links */}
        <div className="flex gap-22">
          {/* Services & Tools */}
          <div className="w-[191.7]">
            <h3 className="text-sm text-gray-900 mb-4 font-semibold">
              Services & Tools
            </h3>
            <ul className="space-y-3 space-x-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Print & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/esign"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  E - Sign
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Printable Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  PDF Scanner
                </Link>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div className="w-[191.7]">
            <h3 className="text-sm text-gray-900 mb-4 font-semibold">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
          {/* More */}
          <div className="w-[191.7]">
            <h3 className="text-sm text-gray-900 mb-4 font-semibold">More</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Partners with Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Become Merchant
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Support Docs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-gray-600 link-underline hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="w-full bg-[#06044B] mt-12 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center px-4 py-5">
            <p className="text-lg text-white">
              2025 Printable • All Rights Reserved
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-white hover:text-[#61E987] transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-[#61E987] transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-[#61E987] transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-[#61E987] transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Homefooter;

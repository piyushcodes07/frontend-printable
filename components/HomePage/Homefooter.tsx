import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Homefooter() {
  return (
    <footer className="bg-[#EFFDF3] w-full">
      <div className="">
        <div className="flex justify-between">
          {/* Left side - Logo and tagline */}
          <div className="max-w-xs">
            <div className="mb-6">
              <div className="flex">
                <Image
                  src="/PrintableLogo.svg"
                  alt="Printable Logo"
                  width={75}
                  height={20}
                  className="mb-4"
                />
                <Image
                  src="/Printable.svg"
                  alt="Printable Logo"
                  width={150}
                  height={50}
                  className="mb-4"
                />
              </div>
              <p className="text-lg text-black">Print • Anytime • Anywhere</p>
            </div>
            <div className="mt-4">
              <p className="text-sm mb-4">Printable Mobile App</p>
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
          <div className="flex gap-20">
            {/* Services & Tools */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Services & Tools
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Print & Delivery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    PDF Converter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    E - Sign
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Printable Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    PDF Scanner
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            {/* More */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">More</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Partners with Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Become Merchant
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Support Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm link-underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="w-full bg-[#06044B] mt-12">
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
      </div>
    </footer>
  );
}

export default Homefooter;

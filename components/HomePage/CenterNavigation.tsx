import { FaChevronDown, FaFileAlt } from "react-icons/fa";
import React from "react";

export default function CenterNavigation() {
  return (
    <div
      className="w-[1420px] h-[704px] rounded-[12px] flex flex-col gap-[46px] px-[78px] pt-[42px] pb-[79px]"
      style={{
        backgroundImage: "url('/homepage.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-[100px]">
        <h3 className="text-[32px] text-white">Quick Action</h3>
      </div>

      {/* CARDS */}
      <div className="w-full h-full flex flex-row gap-[20px]">
        <div className="flex">
          <div className="flex flex-col mr-5">
            <div
              className="flex flex-col text-center justify-center w-[622px] h-[267px] mb-[20px] px-[70px] glass-box"
            >
              <h2 className="text-4xl text-[#FFFFFF] mb-5">Print & Deliver </h2>
              <h3 className="text-2xl text-[#FFFFFF]">
                {" "}
                Just upload, personalize, pick a spot and your prints are on
                their way home to you!
              </h3>
            </div>
            <div
              className="flex flex-col text-center justify-center w-[622px] h-[207px] px-[70px] glass-box"
            >
              <h2 className="text-4xl text-[#FFFFFF] mb-5"> Sign a PDF </h2>
              <h3 className="text-2xl text-[#FFFFFF]">
                {" "}
                Collaborate with signees, send invites, and get documents signed
                in seconds.
              </h3>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="flex flex-col text-center justify-center w-[622px] h-[234px] mb-[20px] px-[70px] glass-box"
            >
              <h2 className="text-4xl text-[#FFFFFF] mb-5">
                {" "}
                AI Presentation{" "}
              </h2>
              <h3 className="text-2xl text-[#FFFFFF]">
                {" "}
                Create stunning slides in seconds. Edit, enhance, and impress —
                all in one place.
              </h3>
            </div>
            <div
              className="flex flex-col text-center justify-center w-[622px] h-[240px] px-[70px] glass-box"
            >
              <h2 className="text-4xl text-[#FFFFFF] mb-5"> View Orders </h2>
              <h3 className="text-2xl text-[#FFFFFF]">
                {" "}
                Create stunning slides in seconds. Edit, enhance, and impress —
                all in one place.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

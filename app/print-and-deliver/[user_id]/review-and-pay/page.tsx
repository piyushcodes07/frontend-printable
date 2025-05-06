"use client";

import { useState } from "react";
import {
    Printer,
    MapPin,
    CreditCard,
    ChevronDown,
    X,
    ChevronLeft,
    Check,
    ChevronRight,
    Edit,
    Pen,
    Clock,
    RefreshCw,
    Store,
    Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/nav-bar";
import { cn } from "@/lib/utils";

type PrintFile = {
    id: string;
    name: string;
    size: string;
};

export default function PrintOptionsPage() {
    const [files, setFiles] = useState<PrintFile[]>([
        { id: "1", name: "theprojetks-design-tokens.pdf", size: "0.10 MB" },
        { id: "2", name: "Company Policy.pdf", size: "5.1 MB" },
        { id: "3", name: "Marketing Presentation.pptx", size: "3.2 MB" },
    ]);

    // Track which document's options are expanded (first one by default)
    const [expandedDocId, setExpandedDocId] = useState<string>(files[0]?.id || "");

    const removeFile = (id: string) => {
        setFiles(files.filter((file) => file.id !== id));
        // If we're removing the expanded document, expand the first remaining one
        if (id === expandedDocId && files.length > 1) {
            const remainingFiles = files.filter((f) => f.id !== id);
            if (remainingFiles.length > 0) {
                setExpandedDocId(remainingFiles[0].id);
            } else {
                setExpandedDocId("");
            }
        }
    };

    const toggleDocumentOptions = (id: string) => {
        setExpandedDocId(expandedDocId === id ? "" : id);
    };

    const getFileIcon = (filename: string) => {
        const ext = filename.split(".").pop()?.toLowerCase() || "";

        // Different colors for different file types
        let fillColor = "#FF5252";
        let pathColor = "#FF8A80";

        if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
            fillColor = "#4CAF50";
            pathColor = "#A5D6A7";
        } else if (["doc", "docx"].includes(ext)) {
            fillColor = "#2196F3";
            pathColor = "#90CAF9";
        } else if (["xls", "xlsx"].includes(ext)) {
            fillColor = "#4CAF50";
            pathColor = "#A5D6A7";
        } else if (["ppt", "pptx"].includes(ext)) {
            fillColor = "#FF9800";
            pathColor = "#FFCC80";
        }

        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill={fillColor} />
                <path
                    d="M7 18V6C7 5.44772 7.44772 5 8 5H16C16.5523 5 17 5.44772 17 6V18C17 18.5523 16.5523 19 16 19H8C7.44772 19 7 18.5523 7 18Z"
                    fill={pathColor}
                />
                <path d="M9 9H15M9 12H15M9 15H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        );
    };

    return (
        <div className="min-h-screen bg-[#dffbe7] flex flex-col">
            <div className="flex-1 flex flex-col items-center py-12 px-4">
                <div className="max-w-3xl w-full text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Print Your Documents with
                        <span className="block text-[#61e987]">Printable</span>
                    </h1>
                    <p className="text-center max-w-xl mx-auto">
                        Seamlessly upload your files, customize your print job, and have it delivered or ready for
                        pickup
                    </p>
                </div>

                {/* Process Steps */}
                <div className="flex justify-center items-center w-full max-w-2xl mb-12 overflow-x-auto py-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-[#61e987] flex items-center justify-center">
                            <Check className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs mt-2 whitespace-nowrap">Upload Document</span>
                    </div>
                    <div className="h-[2px] w-16 bg-[#61e987] flex-shrink-0"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-[#61e987] flex items-center justify-center">
                            <Check className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs mt-2 whitespace-nowrap">Print Options</span>
                    </div>
                    <div className="h-[2px] w-16 bg-[#61e987] flex-shrink-0"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-[#61e987] flex items-center justify-center">
                            <Check className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs mt-2 whitespace-nowrap">Select Location</span>
                    </div>
                    <div className="h-[2px] w-16 bg-[#61e987] flex-shrink-0"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-[#06044b]" />
                        </div>
                        <span className="text-xs mt-2 whitespace-nowrap">Review & Pay</span>
                    </div>
                </div>

                {/* Print Options Card */}
                <div className="bg-white rounded-xl p-8 w-full max-w-2xl border border-[#90f0ab] mb-6">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-4">
                            <CreditCard className="h-6 w-6 text-[#06044b]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Review & Pay</h2>
                            <p className="text-sm text-[#555555]">Review your order and complete payment</p>
                        </div>
                    </div>

                    {/* Document List with Expandable Options */}
                    <div className="space-y-4">
                        <div className="border border-[#e0e0e0] rounded-lg overflow-hidden">
                            <div
                                className={cn(
                                    "flex items-center justify-between p-3 cursor-pointer transition-colors bg-[#f0fdf4] border-b border-[#e0e0e0]"
                                )}>
                                <div className="flex items-center">
                                    <div>
                                        <p className="text-sm font-medium text-[#06044b]">Order Summary</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#EEEEEE] rounded-lg">
                                        <div className="flex justify-between border-b border-[#C9C9C9] p-2">
                                            <div className="flex items-center text-sm font-medium text-[#555555]">
                                                <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-2">
                                                    <Printer className="h-4 w-4 text-[#06044b]" />
                                                </div>
                                                <span>Print Options</span>
                                            </div>
                                        </div>
                                        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 p-4">
                                            {[
                                                { label: "Copies", value: "15" },
                                                { label: "Paper Size", value: 'Letter (8.5" × 11")' },
                                                { label: "Paper type", value: "Standard" },
                                                { label: "Orientation", value: "Portrait" },
                                                { label: "Print Type", value: "Black & White" },
                                                { label: "Fulfillment", value: "Store Pickup" },
                                            ].map(({ label, value }) => (
                                                <div key={label} className="flex flex-col">
                                                    <dt className="text-xs font-normal text-[#555555]">{label}</dt>
                                                    <dd className="text-[12px] font-medium text-black">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>

                                    <div className="bg-[#EEEEEE] rounded-lg">
                                        {/* Header */}
                                        <div className="flex justify-between border-b p-2 border-[#C9C9C9]">
                                            <div className="flex items-center text-sm font-medium text-[#555555]">
                                                <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-2">
                                                    <Store className="h-4 w-4 text-[#06044b]" />
                                                </div>
                                                <span>Pickup Information</span>
                                            </div>
                                            <button className="group flex items-center text-sm font-medium text-[#555555] cursor-pointer">
                                                <div className="w-8 h-8 flex items-center justify-center">
                                                    <RefreshCw className="h-4 w-4 text-[#06044b]" />
                                                </div>
                                                <span className="group-hover:underline group-hover:underline-offset-4 group-hover:underline-[#06044B]">
                                                    Change
                                                </span>
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 space-y-4">
                                            {/* Shop Info */}
                                            <div className="border border-green-400 rounded-lg p-4">
                                                <h3 className="text-lg font-semibold text-black">Print Master Shop</h3>
                                                <p className="text-sm text-gray-500">123 Main St, New York, NY 10001</p>
                                            </div>

                                            {/* ETA */}
                                            <div className="border border-green-400 bg-[#ECFFED] rounded-lg p-4">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-[#06044b] mr-2" />
                                                    <span className="text-sm font-medium text-black">
                                                        Est. Pickup ready: 10-20 minutes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#EEEEEE] rounded-lg p-4 mt-3">
                                    <dl className="space-y-3">
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-500">Subtotal:</dt>
                                            <dd className="text-sm font-medium text-gray-900">₹ 750</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-500">Pickup fee:</dt>
                                            <dd className="text-sm font-medium text-gray-900">₹ 0.00</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-500">Tax (8%):</dt>
                                            <dd className="text-sm font-medium text-gray-900">₹ 18.00</dd>
                                        </div>

                                        <hr className="border-gray-300" />

                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-500">Total:</dt>
                                            <dd className="text-sm font-semibold text-gray-900">₹ 768.00</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Document List with Expandable Options */}
                    <div className="space-y-4 mt-4">
                        <div className="border border-[#e0e0e0] rounded-lg overflow-hidden">
                            <div
                                className={cn(
                                    "flex items-center justify-between p-3 cursor-pointer transition-colors bg-[#f0fdf4]"
                                )}>
                                <div className="flex items-center">
                                    <div>
                                        <p className="text-sm font-medium text-[#06044b]">Payment Method</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white">
                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                                    <div className="p-4 flex bg-[#EEEEEE] rounded-md items-center gap-2">
                                        <div className="w-6 h-6 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                                            <CreditCard className="w-4 h-4 text-[#06044b]" />
                                        </div>
                                        <div>
                                            <p>Credit Card</p>
                                            <p className="text-[10px] text-gray-400">Visa, Mastercard, Rupay</p>
                                        </div>
                                    </div>
                                    <div className="p-4 flex bg-[#EEEEEE] rounded-md items-center gap-2">
                                        <div className="w-6 h-6 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                                            <Wallet className="w-4 h-4 text-[#06044b]" />
                                        </div>
                                        <div>
                                            <p>Digital Wallet</p>
                                            <p className="text-[10px] text-gray-400">Apple Pay, Google Pay, etc.</p>
                                        </div>
                                    </div>
                                    <div className="p-4 flex bg-[#EEEEEE] rounded-md items-center gap-2">
                                        <div className="w-6 h-6 bg-[#f0fdf4] rounded-full flex items-center justify-center">
                                            <Wallet className="w-4 h-4 text-[#06044b]" />
                                        </div>
                                        <div>
                                            <p>Bank Transfer</p>
                                            <p className="text-[10px] text-gray-400">Direct from your bank account</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 flex bg-[#EEEEEE] rounded-md items-center">
                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                                        <div className="bg-white flex items-center justify-center p-4 rounded-sm">
                                            <svg
                                                width="113"
                                                height="60"
                                                viewBox="0 0 113 79"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M14.1566 54.584H5.48963C4.89653 54.584 4.39211 54.9321 4.29963 55.4049L0.794248 73.3557C0.724576 73.71 1.0642 74.0292 1.50904 74.0292H5.64674C6.23984 74.0292 6.74426 73.6811 6.83674 73.2074L7.78219 68.3659C7.87338 67.8917 8.37904 67.544 8.9709 67.544H11.7146C17.4238 67.544 20.7186 65.3125 21.5795 60.8906C21.9672 58.9561 21.596 57.436 20.474 56.3712C19.2425 55.2026 17.0573 54.584 14.1566 54.584ZM15.1565 61.1403C14.6827 63.6522 12.3064 63.6522 10.0088 63.6522H8.70095L9.61848 58.9608C9.67296 58.6776 9.9771 58.4687 10.332 58.4687H10.9314C12.4965 58.4687 13.9731 58.4687 14.7361 59.1891C15.1906 59.6193 15.3301 60.2578 15.1565 61.1403ZM40.0644 61.0597H35.914C35.5603 61.0597 35.2548 61.2686 35.2003 61.5524L35.0167 62.4898L34.7264 62.1502C33.8279 61.0967 31.8245 60.7447 29.8247 60.7447C25.2379 60.7447 21.3209 63.5504 20.5579 67.4862C20.1615 69.4492 20.7251 71.3264 22.1038 72.6357C23.3689 73.8393 25.1787 74.3409 27.3316 74.3409C31.0269 74.3409 33.0767 72.4215 33.0767 72.4215L32.8913 73.3533C32.8215 73.7095 33.1611 74.0288 33.6033 74.0288H37.342C37.9367 74.0288 38.4381 73.6806 38.532 73.2069L40.7752 61.7333C40.8462 61.3804 40.5078 61.0597 40.0644 61.0597ZM34.2789 67.5843C33.8784 69.4994 31.9964 70.785 29.5966 70.785C28.3914 70.785 27.4278 70.4728 26.8097 69.8812C26.1962 69.2938 25.9628 68.4573 26.1581 67.526C26.5323 65.627 28.4459 64.2997 30.8094 64.2997C31.9876 64.2997 32.9459 64.6157 33.5769 65.2125C34.2091 65.8155 34.4601 66.6568 34.2789 67.5843ZM57.998 61.0593H62.169C62.7531 61.0593 63.0938 61.5884 62.7619 61.9754L48.8902 78.1479C48.6656 78.4099 48.2955 78.5657 47.9002 78.5657H43.7345C43.1481 78.5657 42.8056 78.0324 43.1451 77.6444L47.4645 72.72L42.8707 61.8309C42.7117 61.4524 43.0577 61.0593 43.5562 61.0593H47.6545C48.187 61.0593 48.6568 61.3416 48.8104 61.7532L51.2484 68.3299L57.001 61.4861C57.2262 61.2189 57.6004 61.0593 57.998 61.0593Z"
                                                    fill="#253B80"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M103.218 73.3566L106.775 55.0776C106.83 54.7938 107.134 54.5849 107.488 54.584H111.492C111.934 54.584 112.274 54.9042 112.204 55.2585L108.696 73.2084C108.605 73.682 108.1 74.0302 107.506 74.0302H103.93C103.488 74.0302 103.148 73.7109 103.218 73.3566ZM75.9773 54.5849H67.3087C66.7169 54.5849 66.2126 54.9331 66.1199 55.4058L62.6146 73.3566C62.5448 73.7109 62.8844 74.0302 63.3272 74.0302H67.7749C68.1884 74.0302 68.542 73.7867 68.6065 73.4551L69.6012 68.3668C69.6927 67.8927 70.1982 67.545 70.7899 67.545H73.5323C79.2427 67.545 82.5369 65.3134 83.3984 60.8916C83.7872 58.957 83.4137 57.437 82.2923 56.3721C81.0613 55.2036 78.8779 54.5849 75.9773 54.5849ZM76.9772 61.1412C76.5045 63.6532 74.1281 63.6532 71.8292 63.6532H70.5225L71.4415 58.9618C71.496 58.6785 71.7975 58.4696 72.1535 58.4696H72.7529C74.317 58.4696 75.7949 58.4696 76.5573 59.1901C77.0124 59.6202 77.1508 60.2587 76.9772 61.1412ZM101.883 61.0607H97.7352C97.3786 61.0607 97.076 61.2696 97.0226 61.5533L96.8391 62.4907L96.5476 62.1511C95.6491 61.0976 93.6469 60.7457 91.6471 60.7457C87.0603 60.7457 83.1445 63.5513 82.3815 67.4872C81.9862 69.4501 82.5475 71.3273 83.9262 72.6366C85.1936 73.8402 87.0011 74.3419 89.154 74.3419C92.8493 74.3419 94.8985 72.4225 94.8985 72.4225L94.7137 73.3542C94.6439 73.7105 94.9835 74.0297 95.4286 74.0297H99.1656C99.7573 74.0297 100.262 73.6816 100.354 73.2079L102.599 61.7343C102.667 61.3814 102.328 61.0607 101.883 61.0607ZM96.0978 67.5852C95.6996 69.5003 93.8153 70.7859 91.4148 70.7859C90.212 70.7859 89.2467 70.4738 88.6279 69.8821C88.0145 69.2948 87.784 68.4582 87.977 67.527C88.3529 65.628 90.2642 64.3007 92.6277 64.3007C93.8065 64.3007 94.7642 64.6166 95.3958 65.2135C96.0303 65.8165 96.2813 66.6578 96.0978 67.5852Z"
                                                    fill="#179BD7"
                                                />
                                                <path
                                                    d="M46.2312 48.1621L47.2968 42.6958L44.9233 42.6513H33.5898L41.4661 2.31405C41.4902 2.19226 41.5699 2.07872 41.686 1.9981C41.8021 1.91748 41.9511 1.87305 42.1059 1.87305H61.216C67.5604 1.87305 71.9384 2.93936 74.2244 5.04399C75.2959 6.03134 75.9785 7.06307 76.3087 8.1985C76.6547 9.38991 76.6612 10.8133 76.3228 12.5493L76.2982 12.6761V13.7884L77.3702 14.2788C78.2728 14.6655 78.9895 15.1081 79.5396 15.615C80.4568 16.4591 81.0497 17.532 81.3002 18.804C81.5588 20.1123 81.4732 21.6689 81.0497 23.4313C80.5606 25.4586 79.7701 27.2243 78.7027 28.6691C77.7204 30.0003 76.4694 31.1043 74.9845 31.9602C73.5664 32.7731 71.8815 33.3903 69.9766 33.7853C68.1304 34.1733 66.0262 34.3694 63.7179 34.3694H62.2306C61.1673 34.3694 60.1339 34.6787 59.3235 35.2334C58.5106 35.7994 57.9722 36.5725 57.8074 37.4185L57.6954 37.9106L55.8129 47.5449L55.7272 47.8988C55.705 48.011 55.6662 48.0669 55.6094 48.1048C55.5583 48.1389 55.485 48.1621 55.4135 48.1621H46.2312Z"
                                                    fill="#253B80"
                                                />
                                                <path
                                                    d="M78.3841 12.8047C78.3272 13.0992 78.2621 13.4003 78.1888 13.7097C75.6681 24.1606 67.0465 27.7709 56.0344 27.7709H50.4277C49.0812 27.7709 47.9464 28.5607 47.7364 29.6336L44.8657 44.3384L44.0528 48.5064C43.9162 49.2107 44.5889 49.8459 45.4686 49.8459H55.4133C56.5909 49.8459 57.5909 49.1548 57.7762 48.2169L57.8741 47.8086L59.7467 38.2117L59.8669 37.6855C60.0499 36.7443 61.0522 36.0532 62.2298 36.0532H63.7171C73.3516 36.0532 80.8941 32.8937 83.0987 23.7508C84.0194 19.9315 83.5426 16.7425 81.1059 14.4996C80.3687 13.8233 79.4538 13.2621 78.3841 12.8047Z"
                                                    fill="#179BD7"
                                                />
                                                <path
                                                    d="M75.7458 11.9572C75.3611 11.8667 74.9635 11.7844 74.5559 11.7103C74.1465 11.638 73.7266 11.5738 73.295 11.5178C71.7831 11.3204 70.1269 11.2266 68.3522 11.2266H53.3738C53.005 11.2266 52.6548 11.294 52.3411 11.4158C51.6502 11.684 51.1371 12.2123 51.0127 12.8589L47.8259 29.1597L47.7344 29.6353C47.9443 28.5624 49.0791 27.7725 50.4257 27.7725H56.0323C67.0444 27.7725 75.6667 24.1605 78.1867 13.7113C78.2618 13.402 78.3251 13.1008 78.382 12.8063C77.7445 12.5331 77.0536 12.2995 76.31 12.1003C76.127 12.051 75.9376 12.0033 75.7458 11.9572Z"
                                                    fill="#222D65"
                                                />
                                                <path
                                                    d="M51.0164 12.8585C51.1408 12.2118 51.6545 11.6836 52.3448 11.417C52.6609 11.2952 53.0092 11.2277 53.3775 11.2277H68.3565C70.1312 11.2277 71.7873 11.3215 73.2987 11.519C73.7309 11.575 74.1508 11.6391 74.5602 11.7115C74.9678 11.7856 75.3648 11.8679 75.7501 11.9584C75.9413 12.0044 76.1307 12.0521 76.316 12.0999C77.0597 12.299 77.7505 12.5343 78.388 12.8058C79.1381 8.94373 78.3822 6.31416 75.797 3.93304C72.9468 1.31171 67.8023 0.189453 61.2198 0.189453H42.1092C40.7644 0.189453 39.6178 0.979276 39.4096 2.05383L31.4501 42.8057C31.2929 43.612 32.063 44.3395 33.0693 44.3395H44.8679L47.8301 29.1592L51.0164 12.8585Z"
                                                    fill="#253B80"
                                                />
                                            </svg>
                                        </div>
                                        <div className="bg-white flex items-center justify-center p-4 rounded-sm">
                                            <svg
                                                width="195"
                                                height="60"
                                                viewBox="0 0 195 108"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect
                                                    x="0.5"
                                                    y="0.5"
                                                    width="194"
                                                    height="107"
                                                    rx="5.5"
                                                    fill="white"
                                                    stroke="#D9D9D9"
                                                />
                                                <path
                                                    d="M153.195 64.4336H153.294L161.426 47.9492H167.141L149.57 80.9981H144.149L150.681 69.4375L139.153 47.9492H144.868L153.195 64.4336ZM125.698 47.2002C129.584 47.2002 132.655 48.0563 134.908 49.7422C137.161 51.4281 138.271 53.7837 138.271 56.7539V70.9102H133.242V67.7256H133.014C130.826 70.3479 127.952 71.6591 124.327 71.6592C121.258 71.6592 118.644 70.9096 116.587 69.4111C114.562 68.0197 113.419 65.9593 113.484 63.792C113.484 61.4103 114.595 59.5365 116.783 58.1182C118.971 56.7001 121.91 56.004 125.567 56.0039C128.702 56.0039 131.251 56.4857 133.275 57.3955V56.4063C133.275 54.9345 132.491 53.5425 131.119 52.5791C129.715 51.5624 127.919 51.0001 126.058 51C123.119 51 120.8 52.017 119.102 54.0508L114.465 51.669C116.947 48.6988 120.702 47.2003 125.698 47.2002ZM100.78 37.3516C104.144 37.2981 107.41 38.3419 109.794 40.2686C114.562 43.9079 114.856 50.0359 110.382 53.9697C110.186 54.1303 109.99 54.2916 109.794 54.4522C107.345 56.3521 104.34 57.3154 100.78 57.3154H92.0938V70.9092H86.8359V37.3516H100.78ZM126.386 59.4834C124.263 59.4835 122.466 59.9117 121.029 60.7412C119.625 61.5708 118.906 62.6144 118.906 63.8721C118.906 64.9959 119.56 66.0395 120.638 66.6816C121.813 67.4308 123.251 67.8324 124.721 67.8057C126.941 67.8055 129.064 67.083 130.632 65.7988C132.363 64.461 133.245 62.8819 133.245 61.0625C131.612 59.9921 129.325 59.4567 126.386 59.4834ZM92.0947 53.1943H100.913C102.873 53.2479 104.767 52.6057 106.106 51.4551C108.85 49.1269 108.785 45.3797 105.943 43.1318C104.604 42.0615 102.807 41.4736 100.913 41.4736H92.0947V53.1943Z"
                                                    fill="#3C4043"
                                                />
                                                <path
                                                    d="M73.9412 54.3719C73.9412 53.0606 73.8105 51.7493 73.5493 50.4648H51.375V57.8775H64.0787C63.5562 60.2592 61.858 62.4 59.376 63.738V68.5549H66.9525C71.3939 65.2098 73.9412 60.2592 73.9412 54.3719Z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M51.3775 73.2113C57.713 73.2113 63.0688 71.4986 66.955 68.555L59.3785 63.7381C57.2558 64.9156 54.5453 65.5846 51.3775 65.5846C45.238 65.5846 40.0455 62.186 38.184 57.6367H30.3789V62.6142C34.3631 69.1169 42.4947 73.2113 51.3775 73.2113Z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M38.185 57.6373C37.2051 55.2557 37.2051 52.6599 38.185 50.2515V45.3008H30.3786C27.0144 50.7331 27.0144 57.1557 30.3786 62.588L38.185 57.6373Z"
                                                    fill="#FBBC04"
                                                />
                                                <path
                                                    d="M51.3775 42.3037C54.7412 42.2501 57.9743 43.2938 60.3909 45.1938L67.1183 39.6811C62.8402 36.4164 57.2232 34.6234 51.3775 34.6769C42.4947 34.6769 34.3631 38.798 30.3789 45.3008L38.184 50.2783C40.0455 45.7022 45.238 42.3037 51.3775 42.3037Z"
                                                    fill="#EA4335"
                                                />
                                            </svg>
                                        </div>
                                        <div className="bg-white flex items-center justify-center p-4 rounded-sm">
                                            <svg
                                                width="195"
                                                height="60"
                                                viewBox="0 0 195 108"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect
                                                    x="0.5"
                                                    y="0.5"
                                                    width="194"
                                                    height="107"
                                                    rx="5.5"
                                                    fill="white"
                                                    stroke="#D9D9D9"
                                                />
                                                <path
                                                    d="M152.888 64.2412H153.023L160.799 43.7002H167.509L155.915 70.2852C153.269 76.3739 150.241 78.3818 143.804 78.3818C143.313 78.3818 141.676 78.3372 141.294 78.248V74.0771C141.703 74.1217 142.712 74.166 143.23 74.166C146.149 74.166 147.786 73.1622 148.796 70.5527L149.395 69.0146L138.211 43.7002H145.113L152.888 64.2412ZM55.7459 40.6221C57.219 40.7113 61.4741 41.0684 64.202 44.3691C63.9786 44.5053 59.1562 46.7806 59.2108 51.5508C59.2654 57.2604 65.3212 59.1566 65.3758 59.2012C65.3203 59.3378 64.4191 61.901 62.2108 64.5312C60.274 66.8507 58.2823 69.1253 55.118 69.1699C52.0631 69.2144 51.0537 67.6758 47.535 67.6758C44.0432 67.6758 42.8973 69.1256 40.0057 69.2148C36.9506 69.304 34.6319 66.7618 32.6951 64.4424C28.7397 59.7587 25.7117 51.2386 29.8035 45.4844C31.7949 42.6072 35.4231 40.8005 39.324 40.7559C42.3245 40.7113 45.0794 42.3836 46.907 42.3838C48.7075 42.3838 51.9541 40.4436 55.7459 40.6221ZM123.18 43.3652C130.737 43.3652 135.647 46.5992 135.647 51.6172V68.9248H129.537V64.7539H129.4C127.654 67.4748 123.808 69.1923 119.662 69.1924C113.524 69.1924 109.241 66.2035 109.241 61.6982C109.241 57.2379 113.387 54.6731 121.053 54.2939L129.291 53.8926V51.9746C129.291 49.1421 127.026 47.6025 122.989 47.6025C119.661 47.6027 117.234 49.0084 116.743 51.1494H110.796C110.987 46.6441 116.17 43.3652 123.18 43.3652ZM93.6092 34.1543C101.847 34.1543 107.603 38.7931 107.603 45.5732C107.603 52.3534 101.739 57.0371 93.3914 57.0371H84.2528V68.9248H77.6512V34.1543H93.6092ZM121.953 57.9072C117.834 58.1079 115.679 59.379 115.679 61.5645C115.679 63.6833 117.915 65.0664 121.434 65.0664C125.908 65.0663 129.291 62.7465 129.291 59.4902V57.5283L121.953 57.9072ZM84.2518 52.5098H91.8358C97.5917 52.5098 100.865 49.9895 100.865 45.5957C100.865 41.2019 97.5917 38.7041 91.8631 38.7041H84.2518V52.5098ZM55.7733 31.5C56.046 33.7303 54.9823 35.9158 53.3729 37.5439C51.7362 39.1274 49.1175 40.3765 46.4988 40.1982C46.1715 38.0571 47.4536 35.7821 48.9539 34.377C50.5907 32.749 53.4547 31.5892 55.7733 31.5Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                        <div className="bg-white flex items-center justify-center p-4 rounded-sm">
                                            <svg
                                                width="157"
                                                height="40"
                                                viewBox="0 0 157 40"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M22.7676 26.3987C21.9136 25.7681 22.6746 24.9051 23.6953 25.3948C35.3476 30.9859 49.7508 34.3538 64.6407 34.3538C75.373 34.3054 85.9882 32.51 95.877 29.0696C97.406 28.5341 98.6918 29.9002 97.1934 30.8303L96.3321 31.3294C87.3135 36.5148 74.6292 39.2756 63.6885 39.2757C48.5796 39.3392 33.9856 34.7471 22.7676 26.3987ZM90.167 25.9788C95.3526 22.9739 103.848 23.8333 104.835 24.8479C105.822 25.8627 104.566 32.8884 99.709 36.2425C98.9616 36.7568 98.2481 36.4819 98.5811 35.802C99.6446 33.621 101.971 28.8179 101.059 27.4085L100.969 27.2825C99.8106 26.0568 93.3098 26.7016 90.3926 26.9905C89.5045 27.0784 89.3684 26.4403 90.167 25.9788Z"
                                                    fill="#FF9900"
                                                />
                                                <path
                                                    d="M12.1016 0.552734C14.4507 0.552797 17.5172 1.0677 19.3623 2.5332C21.7072 4.34407 21.4981 6.76108 21.498 9.38574V15.583C21.4982 17.4499 22.4382 18.2675 23.3223 19.2715C23.6296 19.6237 23.6978 20.0639 23.3223 20.3281C22.3356 21.0081 20.5841 22.2625 19.623 22.9707L19.585 22.9639C19.2674 23.1911 18.8107 23.2287 18.4443 23.0586C16.8428 21.9595 16.5518 21.4524 15.6807 20.4062C13.0282 22.6328 11.1525 23.2979 7.72266 23.2979C3.66069 23.2978 0.5 21.2299 0.5 17.0938C0.500191 13.8632 2.63613 11.6679 5.62598 10.5898C8.24432 9.64225 11.9006 9.46968 14.6982 9.20898V8.69434C14.6983 7.74677 14.7879 6.62638 14.1133 5.80566C13.5239 5.07301 12.4046 4.77351 11.4053 4.77344C9.56442 4.77344 7.92411 5.55223 7.52246 7.16211C7.47158 7.53766 7.12091 7.83782 6.66797 7.89453L2.0293 7.47559C1.79783 7.44824 1.58971 7.34365 1.4541 7.18652C1.31881 7.02953 1.26721 6.83365 1.31152 6.64453C2.38373 1.96589 7.50986 0.552734 12.1016 0.552734ZM75.3438 0.539062C77.6887 0.539092 80.756 1.05393 82.6055 2.51953C84.9669 4.33038 84.7412 6.74403 84.7412 9.37207V15.5723C84.7413 17.4358 85.6803 18.2538 86.5645 19.2578C86.8889 19.6242 86.9572 20.0538 86.543 20.2969C85.5563 20.9768 83.8057 22.2349 82.8447 22.9395C82.5253 23.1634 82.07 23.2 81.7041 23.0312C80.1026 21.9322 79.8161 21.4346 78.9365 20.3779C76.2883 22.6045 74.3994 23.2705 70.9824 23.2705C66.9205 23.2704 63.7599 21.2017 63.7598 17.0693C63.76 13.8353 65.8832 11.6405 68.9072 10.5625C71.5213 9.61491 75.1819 9.44175 77.9795 9.18457V8.68066C77.9795 7.73316 78.0684 6.61312 77.3896 5.7959C76.8173 5.06313 75.6768 4.75981 74.6816 4.75977C72.8408 4.75979 71.2096 5.5385 70.8037 7.14844C70.7513 7.52325 70.4012 7.82294 69.9492 7.88086L65.2715 7.46582C65.0386 7.43939 64.829 7.33455 64.6924 7.17676C64.5559 7.01885 64.5043 6.82112 64.5498 6.63086C65.6262 1.94859 70.752 0.539074 75.3438 0.539062ZM121.97 0.52832C129.133 0.52832 133.007 5.60155 133.007 12.0488C133.007 18.2813 128.736 23.2246 121.97 23.2246C114.944 23.2244 111.116 18.1508 111.116 11.834C111.116 5.51715 114.991 0.528513 121.97 0.52832ZM51.6816 0.600586C54.2248 0.27568 56.7825 1.10765 58.373 2.77637C59.9063 4.49557 59.5909 7.00349 59.5908 9.18066V22.0723C59.5863 22.2719 59.4853 22.4624 59.3105 22.6006C59.1358 22.7387 58.9011 22.8131 58.6592 22.8086H53.8369C53.3627 22.7879 52.9887 22.4678 52.9824 22.0762V11.2461C52.9824 10.3866 53.072 8.23754 52.8457 7.41992C52.4869 6.04589 51.4065 5.6582 50.0098 5.6582C48.7297 5.6905 47.5961 6.3482 47.127 7.33105C46.6315 8.36687 46.6738 10.0834 46.6738 11.2461V22.0723C46.6693 22.2712 46.5692 22.4605 46.3955 22.5986C46.2217 22.7367 45.9884 22.8121 45.7471 22.8086H40.9121C40.4388 22.7863 40.066 22.4671 40.0576 22.0762V11.2461C40.0576 8.9666 40.4845 5.6084 37.0674 5.6084C33.6504 5.6085 33.7363 8.87504 33.7363 11.2461V22.0723C33.7318 22.2719 33.6308 22.4624 33.4561 22.6006C33.2813 22.7387 33.0467 22.8131 32.8047 22.8086H27.9775C27.5304 22.7891 27.1678 22.5033 27.124 22.1357V1.70117C27.1404 1.2919 27.5495 0.967828 28.0459 0.97168H32.5439C33.0048 0.992651 33.373 1.29662 33.3984 1.67676V4.34375H33.4883C34.6587 1.76131 36.867 0.55957 39.8398 0.55957C42.8126 0.559614 44.7476 1.76131 46.1016 4.34375C47.0055 2.35636 49.1385 0.925513 51.6816 0.600586ZM149.605 0.5C151.767 0.5 153.878 1.14467 155.24 2.90625C156.5 4.54101 156.5 7.29307 156.5 9.26953V22.125C156.429 22.5001 156.033 22.7744 155.573 22.7666H150.721C150.286 22.751 149.926 22.4809 149.866 22.125V11.0303C149.866 8.79661 150.182 5.52738 146.847 5.52734C145.608 5.57459 144.516 6.21337 144.053 7.16211C143.378 8.40931 143.288 9.65701 143.288 11.0381V22.0332C143.27 22.448 142.852 22.7744 142.349 22.7666H137.535C137.061 22.746 136.687 22.425 136.681 22.0332V1.59961C136.732 1.21167 137.135 0.920157 137.607 0.929688H142.084C142.492 0.940478 142.841 1.17428 142.938 1.50098V4.62598H143.032C144.382 1.83224 146.274 0.500128 149.605 0.5ZM107.409 0.894531C107.65 0.88788 107.884 0.962593 108.057 1.10156C108.229 1.2406 108.326 1.43189 108.323 1.63086V4.13574C108.323 4.555 107.895 5.10498 107.131 5.97168L98.9131 15.6465C101.963 15.5866 105.188 15.9631 107.96 17.249C108.472 17.4742 108.798 17.9085 108.814 18.3867V21.5156C108.814 21.9455 108.246 22.4418 107.644 22.1846C102.383 19.9544 96.1378 19.9642 90.8867 22.21C90.3358 22.4527 89.7598 21.9629 89.7598 21.5332V18.5566C89.7094 17.855 89.9142 17.1565 90.3486 16.5518L99.8701 5.27734H91.5664C91.3246 5.28507 91.0896 5.21039 90.916 5.07129C90.7425 4.93214 90.6449 4.74064 90.6475 4.54102V1.63086C90.6362 1.43164 90.7286 1.23801 90.9004 1.09766C91.0507 0.974901 91.2498 0.903057 91.459 0.894531H107.409ZM14.7197 12.4043C11.2302 12.4043 7.54332 13.0213 7.54297 16.4102C7.54297 18.1365 8.62412 19.2998 10.4736 19.2998C11.8319 19.2998 13.0495 18.6086 13.8184 17.4883C14.644 16.277 14.715 15.1357 14.7197 13.8311V12.4043ZM77.9883 12.3877C74.4985 12.3877 70.8115 13.0007 70.8115 16.3936C70.8118 18.1161 71.8929 19.2783 73.7422 19.2783C75.0959 19.2782 76.3175 18.5882 77.082 17.4717C78.0217 16.0907 77.9883 14.8007 77.9883 13.2471V12.3877ZM122.017 4.7002C118.459 4.7005 118.232 8.69514 118.232 11.1895C118.232 13.6839 118.19 19.0105 121.97 19.0107C125.75 19.0107 125.891 14.7131 125.891 12.0918C125.891 10.3725 125.801 8.30701 125.169 6.67578C124.626 5.26682 123.546 4.7002 122.017 4.7002Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Document Button */}
                    <div className="mt-4">
                        <Button
                            variant="outline"
                            className="w-full bg-[#06044B] border border-transparent text-[#61E987]">
                            Pay & Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

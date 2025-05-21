"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";

interface Document {
  id: number;
  name: string;
  itemNo: string;
  copies: number;
  price: string;
  imageSrc: string;
  status: string; // Added status field
  printOptions: {
    copies: number;
    paperSize: string;
    paperType: string;
    printType: string;
    orientation: string;
    fulfillment: string;
    duplex: string;
    collate: string;
    quality: string;
    staple: string;
    scaling: string;
  };
  paymentDetails: {
    subtotal: string;
    pickupFee: string;
    tax: string;
    total: string;
  };
  mapSrc: string;
}

const OrdersOverview: React.FC = () => {
  // Sample data for documents
  const documents: Document[] = [
    {
      id: 1,
      name: "Business Proposal1.pdf",
      itemNo: "CNF47654448320532",
      copies: 20,
      price: "₹ 750",
      status: "In Queue", // Default status
      imageSrc: "https://storage.googleapis.com/a1aa/image/6ce3fca7-dd6a-48e1-17cc-c7fb8ea1c201.jpg",
      printOptions: {
        copies: 15,
        paperSize: 'Letter (8.5" × 11")',
        paperType: "Standard",
        printType: "Black & White",
        orientation: "Portrait",
        fulfillment: "Store Pickup",
        duplex: "One - Sided",
        collate: "Yes",
        quality: "High Quality",
        staple: "Yes",
        scaling: "100%",
      },
      paymentDetails: {
        subtotal: "₹ 750",
        pickupFee: "₹ 0.00",
        tax: "₹ 18.0",
        total: "₹ 768.0",
      },
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119064.90027594799!2d78.99010793294913!3d21.161225997003946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1747767266267!5m2!1sen!2sin",
    },
    {
      id: 2,
      name: "Business Proposal2.pdf",
      itemNo: "CNF47654448320532",
      copies: 20,
      price: "₹ 1200",
      status: "In Printing", // Different status
      imageSrc: "https://storage.googleapis.com/a1aa/image/b8a4adca-326b-40d9-c5ad-aa5726e50813.jpg",
      printOptions: {
        copies: 25,
        paperSize: 'A4 (8.27" × 11.69")',
        paperType: "Glossy",
        printType: "Color",
        orientation: "Landscape",
        fulfillment: "Store Pickup",
        duplex: "Two - Sided",
        collate: "No",
        quality: "Standard",
        staple: "No",
        scaling: "100%",
      },
      paymentDetails: {
        subtotal: "₹ 1200",
        pickupFee: "₹ 0.00",
        tax: "₹ 96.0",
        total: "₹ 1296.0",
      },
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.975168085054!2d77.59456631477088!3d12.971598990867693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfeb6b267b33f!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1747767266267!5m2!1sen!2sin",
    },
    // Adding a third document to demonstrate "Ready for Pickup"
    {
      id: 3,
      name: "Business Proposal3.pdf",
      itemNo: "CNF47654448320533",
      copies: 15,
      price: "₹ 900",
      status: "Ready for Pickup",
      imageSrc: "https://storage.googleapis.com/a1aa/image/b8a4adca-326b-40d9-c5ad-aa5726e50813.jpg", // Reuse image for demo
      printOptions: {
        copies: 10,
        paperSize: 'A4 (8.27" × 11.69")',
        paperType: "Matte",
        printType: "Black & White",
        orientation: "Portrait",
        fulfillment: "Store Pickup",
        duplex: "One - Sided",
        collate: "Yes",
        quality: "High Quality",
        staple: "Yes",
        scaling: "100%",
      },
      paymentDetails: {
        subtotal: "₹ 900",
        pickupFee: "₹ 0.00",
        tax: "₹ 72.0",
        total: "₹ 972.0",
      },
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.455086589614!2d77.02663531508386!3d28.45951998248595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1dd7b0b6f7e3%3A0x3c3b7f7b7f7b7f7b!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1747767266267!5m2!1sen!2sin",
    },
  ];

  // State to track the selected document
  const [selectedDocument, setSelectedDocument] = useState<Document>(documents[0]);

  // Handler for clicking a document
  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
  };

  return (
    <div className="bg-[#E6E7F0] p-6 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-black">Orders</h1>
          <p className="text-sm text-gray-600">
            Orders /{" "}
            <span className="text-[#06044B] font-semibold">Order ID: #10025</span>
          </p>
        </header>

        {/* Main Content */}
        <main className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="max-w-5xl col-end-9 bg-white rounded-lg p-6 space-y-6" style={{ width: "1000px" }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 border-b border-gray-300 pb-3">
              <div className="text-black text-base font-semibold">
                Order ID: <span className="font-bold">#10025</span>
              </div>
              <div className="hidden sm:block border-l border-gray-300 h-5 mx-4"></div>
              <div className="text-gray-700 text-sm mt-2 sm:mt-0">
                Order Date & Time: 2025/04/22 11:15:32 am
              </div>
              <div className="flex space-x-2 ml-auto mt-3 sm:mt-0">
                <div className="text-[10px] font-semibold text-black bg-yellow-400 rounded-full px-3 py-1 flex items-center">
                  Priority: High
                </div>
                <div className="text-[10px] font-semibold text-[#a97fff] bg-[#f0e6ff] rounded-full px-3 py-1 flex items-center">
                  {selectedDocument.status}
                </div>
              </div>
            </div>
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side */}
              <div className="space-y-4">
                {/* Document cards */}
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex items-center space-x-4 rounded-md p-4 max-w-full cursor-pointer ${
                      selectedDocument.id === doc.id ? "bg-indigo-100" : "bg-[#e6eaf3]"
                    }`}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    <a
                      href={`/order-details/${doc.id}`}
                      className="flex items-center space-x-4 w-full"
                      onClick={(e) => e.preventDefault()} // Prevent navigation for demo
                    >
                      <img
                        alt={doc.name}
                        className="w-16 h-16 rounded"
                        src={doc.imageSrc}
                        width="64"
                        height="64"
                      />
                      <div className="text-xs text-gray-900 leading-tight">
                        <div className="font-semibold text-[13px]">{doc.name}</div>
                        <div className="text-[11px]">
                          Item No: <span className="font-bold">{doc.itemNo}</span>
                        </div>
                        <div className="text-[11px] text-gray-500">Copies: {doc.copies}</div>
                      </div>
                      <div className="ml-auto font-semibold text-[13px] flex items-center space-x-2">
                        <span>{doc.price}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check2-circle text-green-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg>
                      </div>
                    </a>
                  </div>
                ))}
                {/* Customer Information */}
                <div className="border border-gray-300 rounded-md p-3 max-w-full">
                  <div className="flex items-center space-x-2 mb-3 text-[13px] font-semibold text-gray-900">
                  <i className="fa-regular fa-user"></i>
                    <span>Customer Information</span>
                  </div>
                  <hr className="border-gray-300 mb-3" />
                  <div className="flex items-center space-x-3">
                    <img
                      alt="Emoji style avatar of a woman with pink headscarf and yellow top"
                      className="w-10 h-10 rounded"
                      src="https://storage.googleapis.com/a1aa/image/aebc22dc-dc01-4178-d55a-c9f4268f3b46.jpg"
                      width="40"
                      height="40"
                    />
                    <div className="text-[12px] text-gray-900">
                      <div className="font-semibold">
                        Emma Thompson <span className="font-normal text-gray-500">emma.t@example.com</span>
                      </div>
                      <div className="text-gray-700 text-[11px]">+91 845 684 2456</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right side */}
              <div className="space-y-4">
                {/* Print options */}
                <div className="border border-gray-300 rounded-md p-4 max-w-full">
                  <div className="flex items-center space-x-2 mb-3 text-[13px] font-semibold text-gray-900">
                    <i className="fas fa-print"></i>
                    <span>Print options</span>
                  </div>
                  <hr className="border-gray-300 mb-3" />
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-700">
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Copies</div>
                      <div className="text-[12px] text-black">{selectedDocument.printOptions.copies}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Paper Size</div>
                      <div className="text-[12px] text-black">{selectedDocument.printOptions.paperSize}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Paper type</div>
                      <div className="text-[12px] text-black">{selectedDocument.printOptions.paperType}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Print Type</div>
                      <div className="text-[12px] text-black">{selectedDocument.printOptions.printType}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Orientation</div>
                      <div className="text-[12px] text-black">{selectedDocument.printOptions.orientation}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Fulfillment</div>
                      <div>
                        <strong>{selectedDocument.printOptions.fulfillment}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Duplex</div>
                      <div className="text-[12px] text-black">{selectedDocument.printOptions.duplex}</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Collate</div>
                      <div>
                        <strong>{selectedDocument.printOptions.collate}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Quality</div>
                      <div>
                        <strong>{selectedDocument.printOptions.quality}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Staple</div>
                      <div>
                        <strong>{selectedDocument.printOptions.staple}</strong>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] text-[14px]">Scaling</div>
                      <strong>{selectedDocument.printOptions.scaling}</strong>
                    </div>
                  </div>
                </div>
                {/* Payment Details */}
                <div className="border border-gray-300 rounded-md p-4 max-w-full">
                  <div className="flex items-center space-x-2 mb-3 text-[13px] font-semibold text-gray-900">
                  <i className="fa-regular fa-credit-card"></i>
                    <span>Payment Details</span>
                  </div>
                  <hr className="border-gray-300 mb-3" />
                  <div className="text-[11px] text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{selectedDocument.paymentDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup fee:</span>
                      <span>{selectedDocument.paymentDetails.pickupFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>{selectedDocument.paymentDetails.tax}</span>
                    </div>
                  </div>
                  <hr className="my-3 border-gray-700" />
                  <div className="flex justify-between font-semibold text-[13px] text-gray-900">
                    <span>Total:</span>
                    <span>{selectedDocument.paymentDetails.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <section className="flex-1 max-w-[480px] bg-white rounded-lg border border-gray-300 p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
              <i className="fa-regular fa-map"></i>
                <p className="text-sm font-semibold text-gray-700">Track Delivery</p>
              </div>
            </div>
            <hr className="border-gray-300 mb-4" />
            <iframe
              src={selectedDocument.mapSrc}
              style={{
                width: "408px",
                height: "270px",
                borderRadius: "10px",
                position: "relative",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OrdersOverview;
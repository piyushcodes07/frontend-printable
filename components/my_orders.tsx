"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function MyOrders() {
  const { user } = useUser();
  const [status, setStatus] = useState("all");

  const orders = [
    {
      id: 1,
      orderDate: "2025/04/22 11:15:32 am",
      orderNo: "CNF47654448320532",
      productName: "Business Proposal.pdf",
      address: "Print Master Shop, 123 Main St, New York, NY 10001",
      priority: "High",
      status: "Shipped",
      price: "2450.00",
      copies: 20,
    },
    {
      id: 2,
      orderDate: "2025/04/18 14:12:24 pm",
      orderNo: "CNF47654448320533",
      productName: "Project Report.docx",
      address: "Digital Print Shop, 789 Market St, Chicago, IL 60007",
      priority: "Low",
      status: "Delivered",
      price: "1500.00",
      copies: 15,
    },
    {
      id: 3,
      orderDate: "2025/04/20 10:00:00 am",
      orderNo: "CNF47654448320534",
      productName: "Invoice 102.pdf",
      address: "Creative Prints, 456 Commerce St, Los Angeles, CA 90001",
      priority: "Medium",
      status: "Shipped",
      price: "1200.00",
      copies: 10,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (status === "all") return true;
    return order.status.toLowerCase() === status.toLowerCase();
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        <aside className="w-64 bg-white p-6 shadow-md min-h-screen">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={user?.imageUrl || "/default-avatar.png"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold">{user?.firstName} {user?.lastName}</h4>
              <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
          <nav className="space-y-4">
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">My Account</a>
            <a href="#" className="block p-2 bg-blue-100 text-blue-700 rounded">My Orders</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">History</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">My Walt</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">My Drive</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setStatus("all")}
              className={`px-4 py-2 ${status === "all" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
            >
              All
            </button>
            <button
              onClick={() => setStatus("shipped")}
              className={`px-4 py-2 ${status === "shipped" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
            >
              Shipped
            </button>
            <button
              onClick={() => setStatus("delivered")}
              className={`px-4 py-2 ${status === "delivered" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
            >
              Delivered
            </button>
          </div>
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded shadow-md">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order Date & Time: {order.orderDate} | Order No: {order.orderNo}
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <div className="w-16 h-20 bg-gray-100" />
                      <div>
                        <h3 className="font-semibold">{order.productName}</h3>
                        <p className="text-sm text-gray-500">{order.address}</p>
                        <div className="flex space-x-2 mt-2">
                          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Priority: {order.priority}</span>
                          <span className={`text-xs ${order.status === "Delivered" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"} px-2 py-1 rounded`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">₹{order.price}</p>
                    <p className="text-sm text-gray-500">Copies: {order.copies}</p>
                    <p className="text-sm text-gray-500">Store Pickup</p>
                    <div className="flex space-x-2 mt-4">
                      <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded">Invoice</button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded">Track Order</button>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-6">
                  <div className="h-full bg-green-500 rounded-full w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

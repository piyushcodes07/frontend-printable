'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: number;
  orderDate: string;
  orderNo: string;
  title: string;
  shop: string;
  address: string;
  estDelivery: string | null;
  priority: string;
  priorityColor: string;
  deliveryProgress: number;
  price: string;
  copies: number;
  pickup: boolean;
  status: string;
  imgSrc: string;
  imgAlt: string;
  mapUrl?: string; // Dynamic map URL from API
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedInvoice, setExpandedInvoice] = useState<number | null>(null);
  const [showTrackOrder, setShowTrackOrder] = useState<{ [key: number]: boolean }>({});
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderDate: "2025/04/22 11:15:32 am",
      orderNo: "CNF47654448320532",
      title: "Business Proposal.pdf",
      shop: "Print Master Shop",
      address: "123 Main St, New York, NY 10001",
      estDelivery: "12 minutes",
      priority: "High",
      priorityColor: "bg-yellow-400 text-black",
      deliveryProgress: 70,
      price: "₹2450.00",
      copies: 20,
      pickup: true,
      status: "Printing",
      imgSrc: "https://storage.googleapis.com/a1aa/image/97837679-a8dc-4401-2d7b-ddd77493698b.jpg",
      imgAlt: "Thumbnail of a document titled How I structure AI Prompts for Design with text and diagrams",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241280380801!2d-74.00601508459418!3d40.71277517933091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAuNzEyNzc1MSwtNzQuMDA2MDE1MQ!5e0!3m2!1sen!2sin!4v1708425086404!5m2!1sen!2sin"
    },
    {
      id: 2,
      orderDate: "2025/04/22 11:15:32 am",
      orderNo: "CNF47654448320532",
      title: "Business Proposal.pdf",
      shop: "Print Master Shop",
      address: "123 Main St, New York, NY 10001",
      estDelivery: null,
      priority: "Normal",
      priorityColor: "bg-sky-500 text-white",
      deliveryProgress: 100,
      price: "₹2450.00",
      copies: 20,
      pickup: true,
      status: "Delivered",
      imgSrc: "https://storage.googleapis.com/a1aa/image/97837679-a8dc-4401-2d7b-ddd77493698b.jpg",
      imgAlt: "Thumbnail of a document titled How I structure AI Prompts for Design with text and diagrams",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241280380801!2d-74.00601508459418!3d40.71277517933091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAuNzEyNzc1MSwtNzQuMDA2MDE1MQ!5e0!3m2!1sen!2sin!4v1708425086404!5m2!1sen!2sin"
    }
  ]);

  // Define timeline steps, matching original design
  const timelineSteps = [
    { status: "Order Placed", label: "Order Placed", icon: null, badge: null, badgeColor: null },
    { status: "Printing", label: "Printing", icon: "fas fa-print", badge: "Printing at high quality", badgeColor: "text-blue-500 bg-blue-200" },
    { status: "Ready for Pickup", label: "Ready for Pickup", icon: "fas fa-check", badge: "Available at PrintMaster Shop", badgeColor: "text-orange-500 bg-orange-200" },
    { status: "Picked Up", label: "Picked Up", icon: null, badge: null, badgeColor: null },
    { status: "Delivered", label: "Delivered", icon: "fas fa-check", badge: "Delivered successfully", badgeColor: "text-green-500 bg-green-200" }
  ];

  // Function to fetch order status and location from API
  const fetchOrderData = async (orderId: number) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status: data.status || order.status,
                  address: data.location?.address || order.address,
                  mapUrl: data.location?.lat && data.location?.lng
                    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241280380801!2d${data.location.lng}!3d${data.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${data.location.lat},${data.location.lng}!5e0!3m2!1sen!2sin!4v1708425086404!5m2!1sen!2sin`
                    : `https://www.google.com/maps/embed?q=${encodeURIComponent(data.location?.address || order.address)}&key=YOUR_GOOGLE_MAPS_API_KEY`
                }
              : order
          )
        );
      } else {
        console.error('Failed to fetch order data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  // Fetch data for all orders on component mount
  useEffect(() => {
    orders.forEach(order => {
      fetchOrderData(order.id);
    });
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'All') return true;
    return order.status === activeFilter;
  });

  const toggleInvoice = (orderId: number) => {
    if (expandedInvoice === orderId) {
      setExpandedInvoice(null);
      setShowTrackOrder(prev => ({
        ...prev,
        [orderId]: false
      }));
    } else {
      setExpandedInvoice(orderId);
      setShowTrackOrder(prev => {
        const newState = { [orderId]: true };
        return newState;
      });
      fetchOrderData(orderId); // Fetch status and location when expanding
    }
  };

  // Determine the height of the green line based on the current status
  const getLineHeight = (status: string) => {
    const currentStepIndex = timelineSteps.findIndex(step => step.status === status);
    if (currentStepIndex === -1) return '0px';
    return `${(currentStepIndex + 1) * 80 - 40}px`; // Matches original spacing
  };

  // Determine if a step is active (green dot) based on the current status
  const isStepActive = (stepStatus: string, currentStatus: string) => {
    const stepIndex = timelineSteps.findIndex(step => step.status === stepStatus);
    const currentStepIndex = timelineSteps.findIndex(step => step.status === currentStatus);
    return stepIndex <= currentStepIndex;
  };

  return (
    <div className="bg-[#e6e7f0] min-h-screen">
      <main className="max-w-[1440px] mx-auto flex gap-6 px-6 py-8">
        <section className="flex-1 bg-white rounded-lg flex flex-col">
          <h2 className="text-gray-900 font-semibold text-[25px] px-6 py-2">My Orders</h2>
          <aside className="bg-white rounded-lg w-100% flex-shrink-0 flex flex-col border border-gray-200"></aside>
          <div className="p-6">
            <div className="flex gap-3 mb-6 mt-4">
              <button 
                className={`text-gray-900 bg-white border border-gray-300 rounded-md px-4 py-1 text-sm ${activeFilter === 'All' ? 'bg-gray-300 font-semibold' : 'font-normal'}`}
                onClick={() => setActiveFilter('All')}
                type="button"
              >
                All
              </button>
              <button 
                className={`text-gray-900 bg-white border border-gray-300 rounded-md px-4 py-1 text-sm ${activeFilter === 'Shipped' ? 'bg-gray-300 font-semibold' : 'font-normal'}`}
                onClick={() => setActiveFilter('Shipped')}
                type="button"
              >
                Shipped
              </button>
              <button 
                className={`text-gray-900 bg-white border border-gray-300 rounded-md px-4 py-1 text-sm ${activeFilter === 'Delivered' ? 'bg-gray-300 font-semibold' : 'font-normal'}`}
                onClick={() => setActiveFilter('Delivered')}
                type="button"
              >
                Delivered
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {filteredOrders.map(order => (
                <article key={order.id} className="bg-[#d9dce6] rounded-lg p-4 flex flex-col gap-4">
                  <header className="flex flex-wrap justify-between text-xs text-gray-900 font-normal">
                    <div className='flex gap-2'>
                      <p className='text-[15px]'>Order Date & Time : {order.orderDate}</p>
                      <aside className="bg-white rounded-lg h-50% flex-shrink-0 flex flex-col border border-gray-400"></aside>
                      <p className='text-[15px]'>Order No: <span className="font-semibold">{order.orderNo}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="flex items-center gap-1 bg-white border border-gray-300 rounded-md px-3 py-1 text-xs font-normal"
                      >
                        <i className="far fa-bookmark" /> Invoice
                      </button>
                      {showTrackOrder[order.id] ? (
                        <button 
                          className="flex items-center gap-1 bg-[#0a0c3b] text-white rounded-md px-4 py-1 text-xs font-normal"
                          onClick={() => toggleInvoice(order.id)}
                          aria-label="Close tracking"
                        >
                          <i className="fas fa-times" />
                        </button>
                      ) : (
                        <button 
                          className="flex items-center gap-1 bg-[#0a0c3b] text-white rounded-md px-4 py-1 text-xs font-normal"
                          onClick={() => toggleInvoice(order.id)}
                          aria-label="Track order"
                        >
                          <i className="fas fa-user-lock" /> Track order
                        </button>
                      )}
                    </div>
                  </header>
                  <aside className="bg-white rounded-lg w-100% flex-shrink-0 flex flex-col border border-gray-400"></aside>
                  <div className="flex gap-4">
                    <img 
                      src={order.imgSrc} 
                      alt={order.imgAlt} 
                      className="w-[150px] h-[150px] object-contain rounded-sm" 
                      width="100" 
                      height="80"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className='py-2'>
                        <h3 className="font-semibold text-gray-900 text-[20px] mb-1 py-2">{order.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-700 mb-1 py-2">
                          <i className="fas fa-store-alt" />
                          <span>{order.shop}</span>
                          <span className="mx-2">|</span>
                          <i className="fas fa-map-marker-alt" />
                          <span>{order.address}</span>
                        </div>
                        <div className="flex gap-2 text-xs py-2">
                          {order.estDelivery && (
                            <span className="bg-white rounded-full px-3 py-1 text-gray-900 font-normal">
                              Est. Delivery Time: {order.estDelivery}
                            </span>
                          )}
                          {order.status === "Delivered" && (
                            <span className="bg-green-400 rounded-full px-3 py-1 text-white font-normal">
                              Delivered
                            </span>
                          )}
                          <span className={`${order.priorityColor} rounded-full px-3 py-1 font-semibold`}>
                            Priority: {order.priority}
                          </span>
                        </div>
                      </div>
                      <div className='w-100%'>
                        <aside className="bg-white rounded-lg w-100% flex-shrink-0 flex flex-col border border-gray-400" style={{width: '112%'}}></aside>
                        {order.status !== "Delivered" && (
                          <div className='py-2 w-150%' style={{width: '112%'}}>
                            <div className="flex items-center text-xs text-gray-900 mb-1">
                              <span className="mr-2 font-normal">Delivery Progress:</span>
                              <div className="flex-1 h-2 rounded-full bg-white border border-gray-300 overflow-hidden">
                                <div 
                                  className="h-2 bg-green-400 rounded-full" 
                                  style={{ width: `${order.deliveryProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end text-gray-900 text-sm font-semibold">
                      <div className="text-right">
                        <p className="text-lg font-semibold py-2">{order.price}</p>
                        <p className="text-xs font-normal text-gray-600 py-2">Copies: {order.copies}</p>
                        <button className="flex items-center gap-1 mt-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-xs font-semibold text-gray-900" style={{borderRadius: '25px'}}>
                          <i className="fas fa-store-alt" /> Store Pickup
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Accordion */}
                  {expandedInvoice === order.id && (
                    <div className="mt-4">
                      <div className="flex gap-4">
                        {/* Delivery Timeline Card */}
                        <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-lg font-semibold mb-4">Delivery Timeline</h4>
                          <div className="relative">
                            <div 
                              className="absolute left-4 top-10 bottom-0 w-1.5 bg-green-500" 
                              style={{ top: '10px', left: '14px', width: '5px', height: getLineHeight(order.status) }}
                            ></div>
                            <div className="space-y-8">
                              {timelineSteps.map((step, index) => (
                                <div key={step.status} className="relative flex items-center">
                                  <div 
                                    className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                      isStepActive(step.status, order.status) ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                    aria-label={`${step.label}: ${isStepActive(step.status, order.status) ? 'Completed' : 'Pending'}`}
                                  ></div>
                                  <div className="ml-12">
                                    <p className={`font-semibold ${isStepActive(step.status, order.status) ? 'text-gray-900' : 'text-gray-500'}`}>
                                      {step.label}
                                    </p>
                                    {step.badge && isStepActive(step.status, order.status) && (
                                      <span>
                                        <span className="mx-2"> | </span>
                                        <span className={`text-sm ${step.badgeColor} rounded-full px-3 py-1`}>
                                          {step.icon && <i className={step.icon}></i>} {step.badge}
                                        </span>
                                      </span>
                                    )}
                                    <p className="text-sm text-gray-600">{order.orderDate}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Map Card */}
                        <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-lg font-semibold mb-4">Delivery Location</h4>
                          <div className="h-[500px] w-full bg-gray-100 rounded-lg relative overflow-hidden">
                            <iframe
                              src={order.mapUrl || "https://www.google.com/maps/embed?q=123+Main+St,+New+York,+NY+10001&key=YOUR_GOOGLE_MAPS_API_KEY"}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              aria-label={`Map showing delivery location for ${order.address}`}
                            ></iframe>
                            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                              <button className="flex items-center gap-2 text-sm text-blue-600">
                                <i className="fas fa-directions"></i>
                                Get Directions
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
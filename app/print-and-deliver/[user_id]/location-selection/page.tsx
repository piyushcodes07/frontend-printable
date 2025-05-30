"use client";
/// <reference types="google.maps" />

import { useOrder, DocumentItem } from "@/context/orderContext";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  ChevronLeft,
  Clock,
  Search,
  Store,
  Home,
  Check,
  MapPinOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { NavBar } from "@/components/nav-bar"; // Assuming this exists
import { cn } from "@/lib/utils"; // Assuming this exists
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface Merchant {
  merchantId: string;
  shopName: string;
  latitude: string | null; // UPDATED: Latitude as string (from API response)
  longitude: string | null; // UPDATED: Longitude as string (from API response)
  MerchantImages: any[];
  averageRating: string;
  ratingCount: number;
  googleDistance: string;
  duration: string;
  durationInTraffic: string;
  address?: string; // ADDED: Address can be optional if not always returned or needed for InfoWindow
}

// Mock merchant data - UPDATED WITH LATITUDE AND LONGITUDE
const MERCHANTS: Merchant[] = [
  {
    merchantId: "merchant_1",
    shopName: "Print Master Shop",
    latitude: "40.7150", // Example coordinates
    longitude: "-74.0080", // Example coordinates
    MerchantImages: ["/placeholder.svg?height=150&width=300"],
    averageRating: "4.80",
    ratingCount: 123,
    googleDistance: "0.5 km",
    duration: "2 mins",
    durationInTraffic: "2 mins",
    address: "123 Main St, New York, NY 10001",
  },
  {
    merchantId: "merchant_2",
    shopName: "Quality Print Solutions",
    latitude: "40.7090", // Example coordinates
    longitude: "-74.0120", // Example coordinates
    MerchantImages: ["/placeholder.svg?height=150&width=300"],
    averageRating: "4.90",
    ratingCount: 500,
    googleDistance: "1.2 km",
    duration: "5 mins",
    durationInTraffic: "6 mins",
    address: "456 Oak Ave, New York, NY 10004",
  },
  {
    merchantId: "merchant_3",
    shopName: "Quick Print Services",
    latitude: "40.7200", // Example coordinates
    longitude: "-73.9950", // Example coordinates
    MerchantImages: ["/placeholder.svg?height=150&width=300"],
    averageRating: "3.50",
    ratingCount: 56,
    googleDistance: "2.1 km",
    duration: "8 mins",
    durationInTraffic: "10 mins",
    address: "789 Pine Ln, New York, NY 10002",
  },
];

type DeliveryOption = "pickup" | "delivery";
type LocationPermissionStatus =
  | "prompt"
  | "granted"
  | "denied"
  | "unsupported"
  | "loading";

declare global {
  interface Window {
    google: any;
  }
}

export default function LocationSelectionPage() {
  const handelOrderSubmit = async () => {
    const orderFinal = {
      ...order,
    };
    const result = await fetch(`http://localhost:5000/api/order/`, {
      method: "POST",
      body: JSON.stringify({ ...order, merchantId: selectedMerchant }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ ...orderFinal, merchantId: selectedMerchant });
    const res = await result.json();
    console.log(res);
  };
  const { order, dispatch } = useOrder();
  const [selectedMerchant, setSelectedMerchant] = useState<String | null>(null);
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>("pickup");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationPermission, setLocationPermission] =
    useState<LocationPermissionStatus>("loading");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyMerchants, setNearbyMerchants] = useState<Merchant[]>([]);
  const [isLoadingMerchants, setIsLoadingMerchants] = useState(true);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  // Store a map of merchantId to marker for easy lookup
  const merchantMarkersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  // Use a single InfoWindow instance to avoid multiple popups
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Filter merchants based on search query
  const filteredMerchants = nearbyMerchants.filter((merchant) =>
    merchant.shopName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getUserLocation = () => {
    setLocationPermission("loading");
    setIsLoadingMerchants(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userCoords);
        setLocationPermission("granted");

        if (googleMapRef.current) {
          updateUserLocationOnMap(userCoords);
        }

        (async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/user/nearest-merchants?lat=${userCoords.lat}&long=${userCoords.lng}`,
            );
            const data = await response.json();

            if (!response.ok) {
              console.log("Error while fetching Merchant data:", data);
              setNearbyMerchants(MERCHANTS); // Fallback to mock
            } else {
              console.log("Nearby merchants from API:", data);
              // Ensure that API response data has latitude and longitude as strings
              // and potentially an 'address' field. If not, you may need to map/transform data.
              const apiMerchants: Merchant[] = data.map((item: any) => ({
                merchantId: item.merchantId,
                shopName: item.shopName,
                latitude: item.latitude ? String(item.latitude) : null,
                longitude: item.longitude ? String(item.longitude) : null,
                MerchantImages: item.MerchantImages || [],
                averageRating: item.averageRating || "0.00",
                ratingCount: item.ratingCount || 0,
                googleDistance: item.googleDistance || "N/A",
                duration: item.duration || "N/A",
                durationInTraffic: item.durationInTraffic || "N/A",
                address: item.address || "Address not available", // Assuming API returns address
              }));
              setNearbyMerchants(apiMerchants);
            }
          } catch (e) {
            console.log("Error while calling API", e);
            setNearbyMerchants(MERCHANTS); // Fallback to mock
          } finally {
            setIsLoadingMerchants(false);
          }
        })();
      },
      (error) => {
        console.error("Geolocation error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationPermission("denied");
        } else {
          setLocationPermission("denied");
        }
        setIsLoadingMerchants(false);
        setNearbyMerchants(MERCHANTS);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationPermission("unsupported");
      setIsLoadingMerchants(false);
      setNearbyMerchants(MERCHANTS);
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          setLocationPermission(
            permissionStatus.state as LocationPermissionStatus,
          );

          if (
            permissionStatus.state === "granted" ||
            permissionStatus.state === "prompt"
          ) {
            getUserLocation();
          } else {
            setIsLoadingMerchants(false);
            setNearbyMerchants(MERCHANTS);
          }

          permissionStatus.onchange = () => {
            setLocationPermission(
              permissionStatus.state as LocationPermissionStatus,
            );
            if (permissionStatus.state === "granted") {
              getUserLocation();
            } else if (permissionStatus.state === "denied") {
              setIsLoadingMerchants(false);
              setNearbyMerchants(MERCHANTS);
              setUserLocation(null);
            }
          };
        })
        .catch(() => {
          console.warn(
            "Permissions API failed, falling back to direct geolocation.",
          );
          getUserLocation();
        });
    } else {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google?.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Use a separate useEffect to handle merchant marker creation/updates
  useEffect(() => {
    if (mapLoaded && googleMapRef.current) {
      // Clear existing merchant markers
      merchantMarkersRef.current.forEach((marker) => marker.setMap(null));
      merchantMarkersRef.current.clear(); // Clear the map of markers

      // Create a single InfoWindow instance if it doesn't exist
      if (!infoWindowRef.current) {
        infoWindowRef.current = new window.google.maps.InfoWindow();
      }

      // Add new markers for nearbyMerchants
      nearbyMerchants.forEach((merchant) => {
        // Only create a marker if coordinates are available
        if (merchant.latitude && merchant.longitude) {
          const merchantCoords = {
            lat: parseFloat(merchant.latitude),
            lng: parseFloat(merchant.longitude),
          };

          const merchantIcon = {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06044b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3" fill="#61e987"></circle>
                </svg>`,
              ),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          };

          const marker = new window.google.maps.Marker({
            position: merchantCoords,
            map: googleMapRef.current,
            title: merchant.shopName,
            icon: merchantIcon,
            zIndex: 900,
          });

          // Store the infoWindow content directly on the marker for easy access
          // Use optional chaining for merchant.address in case it's not present
          marker.infoWindowContent = `
            <div style="font-family: sans-serif; padding: 5px; text-align: center; color: #06044b;">
              <strong style="font-size: 1.1em;">${merchant.shopName}</strong>
              ${merchant.address ? `<p style="font-size: 0.8em; margin-top: 5px; color: #555;">${merchant.address}</p>` : ""}
            </div>
          `;

          marker.addListener("click", () => {
            setSelectedMerchant(merchant.merchantId); // This will trigger the effect below
            // Close any currently open info window
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            // Set new content and open the single info window
            infoWindowRef.current?.setContent(marker.infoWindowContent);
            infoWindowRef.current?.open(googleMapRef.current, marker);

            // Scroll to the merchant in the list
            const element = document.getElementById(
              `merchant-${merchant.merchantId}`,
            );
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });

          merchantMarkersRef.current.set(merchant.merchantId, marker);
        }
      });

      // Close InfoWindow when clicking on the map itself
      googleMapRef.current.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
      });
    }
  }, [nearbyMerchants, mapLoaded]); // Reruns when nearbyMerchants data or mapLoaded status changes

  // EFFECT TO PAN TO SELECTED MERCHANT ON MAP
  useEffect(() => {
    if (selectedMerchant && googleMapRef.current && mapLoaded) {
      const selectedMerchantData = nearbyMerchants.find(
        (m) => m.merchantId === selectedMerchant,
      );

      if (
        selectedMerchantData &&
        selectedMerchantData.latitude &&
        selectedMerchantData.longitude
      ) {
        const selectedCoords = {
          lat: parseFloat(selectedMerchantData.latitude),
          lng: parseFloat(selectedMerchantData.longitude),
        };
        googleMapRef.current.panTo(selectedCoords);
        googleMapRef.current.setZoom(15); // Zoom in a bit for selected merchant

        // Find the marker for the selected merchant and open its info window
        const marker = merchantMarkersRef.current.get(selectedMerchant);
        if (marker && infoWindowRef.current) {
          infoWindowRef.current.close(); // Close any existing info window
          infoWindowRef.current.setContent(marker.infoWindowContent);
          infoWindowRef.current.open(googleMapRef.current, marker);
        }
      }
    }
  }, [selectedMerchant, nearbyMerchants, mapLoaded]); // Reruns when selectedMerchant, nearbyMerchants, or mapLoaded changes

  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 40.7128, lng: -74.006 }; // Example: New York City
    const initialCenter = userLocation || defaultCenter;

    const mapOptions: google.maps.MapOptions = {
      center: initialCenter,
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
    };

    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      googleMapRef.current = map;
      setMapLoaded(true);

      if (userLocation) {
        updateUserLocationOnMap(userLocation);
      }
    }
  };

  const updateUserLocationOnMap = (location: { lat: number; lng: number }) => {
    if (!googleMapRef.current) return;

    googleMapRef.current.panTo(location);
    if (googleMapRef.current.getZoom() < 14) {
      googleMapRef.current.setZoom(14);
    }

    const userIcon = {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#06044b" stroke="#ffffff" stroke-width="2">
            <circle cx="12" cy="12" r="10" fill="#06044b" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="#61e987"/>
          </svg>`,
        ),
      scaledSize: new window.google.maps.Size(30, 30),
      anchor: new window.google.maps.Point(15, 15),
    };

    if (userMarkerRef.current) {
      userMarkerRef.current.setPosition(location);
      userMarkerRef.current.setMap(googleMapRef.current);
    } else {
      userMarkerRef.current = new window.google.maps.Marker({
        position: location,
        map: googleMapRef.current,
        title: "Your Location",
        icon: userIcon,
        zIndex: 1000,
      });

      userMarkerRef.current.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close(); // Close any other open InfoWindow
        }
        infoWindowRef.current?.setContent(`
          <div style="font-family: sans-serif; padding: 5px; text-align: center; color: #06044b;">
            <strong>Your Location</strong>
          </div>
        `);
        infoWindowRef.current?.open(
          googleMapRef.current,
          userMarkerRef.current,
        );
      });
    }
  };

  const renderStars = (rating: number) => {
    const numericRating = parseFloat(rating.toString());
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(numericRating)
                ? "text-yellow-400"
                : star - 0.5 <= numericRating
                  ? "text-yellow-400"
                  : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">
          ({numericRating.toFixed(1)})
        </span>
      </div>
    );
  };

  const renderLocationPermissionMessage = () => {
    if (locationPermission === "granted" && userLocation) return null;

    if (locationPermission === "denied") {
      return (
        <Alert className="mb-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <MapPinOff className="h-5 w-5 text-yellow-600 mr-2" />
            <AlertDescription className="text-yellow-700">
              Location access denied. Please enable location services in your
              browser settings to see nearby merchants.
            </AlertDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            onClick={getUserLocation}
          >
            Try Again
          </Button>
        </Alert>
      );
    }

    if (
      locationPermission === "loading" ||
      (locationPermission === "prompt" && isLoadingMerchants)
    ) {
      return (
        <Alert className="mb-4 bg-[#f0fdf4] border-[#90f0ab]">
          <div className="flex items-center">
            {isLoadingMerchants ? (
              <Loader2 className="h-5 w-5 text-[#06044b] mr-2 animate-spin" />
            ) : (
              <MapPin className="h-5 w-5 text-[#06044b] mr-2" />
            )}
            <AlertDescription>
              {isLoadingMerchants
                ? "Fetching your location..."
                : "Please allow location access to find printing locations near you."}
            </AlertDescription>
          </div>
        </Alert>
      );
    }

    if (locationPermission === "unsupported") {
      return (
        <Alert className="mb-4 bg-gray-50 border-gray-200">
          <AlertDescription>
            Your browser doesn't support geolocation. We're showing all
            available merchants.
          </AlertDescription>
        </Alert>
      );
    }

    if (locationPermission === "prompt" && !isLoadingMerchants) {
      return (
        <Alert className="mb-4 bg-[#f0fdf4] border-[#90f0ab]">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-[#06044b] mr-2" />
            <AlertDescription>
              Awaiting your location permission. Please check your browser
              prompt.
            </AlertDescription>
          </div>
        </Alert>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#dffbe7] flex flex-col">
      {/* <NavBar /> */}
      <div className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="max-w-3xl w-full text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Print Your Documents with
            <span className="block text-[#61e987]">Printable</span>
          </h1>
          <p className="text-center max-w-xl mx-auto">
            Seamlessly upload your files, customize your print job, and have it
            delivered or ready for pickup
          </p>
        </div>

        <div className="flex justify-center items-center w-full max-w-2xl mb-12 overflow-x-auto py-4">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#61e987] flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs mt-2 whitespace-nowrap">
              Upload Document
            </span>
          </div>
          <div className="h-[2px] w-16 bg-[#61e987] flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#61e987] flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs mt-2 whitespace-nowrap">
              Print Options
            </span>
          </div>
          <div className="h-[2px] w-16 bg-[#61e987] flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <MapPin className="h-6 w-6 text-[#06044b]" />
            </div>
            <span className="text-xs mt-2 whitespace-nowrap">
              Select Location
            </span>
          </div>
          <div className="h-[2px] w-16 bg-[#e6e6ed] flex-shrink-0"></div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="18"
                  height="14"
                  x="3"
                  y="5"
                  rx="2"
                  stroke="#06044b"
                  strokeWidth="2"
                />
                <path d="M3 10H21" stroke="#06044b" strokeWidth="2" />
                <path
                  d="M7 15H13"
                  stroke="#06044b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xs mt-2 whitespace-nowrap">Review & Pay</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 w-full max-w-2xl border border-[#90f0ab] mb-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mr-4">
              <MapPin className="h-6 w-6 text-[#06044b]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Location Selection</h2>
              <p className="text-sm text-[#555555]">
                Choose a merchant and delivery option
              </p>
            </div>
          </div>

          {renderLocationPermissionMessage()}

          <div className="bg-[#f0fdf4] rounded-full p-1 flex mb-6">
            <button
              className={cn(
                "flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors",
                deliveryOption === "pickup"
                  ? "bg-white text-[#06044b] shadow-sm"
                  : "text-[#555555] hover:text-[#06044b]",
              )}
              onClick={() => setDeliveryOption("pickup")}
            >
              <Store className="h-4 w-4" />
              <span>Store Pickup</span>
            </button>
            <button
              className={cn(
                "flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors",
                deliveryOption === "delivery"
                  ? "bg-white text-[#06044b] shadow-sm"
                  : "text-[#555555] hover:text-[#06044b]",
              )}
              onClick={() => setDeliveryOption("delivery")}
            >
              <Home className="h-4 w-4" />
              <span>Home delivery</span>
            </button>
          </div>

          <h3 className="font-medium mb-3">Select Printing Location</h3>

          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, address or specialty"
              className="pl-10 pr-4 py-2 bg-[#f0fdf4] text-black rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#61e987] border-[#e0e0e0]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div
            ref={mapRef}
            className="w-full h-[200px] rounded-lg mb-4 bg-gray-100 overflow-hidden"
          ></div>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">Or</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <div className="space-y-4">
            {isLoadingMerchants &&
            !userLocation &&
            locationPermission !== "unsupported" ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-[#61e987] animate-spin mb-4" />
                <p className="text-[#06044b]">Finding merchants near you...</p>
                <p className="text-sm text-gray-500 mt-1">
                  This may take a moment
                </p>
              </div>
            ) : filteredMerchants.length > 0 ? (
              filteredMerchants.map((merchant) => (
                <div
                  key={merchant.merchantId}
                  id={`merchant-${merchant.merchantId}`}
                  className={cn(
                    "border rounded-lg overflow-hidden transition-all",
                    selectedMerchant === merchant.merchantId
                      ? "border-[#61e987] bg-[#f0fdf4]"
                      : "border-gray-200 hover:border-[#90f0ab]",
                  )}
                >
                  <div
                    className="flex cursor-pointer p-4"
                    // MODIFIED: On click, set selected merchant and trigger map pan/info window
                    onClick={() => setSelectedMerchant(merchant.merchantId)}
                  >
                    <div className="w-24 h-20 rounded overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={merchant.MerchantImages[0] || "/placeholder.svg"}
                        alt={merchant.shopName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-[#06044b]">
                          {merchant.shopName}
                        </h4>
                        <div className="w-5 h-5 rounded-full border-2 border-[#06044b] flex-shrink-0 flex items-center justify-center">
                          {selectedMerchant === merchant.merchantId && (
                            <div className="w-3 h-3 rounded-full bg-[#06044b]"></div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center mb-1">
                        {renderStars(parseFloat(merchant.averageRating))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({merchant.ratingCount})
                        </span>
                        <div className="flex items-center ml-3 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{merchant.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="rounded px-1 py-1">
                          <p className="text-[12px] text-gray-400">
                            Distance : {merchant.googleDistance}
                          </p>
                        </div>

                        <div>
                          <p className="text-[12px] text-gray-400">
                            Traffic : {merchant.durationInTraffic}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MapPinOff className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No merchants found matching your search.
                </p>
                {locationPermission !== "granted" &&
                  !isLoadingMerchants &&
                  MERCHANTS.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Showing all available merchants instead.
                    </p>
                  )}
              </div>
            )}
          </div>

          <Button
            className="w-full mt-6 bg-[#61e987] hover:bg-[#61e987]/90 text-[#06044b] font-medium"
            disabled={!selectedMerchant || isLoadingMerchants}
            onClick={handelOrderSubmit}
          >
            Confirm Selection
          </Button>
        </div>

        <div className="flex justify-between w-full max-w-2xl">
          <Link href="/print-options">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-[#d0d0d0] text-[#555555]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <Link
            href={
              selectedMerchant
                ? `/checkout?merchant=${selectedMerchant}&option=${deliveryOption}`
                : "#"
            }
          >
            <Button
              className="bg-[#06044b] hover:bg-[#06044b]/90 text-white px-6 uppercase text-xs font-semibold tracking-wider"
              disabled={!selectedMerchant || isLoadingMerchants}
            >
              Continue To Payment
            </Button>
          </Link>
        </div>
      </div>
      {/* <NavBar /> */}
    </div>
  );
}

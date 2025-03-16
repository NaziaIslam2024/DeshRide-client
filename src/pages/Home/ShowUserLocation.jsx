import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Fix Leaflet's default icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const ShowUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyPlaces(latitude, longitude);
        },
        () => setError("Unable to retrieve your location. Please enable location access."),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const fetchNearbyPlaces = async (lat, lng) => {
    try {
      // Increase radius from 2000 meters to 5000 meters (adjust as needed)
      const radius = 3000; // Change this value to increase/decrease radius (in meters)
      const overpassQuery = `
        [out:json];
        (
          node(around:${radius},${lat},${lng})["amenity"];
          node(around:${radius},${lat},${lng})["tourism"];
          node(around:${radius},${lat},${lng})["shop"];
        );
        out body;
      `;
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });
      const data = await response.json();

      const places = data.elements.map((element) => ({
        name: element.tags.name || element.tags.amenity || "Unnamed Place",
        lat: element.lat,
        lng: element.lon,
        type: element.tags.amenity || element.tags.tourism || element.tags.shop,
        address: element.tags["addr:street"]
          ? `${element.tags["addr:street"]}, ${element.tags["addr:city"] || ""}`
          : "Address not available",
      }));

      setNearbyPlaces([{ name: "Your Location", lat, lng, type: "user" }, ...places]);
    } catch (err) {
      console.error("Error fetching places:", err);
      setError("Failed to load nearby places.");
    }
  };

  const getIcon = (type) => {
    const iconMap = {
      user: "https://cdn-icons-png.flaticon.com/512/3307/3307717.png",
      courthouse: "https://cdn-icons-png.flaticon.com/512/6009/6009520.png",
      atm: "https://cdn-icons-png.flaticon.com/512/4550/4550712.png",
      yes: "https://cdn-icons-png.flaticon.com/512/8/8210.png",
      bakery: "https://cdn-icons-png.flaticon.com/512/5717/5717162.png",
      hostel: "https://cdn-icons-png.flaticon.com/512/5717/5717276.png",
      motorcycle: "https://static.thenounproject.com/png/192174-200.png",
      post_office: "https://cdn-icons-png.flaticon.com/512/3448/3448581.png",
      bank: "https://cdn-icons-png.flaticon.com/512/6395/6395487.png",
      townhall: "https://cdn-icons-png.flaticon.com/512/4287/4287730.png",
      bus_station: "https://cdn-icons-png.flaticon.com/512/6395/6395208.png",
      prison: "https://cdn-icons-png.flaticon.com/512/12347/12347342.png",
      apartment: "https://cdn-icons-png.flaticon.com/512/4878/4878396.png",
      u: "",
      police: "https://cdn-icons-png.flaticon.com/512/3448/3448647.png",
      supermarket: "https://cdn-icons-png.flaticon.com/512/7561/7561278.png",
      grave_yard: "https://cdn-icons-png.flaticon.com/512/3448/3448335.png",
      college: "https://cdn-icons-png.flaticon.com/512/4890/4890457.png",
      fuel: "https://cdn-icons-png.flaticon.com/512/7720/7720738.png",
      marketplace: "https://cdn-icons-png.flaticon.com/512/8059/8059048.png",
      school: "https://cdn-icons-png.flaticon.com/512/4705/4705140.png",
      pharmacy: "https://cdn-icons-png.flaticon.com/512/9922/9922129.png",
      hospital: "https://cdn-icons-png.flaticon.com/512/10714/10714002.png",
      restaurant: "https://cdn-icons-png.flaticon.com/512/4287/4287725.png",
      fast_food: "https://cdn-icons-png.flaticon.com/512/4287/4287725.png",
      hotel: "https://cdn-icons-png.flaticon.com/512/1690/1690224.png",
      default: "https://cdn-icons-png.flaticon.com/512/854/854992.png",
    };
    const isUser = type === "user";
    return new L.Icon({
      iconUrl: iconMap[type] || iconMap.default,
      iconSize: isUser ? [24, 24] : [36, 36], // Slightly larger icons
      iconAnchor: isUser ? [12, 24] : [18, 36],
      popupAnchor: isUser ? [0, -20] : [0, -34],
      shadowUrl: markerShadow,
      shadowSize: isUser ? [34, 34] : [45, 45],
    });
  };

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
      <p className="text-red-600 text-lg font-semibold p-6 bg-white rounded-lg shadow-md">{error}</p>
    </div>
  );
  if (!userLocation) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <p className="text-gray-700 text-lg font-semibold p-6 bg-white rounded-lg shadow-md animate-pulse">
        Loading your location...
      </p>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://wallpapercave.com/wp/wp5317954.png')] bg-cover bg-center ">
      <div className="max-w-7xl mx-auto">
        {/* Heading with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white  bg-clip-text ">
            Discover Your World
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Uncover hidden gems and essential spots around you, updated in real-time.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Section: Nearby Places Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-xl shadow-xl p-6 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2 text-blue-600">📍</span> Nearby Places ({nearbyPlaces.length - 1})
            </h2>
            <ul className="space-y-5">
              {nearbyPlaces.slice(1).map((place, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b-2 border-lime-500 pb-4 last:border-b-0 hover:bg-blue-50 transition-all duration-300 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={getIcon(place.type).options.iconUrl}
                      alt={place.type}
                      className="w-10 h-10 rounded-full bg-gray-100 p-1"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{place.name}</p>
                      <p className="text-sm text-gray-600 capitalize">Type: {place.type}</p>
                      <p className="text-sm text-gray-500 mt-1">{place.address}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Section: Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-[600px] rounded-xl shadow-xl overflow-hidden border-2 border-blue-200"
          >
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={14}
              maxZoom={19}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
                maxZoom={19}
              />
              <ZoomControl position="topright" />
              {nearbyPlaces.map((place, index) => (
                <Marker key={index} position={[place.lat, place.lng]} icon={getIcon(place.type)}>
                  <Popup>
                    <div className="p-2">
                      <strong className="text-gray-900">{place.name}</strong> <br />
                      <small className="text-gray-700">Type: {place.type}</small> <br />
                      <small className="text-gray-600">{place.address}</small>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowUserLocation;
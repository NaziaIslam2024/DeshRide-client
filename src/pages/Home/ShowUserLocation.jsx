import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  // Fetch user location with high accuracy
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

  // Fetch all nearby places using Overpass API
  const fetchNearbyPlaces = async (lat, lng) => {
    try {
      const overpassQuery = `
        [out:json];
        (
          node(around:2000,${lat},${lng})["amenity"];
          node(around:2000,${lat},${lng})["tourism"];
          node(around:2000,${lat},${lng})["shop"];
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
        phone: element.tags.phone || "Phone not available",
        website: element.tags.website || "Website not available",
      }));

      setNearbyPlaces([{ name: "Your Location", lat, lng, type: "user" }, ...places]);
    } catch (err) {
      console.error("Error fetching places:", err);
      setError("Failed to load nearby places.");
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!userLocation) return <div className="text-gray-600 p-4">Loading your location...</div>;

  const getIcon = (type) => {
    const iconMap = {
      user: "https://cdn-icons-png.flaticon.com/512/3307/3307717.png", 
      fuel: "https://cdn-icons-png.flaticon.com/512/7720/7720738.png", 
      marketplace: "https://cdn-icons-png.flaticon.com/512/8059/8059048.png", 
      motorcycle: "https://static.thenounproject.com/png/192174-200.png", 
      school: "https://cdn-icons-png.flaticon.com/512/4705/4705140.png", 
      pharmacy: "https://cdn-icons-png.flaticon.com/512/9922/9922129.png", 
      hospital: "https://cdn-icons-png.flaticon.com/512/10714/10714002.png", 
      restaurant: "https://cdn-icons-png.flaticon.com/512/4287/4287725.png", 
      hotel: "https://cdn-icons-png.flaticon.com/512/1690/1690224.png",
      bank: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", 
      station: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
      supermarket: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png", 
      default: "https://cdn-icons-png.flaticon.com/512/854/854992.png",
    };

    // Customize size for "user" type
    const isUser = type === "user";
    return new L.Icon({
      iconUrl: iconMap[type] || iconMap.default,
      iconSize: isUser ? [20, 20] : [32, 32], // Smaller for user, standard for others
      iconAnchor: isUser ? [10, 20] : [16, 32], // Adjusted anchor for smaller size
      popupAnchor: isUser ? [0, -18] : [0, -30], // Adjusted popup position
      shadowUrl: markerShadow,
      shadowSize: isUser ? [30, 30] : [41, 41], // Smaller shadow for user
    });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Your Location & Nearby Places</h1>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={14}
        maxZoom={19}
        scrollWheelZoom={true}
        style={{ height: "80%", width: "100%" }}
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
              <div>
                <strong>{place.name}</strong> <br />
                <small>Type: {place.type}</small> <br />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ShowUserLocation;
import React, { useState, useEffect, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import useUserLocation from "../hooks/useUserLocation";
import SearchForm from "./SearchForm";
import useDirection from "../hooks/useDirection";
import { useParams } from "react-router-dom";
const googleapi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

function Direction() {
  const { origin, destination } = useParams();
  const center = useUserLocation() || { lat: -34.397, lng: 150.644 };

  const {
    directionsResponse,
    distance,
    duration,
    calculateRoute,
    clearRoute,
    isLoaded,
  } = useDirection(origin, destination, "DRIVING");
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-screen h-96">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div>
        {directionsResponse && (
          <div>
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Direction;

import { useState, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const googleapi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

function useDirection(originRef, destiantionRef, transport) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleapi,
    libraries: libraries,
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const calculateRoute = useCallback(async () => {
    if (!isLoaded) {
      console.log("Google Maps API not loaded yet");
      return;
    }
    if (originRef === "" || destiantionRef === "") {
      return;
    }
    setDirectionsResponse(null);
    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef,
        destination: destiantionRef,
        travelMode: transport,
      });
      console.log("요청");
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error("Failed to fetch directions:", error);
    }
  }, [originRef, destiantionRef, isLoaded, transport]);

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef = "";
    destiantionRef = "";
  };

  return {
    isLoaded,
    directionsResponse,
    distance,
    duration,
    calculateRoute,
    clearRoute,
  };
}

export default useDirection;

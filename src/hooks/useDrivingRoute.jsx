// hooks/useDrivingRoute.js
import { useEffect } from "react";
import useDirection from "./useDirection";

export function useDrivingRoute(origin, destination) {
  const { directionsResponse, distance, duration, calculateRoute, isLoaded } =
    useDirection(origin, destination, "DRIVING");

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [calculateRoute, isLoaded]);

  return { directionsResponse, distance, duration, calculateRoute };
}

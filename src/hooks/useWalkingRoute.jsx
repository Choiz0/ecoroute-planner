// hooks/useDrivingRoute.js
import { useEffect } from "react";
import useDirection from "./useDirection";

export function useWalkingRoute(origin, destination) {
  const { directionsResponse, distance, duration, calculateRoute, isLoaded } =
    useDirection(origin, destination, "WALKING");

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [calculateRoute, isLoaded]);

  return { directionsResponse, distance, duration,calculateRoute};
}

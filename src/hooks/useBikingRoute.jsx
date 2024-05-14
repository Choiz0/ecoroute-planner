// hooks/useDrivingRoute.js
import { useEffect } from "react";
import useDirection from "./useDirection";

export function useBikingRoute(origin, destination) {
  const { directionsResponse, distance, duration, calculateRoute, isLoaded } =
    useDirection(origin, destination, "BICYCLING");

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [calculateRoute, isLoaded]);

  return { directionsResponse, distance, duration,calculateRoute };
}

import { useEffect } from "react";
import useDirection from "./useDirection";
import { extractRouteDetails } from "../utils/calculateCarbonEmission";

export default function useRoute(origin, destination, transport) {
  const { directionsResponse, distance, duration, calculateRoute, isLoaded } =
    useDirection(origin, destination, transport);

  useEffect(() => {
    if (isLoaded) {
      calculateRoute();
    }
  }, [calculateRoute, isLoaded]);

  const {
    directionsResponse: drivingDirections,
    distance: drivingDistance,
    duration: drivingDuration,
    calculateRoute: calculateDriving,
  } = useDirection(origin, destination, "DRIVING");

  const {
    directionsResponse: walkingDirections,
    distance: walkingDistance,
    duration: walkingDuration,
    calculateRoute: calculateWalking,
  } = useDirection(origin, destination, "WALKING");

  const {
    directionsResponse: bikingDirections,
    distance: bikingDistance,
    duration: bikingDuration,
    calculateRoute: calculateBiking,
  } = useDirection(origin, destination, "BICYCLING");

  const {
    directionsResponse: transitDirections,
    distance: transitDistance,
    duration: transitDuration,
    calculateRoute: calculateTransit,
  } = useDirection(origin, destination, "TRANSIT");

  return {
    drivingDirections,
    drivingDistance,
    drivingDuration,
    calculateDriving,
    walkingDirections,
    walkingDistance,
    walkingDuration,
    calculateWalking,
    bikingDirections,
    bikingDistance,
    bikingDuration,
    calculateBiking,
    transitDirections,
    transitDistance,
    transitDuration,
    calculateTransit,
  };
}

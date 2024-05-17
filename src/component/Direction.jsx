import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import useUserLocation from "../hooks/useUserLocation";
import useRoute from "../hooks/useRoute";
import { useParams } from "react-router-dom";
import SideResults from "./SideResults";
import { useQuery } from "react-query";
import ResultCard from "./ResultCard";
import { extractRouteDetails } from "../utils/calculateCarbonEmission";
import useDirection from "../hooks/useDirection";
import AIanalsis from "./AIanalsis";
import { useDrivingRoute } from "../hooks/useDrivingRoute";
import { useWalkingRoute } from "../hooks/useWalkingRoute";
import { useBikingRoute } from "../hooks/useBikingRoute";
import { useTransitRoute } from "../hooks/useTransitRoute";

function Direction() {
  const params = useParams();
  const origin = useMemo(() => params.origin, [params.origin]);
  const destination = useMemo(() => params.destination, [params.destination]);
  const location = useUserLocation();
  const { isLoaded } = useDirection();
  const center = location
    ? { lat: location.latitude, lng: location.longitude }
    : { lat: -34.397, lng: 150.644 };
  console.log(center);

  // const {
  //   directionsResponse: drivingDirections,
  //   calculateRoute: calculateDriving,
  // } = useRoute(origin, destination, "DRIVING");

  // const {
  //   directionsResponse: walkingDirections,
  //   calculateRoute: calculateWalking,
  // } = useRoute(origin, destination, "WALKING");

  // const {
  //   directionsResponse: bikingDirections,
  //   calculateRoute: calculateBiking,
  // } = useRoute(origin, destination, "BICYCLING");

  // const {
  //   directionsResponse: transitDirections,
  //   transitDetails,
  //   calculateRoute: calculateTransit,
  // } = useRoute(origin, destination, "TRANSIT");

  const {
    directionsResponse: drivingDirections,
    calculateRoute: calculateDriving,
  } = useDrivingRoute(origin, destination);
  const {
    directionsResponse: walkingDirections,
    calculateRoute: calculateWalking,
  } = useWalkingRoute(origin, destination);
  const {
    directionsResponse: bikingDirections,
    calculateRoute: calculateBiking,
  } = useBikingRoute(origin, destination);
  const {
    directionsResponse: transitDirections,
    calculateRoute: calculateTransit,
  } = useTransitRoute(origin, destination);

  const [map, setMap] = useState(null);
  const [mapKey, setMapKey] = useState(`${origin}-${destination}`);

  useEffect(() => {
    setMapKey(`${origin}-${destination}`);
  }, [origin, destination]);

  if (!isLoaded) {
    return (
      <>
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64" />
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 h-full mt-12">
      <div className="h-full border-e flex flex-col items-center w-full">
        <SideResults destination={destination} origin={origin} />
        <ResultCard destination={destination} origin={origin} />
      </div>
      <div className="h-1/3 rounded-lg bg-gray-200 lg:col-span-2 mx-2">
        <div className="md:container md:h-full  mx-auto max-w-96 h-96 ">
          <GoogleMap
            key={mapKey}
            center={center}
            zoom={6}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={setMap}
          >
            <Marker position={center} />
            {drivingDirections && (
              <DirectionsRenderer
                directions={drivingDirections}
                options={{
                  polylineOptions: {
                    strokeColor: "red",
                    strokeOpacity: 0.6,
                    strokeWeight: 5,
                  },
                }}
              />
            )}
            {walkingDirections && (
              <DirectionsRenderer
                directions={walkingDirections}
                options={{
                  polylineOptions: {
                    strokeColor: "green", // 초록색 선
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                  },
                }}
              />
            )}
            {bikingDirections && (
              <DirectionsRenderer
                directions={bikingDirections}
                options={{
                  polylineOptions: {
                    strokeColor: "blue", // 파란색 선
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                  },
                }}
              />
            )}
            {transitDirections && (
              <DirectionsRenderer
                directions={transitDirections}
                options={{
                  polylineOptions: {
                    strokeColor: "orange", // 주황색 선
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>

        <div className="h-2/3 w-full mt-2">
          <AIanalsis
            origin={origin}
            destination={destination}
            transitDirections
          />
        </div>
      </div>
    </div>
  );
}

export default Direction;

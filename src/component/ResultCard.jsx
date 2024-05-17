import React from "react";
import useRoute from "../hooks/useRoute";
import {
  calculateCarbonEmission,
  extractRouteDetails,
  calculateTraistEmission,
  calculateTotalEmissions,
} from "../utils/calculateCarbonEmission";
import { useDrivingRoute } from "../hooks/useDrivingRoute";
import { useWalkingRoute } from "../hooks/useWalkingRoute";
import { useBikingRoute } from "../hooks/useBikingRoute";
import { useTransitRoute } from "../hooks/useTransitRoute";
import { Link } from "react-router-dom";
import { transportImg } from "./transportImg";
import Stat from "./Stat";
const ResultCard = ({ origin, destination }) => {
  // const {
  //   directionsResponse: drivingDirections,
  //   distance: drivingDistance,
  //   duration: drivingDuration,
  //   calculateRoute: calculateDriving,
  // } = useRoute(origin, destination, "DRIVING");
  // const {
  //   directionsResponse: walkingDirections,
  //   distance: walkingDistance,
  //   duration: walkingDuration,
  //   calculateRoute: calculateWalking,
  // } = useRoute(origin, destination, "WALKING");

  // const {
  //   directionsResponse: bikingDirections,
  //   distance: bikingDistance,
  //   duration: bikingDuration,
  //   calculateRoute: calculateBiking,
  // } = useRoute(origin, destination, "BICYCLING");
  // const {
  //   directionsResponse: transitDirections,
  //   distance: transitDistance,
  //   duration: transitDuration,
  //   calculateRoute: calculateTransit,
  // } = useRoute(origin, destination, "TRANSIT");

  const {
    directionsResponse: drivingDirections,
    distance: drivingDistance,
    duration: drivingDuration,
    calculateRoute: calculateDriving,
  } = useDrivingRoute(origin, destination);

  const {
    directionsResponse: walkingDirections,
    distance: walkingDistance,
    duration: walkingDuration,

    calculateRoute: calculateWalking,
  } = useWalkingRoute(origin, destination);
  const {
    directionsResponse: bikingDirections,
    distance: bikingDistance,
    duration: bikingDuration,
    calculateRoute: calculateBiking,
  } = useBikingRoute(origin, destination);
  const {
    directionsResponse: transitDirections,
    distance: transitDistance,
    duration: transitDuration,
    calculateRoute: calculateTransit,
  } = useTransitRoute(origin, destination);

  console.log(transitDirections?.routes[0].legs[0].steps);

  const detail =
    transitDirections &&
    extractRouteDetails(transitDirections?.routes[0].legs[0].steps);
  const busEmi = calculateTraistEmission(detail, "Bus");
  const trainEmi = calculateTraistEmission(detail, "Train");
  const tramEmi = calculateTraistEmission(detail, "Tram");
  const emssion = calculateTotalEmissions(
    walkingDistance,
    bikingDistance,
    drivingDistance,
    tramEmi,
    trainEmi,
    busEmi
  );

  // const busEmi = detail
  //   ?.filter((item) => item.vehicleType === "Bus")
  //   .reduce(
  //     (acc, item) => acc + parseFloat(item.distance.replace(" km", "")),
  //     0
  //   );
  // const trainEmi = detail
  //   ?.filter((item) => item.vehicleType === "Train")
  //   .reduce(
  //     (acc, item) => acc + parseFloat(item.distance.replace(" km", "")),
  //     0
  //   );
  // const tramEmi = detail
  //   ?.filter((item) => item.vehicleType === "Tram")
  //   .reduce(
  //     (acc, item) => acc + parseFloat(item.distance.replace(" km", "")),
  //     0
  //   );
  // const walkingTotal = calculateCarbonEmission(walkingDistance, "walking");
  // const bikingTotal = calculateCarbonEmission(bikingDistance, "bicycle");
  // const drivingTotal = calculateCarbonEmission(drivingDistance, "car");
  // const tramTotal = calculateCarbonEmission(tramEmi, "tram");
  // const trainTotal = calculateCarbonEmission(trainEmi, "train");
  // const busTotal = calculateCarbonEmission(busEmi, "bus");
  const totalE = emssion.trainTotal + emssion.busTotal + emssion.tramTotal;
  const retotal = totalE.toFixed(2);

  return (
    <>
      {" "}
      <div className="mt-2 space-y-4 rounded-lg px-4  sm:p-6 lg:px-8 flex flex-col w-full">
        {drivingDirections && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`}
            className=" rounded-lg shadow transition hover:shadow-lg border-red-500 border"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white  rounded-lg text-center relative">
              <div className="p-2 md:text-lg text-gray-900 border-b flex justify-center">
                {" "}
                {transportImg.DRIVING}
                <div className="text-center">Driving</div>
              </div>

              <Stat
                duration={drivingDuration}
                distance={drivingDistance}
                emi={emssion.drivingTotal}
                color="red"
              />

              <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-red-500 bg-opacity-75 text-white text-lg font-bold rounded">
                Link to GOOGLE Map
              </span>
            </div>
          </a>
        )}

        {walkingDirections && (
          <a
            className=" rounded-lg shadow transition hover:shadow-lg border-green-500 border pointer "
            href={`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white rounded-lg text-center relative ">
              <div className="p-2 md:text-lg text-gray-900 border-b  flex justify-center">
                {transportImg.WALKING}
                Walking
              </div>
              <Stat
                duration={walkingDuration}
                distance={walkingDistance}
                emi={emssion.walkingTotal}
                color="green"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-green-500 bg-opacity-75 text-white text-lg font-bold rounded">
                Link to GOOGLE Map
              </span>
            </div>
          </a>
        )}
        {bikingDirections && (
          <a
            className=" rounded-lg shadow transition hover:shadow-lg border-blue-500 border"
            href={`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=bicycling`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white  rounded-lg text-center relative">
              <h3 className="p-2 md:text-lg text-gray-900 border-b flex justify-center">
                {transportImg.BICYCLING}
                Bicycle
              </h3>

              <Stat
                duration={bikingDuration}
                distance={bikingDistance}
                emi={emssion.bikingTotal}
                color="blue"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-blue-500 bg-opacity-75 text-white text-lg font-bold rounded">
                Link to GOOGLE Map
              </span>
            </div>
          </a>
        )}
        {transitDirections && (
          <a
            className=" rounded-lg shadow transition hover:shadow-lg border-orange-500 border h-full"
            href={`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white  rounded-lg text-center relative">
              <h3 className="p-2 md:text-lg text-gray-900 border-b flex justify-center ">
                {transportImg.TRANSIT} Public Transport
              </h3>

              <Stat
                duration={transitDuration}
                distance={transitDistance}
                emi={retotal}
                color="orange"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-orange-500 bg-opacity-75 text-white text-lg font-bold rounded">
                Link to GOOGLE Map
              </span>
            </div>
          </a>
        )}
      </div>
    </>
  );
};

export default ResultCard;

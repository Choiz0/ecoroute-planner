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
  console.log("distcanc:", drivingDistance, drivingDuration);
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
                <svg
                  className="h-8 w-8 text-red-500 mr-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx="7" cy="17" r="2" />{" "}
                  <circle cx="17" cy="17" r="2" />{" "}
                  <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                </svg>
                <div className="text-center"> Driving</div>
              </div>

              <ul className="mt-2  text-sm/relaxed text-gray-500 p-2 text-left inline-block ">
                <li> Distance: {drivingDistance}</li>
                <li> Duration: {drivingDuration}</li>
                <li> Carbon Emission: {emssion.drivingTotal} Kg CO2e</li>
              </ul>
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
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  //green color for
                  fill="#00A98F"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3692 5.13905C13.3692 6.00924 12.6638 6.71466 11.7936 6.71466C10.9234 6.71466 10.218 6.00924 10.218 5.13905C10.218 4.26887 10.9234 3.56345 11.7936 3.56345C12.6638 3.56345 13.3692 4.26887 13.3692 5.13905Z"
                    fill="#000000"
                    stroke="#000000"
                    strokeWidth="1.35052"
                  />
                  <path
                    d="M11.7782 14.8313H9.48168C9.94681 12.7756 9.94681 11.0994 9.94681 9.42322L12.1943 9.64358C12.1943 11.2195 11.7782 13.0771 11.7782 14.8313Z"
                    fill="#000000"
                  />
                  <path
                    d="M9.48168 14.8313C8.09375 17.284 6.95068 21.1119 6.95068 21.1119M9.48168 14.8313C10.2219 14.8313 11.038 14.8313 11.7782 14.8313M9.48168 14.8313C9.94681 12.7756 9.94681 11.0994 9.94681 9.42322L12.1943 9.64358C12.1943 11.2195 11.7782 13.0771 11.7782 14.8313M11.7782 14.8313C13.2124 17.284 12.4653 21.1119 12.4653 21.1119"
                    stroke="#000000"
                    strokeWidth="2.36342"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.6599 9.42322L14.8501 12.9967L17.5324 11.8874"
                    stroke="#000000"
                    strokeWidth="1.67621"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.80518 9.08887L6.53081 10.0556L8.79988 13.627"
                    stroke="#000000"
                    strokeWidth="1.67621"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Walking
              </div>

              <ul className="mt-2  text-sm/relaxed text-gray-500 p-2 text-left inline-block ">
                <li> Distance: {walkingDistance}</li>
                <li> Duration: {walkingDuration}</li>
                <li>{emssion.walkingTotal} Kg CO2e</li>
              </ul>
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
                <svg
                  className="h-8 w-8 text-blue-500 mr-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx={5} cy={18} r={3} />{" "}
                  <circle cx={19} cy={18} r={3} />{" "}
                  <polyline points="12 19 12 15 9 12 14 8 16 11 19 11" />{" "}
                  <circle cx={17} cy={5} r={1} />
                </svg>
                Bicycle
              </h3>

              <ul className="mt-2  text-sm/relaxed text-gray-500 p-2 text-left inline-block relative ">
                <li> Distance: {bikingDistance}</li>
                <li> Duration: {bikingDuration}</li>
                <li>{emssion.bikingTotal} Kg CO2e</li>
              </ul>
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
                <svg
                  className="h-8 w-8 text-orange-500 mr-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx={6} cy={17} r={2} />{" "}
                  <circle cx={18} cy={17} r={2} />{" "}
                  <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />{" "}
                  <polyline points="16 5 17.5 12 22 12" />{" "}
                  <line x1={2} y1={10} x2={17} y2={10} />{" "}
                  <line x1={7} y1={5} x2={7} y2={10} />{" "}
                  <line x1={12} y1={5} x2={12} y2={10} />
                </svg>
                Transit
              </h3>

              <ul className="mt-2  text-sm/relaxed text-gray-500 p-2 text-left inline-block  ">
                <li> Distance: {transitDistance}</li>
                <li> Duration: {transitDuration}</li>
                <div className=" ">
                  {" "}
                  <li>
                    Emission Train: {trainEmi} km , {emssion.trainTotal} Kg CO2e
                  </li>
                  <li>
                    Emission Bus: {busEmi} km {emssion.busTotal} Kg CO2e
                  </li>
                  <li>
                    Emission Tram: {tramEmi}km {emssion.tramTotal} Kg CO2e
                  </li>
                  <li>
                    {" "}
                    Total: {retotal}
                    Kg CO2e
                  </li>
                </div>
              </ul>
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

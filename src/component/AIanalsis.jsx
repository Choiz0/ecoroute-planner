import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDrivingRoute } from "../hooks/useDrivingRoute";
import { useWalkingRoute } from "../hooks/useWalkingRoute";
import { useBikingRoute } from "../hooks/useBikingRoute";
import { useTransitRoute } from "../hooks/useTransitRoute";
import {
  calculateTotalEmissions,
  calculateTraistEmission,
  extractRouteDetails,
} from "../utils/calculateCarbonEmission";
import Button from "./Button";
import { useQuery } from "react-query";
import DataTable from "./DataTable";
import aiImage from "../assets/google-gemini-icon.webp";
import Tree from "./Tree";
import transportImg from "./transportImg";
import ChoiceTransport from "./ChoiceTransport";

const api = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const AIanalsis = ({ origin, destination }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(true);

  const { distance: drivingDistance, duration: drivingDuration } =
    useDrivingRoute(origin, destination);
  const { distance: walkingDistance, duration: walkingDuration } =
    useWalkingRoute(origin, destination);
  const { distance: bikingDistance, duration: bikingDuration } = useBikingRoute(
    origin,
    destination
  );
  const {
    distance: transitDistance,
    duration: transitDuration,
    directionsResponse: transitDirections,
  } = useTransitRoute(origin, destination);

  const detail =
    transitDirections &&
    extractRouteDetails(transitDirections?.routes[0].legs[0].steps);
  const busEmi = calculateTraistEmission(detail, "Bus");
  const trainEmi = calculateTraistEmission(detail, "Train");
  const tramEmi = calculateTraistEmission(detail, "Tram");
  const {
    walkingTotal,
    bikingTotal,
    drivingTotal,
    tramTotal,
    trainTotal,
    busTotal,
  } = calculateTotalEmissions(
    walkingDistance,
    bikingDistance,
    drivingDistance,
    tramEmi,
    trainEmi,
    busEmi
  );
  const transitTotalEmi = tramTotal + trainTotal + busTotal;
  const retotal = transitTotalEmi.toFixed(2);

  const prompt = ` AI Recommendation for environmental protection please analyze the carbon emission of the route based on my data
    origin: ${origin}
    destination: ${destination}
    distance by vehicle
    -driving distance: ${drivingDistance}
    -walking distance: ${walkingDistance}
    -biking distance: ${bikingDistance}
    -transit distance: ${transitDistance}
    -transit details: ${busEmi}, ${trainEmi}, ${tramEmi}
    duration by vehicle
    -driving duration: ${drivingDuration}
    -walking duration: ${walkingDuration}
    -biking duration: ${bikingDuration}
    -transit duration: ${transitDuration}
    carbon emission by vehicle
    -driving emission: ${drivingTotal}
    -walking emission: ${walkingTotal}
    -biking emission: ${bikingTotal}
    -transit emission: ${retotal}
    -transit emission details: ${busTotal}, ${trainTotal}, ${tramTotal}
    all the data is based on the google map api and the carbon emission is calculated based on the vehicle type and distance
    current weather and traffic condition and time and season are not considered in the calculation. so please consider your live data for the accurate result for weather and 
    traffic condition ,time and season.
    please provide the recommendation route for the environmental protection based on my data and your analysis and live data but it shold be possible route.
    for example, if the rainy season is going on then the biking route is not recommended. so please consider the live data for the recommendation. and walking and biking is no carbon emission but we 
    can not work on the walking and biking route for the long distance and night time. so please provide the recommendation combination of the vehicle and walking and biking route.
    provide it json format for the easy understanding and implementation. and explan detail why you choose the route for the recommendation.
    compare the carbon emission of the route and show how much tree can be saved by using the recommended route. and how much carbon emission can affect the tree absorption capacity.
    
    Example answer:
    {
        "origin": "Flemington Racecourse, Epsom Road, Flemington VIC, Australia",
        "destination": "Melbourne Airport (MEL), Arrival Drive, Melbourne Airport VIC, Australia",
        "current_time": "real time and date",
        "recommended_route": {
          "type": "public transit",
          "reason": "The transit route is recommended because it offers a balance between reduced travel time and lower carbon emissions compared to driving. Given that the carbon emissions for transit are significantly lower than driving and transit incorporates a combination of vehicle types that might include buses and trains which are more environmentally friendly, it's chosen over driving, especially during peak traffic times or poor weather conditions where driving emissions could increase due to slower speeds and more frequent stops.",
          "carbon_emission": "2.49 kg CO2",
          "tree_impact": {
            "transit_tree_absorption": "10%",
            "calculation_details": "
            Assuming one tree can absorb about 21.77 kg of CO2 annually (based on general environmental studies), using the transit route would require the annual absorption capacity of approximately 10% of a tree.
           "
            "
          },
          "duration": "1 hour 5 mins",
          "distance": "27.8 km",
          "transit_details": {
            "bus_distance": "22.5 km",
            "train_distance": "3.3 km",
            "walking_distance": "0 km"
          }
        },
        "weather_conditions": {
          "current_weather_origin": "11 celery, light rain",
          "general_advice": "If adverse weather conditions are present, such as rain, the use of biking or walking would be discouraged due to safety concerns and comfort. Under normal weather conditions, transit is recommended to optimize for time, cost, and environmental impact."
        },
        "emissions_comparison": {
          "driving": "4.12 kg CO2",
          "walking": "0 kg CO2",
          "biking": "0 kg CO2",
          "transit": "2.49 kg CO2"
        },
        "tree_absorption_comparison": {
          "driving": "19%",
          "walking": "0%",
          "biking": "0%",
          "transit": "10%"
        },
        "duration_comparison": {
          "driving": "21 mins",
          "walking": "4 hours 48 mins",
          "biking": "1 hour 20 mins",
          "transit": "1 hour 5 mins"
        },
        "distance_comparison": {
          "driving": "19.6 km",
          "walking": "20.5 km",
          "biking": "22.5 km",
          "transit": "27.8 km"
        },
        "final_note": ""
      }
    
      plese answer in json format. current time and weather of ${origin} provide the real time and weather condition of the origin and destination. and provide the real time and date of the recommendation.
      Please do not using text block markers in code blocks.it casue the error
      when you caluculate tree impact use (carbon emission) divide (21.77) and multiply by (100) to get the percentage of the tree impact. and provide the detail of the calculation in the json format.
      .
      
      `;

  const fetchAI = async () => {
    const genAI = new GoogleGenerativeAI(api);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const results = await model.generateContent(prompt);
    const response = await results.response;
    const content = response.text();
    const result = JSON.parse(content);

    console.log(result);
    return result;
  };

  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
    "aiAnalysis",
    fetchAI,
    {
      // 초기 마운트에서 자동으로 실행되지 않음
      refetchOnMount: false, // 컴포넌트가 마운트될 때 자동으로 리패치하지 않음
      // 페이지가 다시 연결될 때 자동으로 리패치하지 않음
      refetchOnWindowFocus: false, // 창이 포커스될 때 자동으로 리패치하지 않음
      retry: 1,
      onError: (error) => {
        console.error(error);
        refetch();
      },
    }
  );
  const tableData = [
    {
      category: "Transport Type",
      details:
        data?.recommended_route?.type === "transit"
          ? "Public transport"
          : data?.recommended_route?.type || "N/A",
    },
    {
      category: "Carbon Emission",
      details: data?.recommended_route?.carbon_emission || "N/A",
    },
    {
      category: "Duration",
      details: data?.recommended_route?.duration || "N/A",
    },
    {
      category: "Distance",
      details: data?.recommended_route?.distance || "N/A",
    },
    {
      category: "Transit Details",
      details: `Bus: ${
        data?.recommended_route?.transit_details?.bus_distance || "N/A"
      }, Train: ${
        data?.recommended_route?.transit_details?.train_distance || "N/A"
      }, Walking: ${
        data?.recommended_route?.transit_details?.walking_distance || "N/A"
      }, Tram: ${
        data?.recommended_route?.transit_details?.tram_distance || "N/A"
      }, Bicycle: ${
        data?.recommended_route?.transit_details?.bicycle_distance || "N/A"
      }`,
    },
    {
      category: "Tree Impact",
      details:
        data?.recommended_route?.tree_impact?.transit_tree_absorption || "N/A",
    },
  ];
  const otherData = [
    {
      category: "Current Time",
      details: new Date().toLocaleString(),
    },
    {
      category: "Weather Conditions",
      details: data?.weather_conditions?.current_weather_origin || "N/A",
    },
    {
      category: "General Advice",
      details: data?.weather_conditions?.general_advice || "N/A",
    },
  ];
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  console.log(isModalOpen);
  return (
    <>
      {" "}
      {isLoading ? (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2  ">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div>
          {isModalOpen && activeModal && (
            <ChoiceTransport
              handleModal={handleModal}
              isModalOpen={isModalOpen}
              data={data}
              setActiveModal={setActiveModal}
              activeModal={activeModal}
            />
          )}
          <div className="relative block overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 bg-white">
            <div className="sm:flex md:flex-col sm:justify-between sm:gap-4 w-full text-center ">
              {data && (
                <Button onClick={handleModal} className="bg-black">
                  <div className="flex justify-center ">
                    {" "}
                    <svg
                      className="h-6 w-6 text-teal-600 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {!activeModal
                      ? "You already saved trip"
                      : "Your Choice Transport"}
                  </div>
                </Button>
              )}
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl ">
                Low-Carbon Travel Routes with AI
              </h3>
              <p className="mt-1 text-xs font-medium text-gray-600">
                Gemini AI by google
              </p>{" "}
            </div>

            <div className="mt-4 flex flex-col space-y-8">
              <h5 className="text-sm md:text-xl  text-gray-600 font-medium">
                Summary
              </h5>
              <div className="flex bg-g rounded-lg p-4 mb-4 text-sm text-darkg ">
                <div className="mr-2 w-[10%]">
                  <img src={aiImage} alt="AI" className="" />
                </div>
                <div>
                  <span className="font-medium text-xl w-[80%]">
                    {data && data?.recommended_route?.reason}
                  </span>
                </div>
              </div>
              <div className="flex  md:justify-center md:space-x-2 md:flex-row flex-col space-y-2 items-center md:items-stretch">
                <div className="bg-white shadow-md rounded-lg overflow-hidden md:w-1/2 ">
                  <DataTable data={tableData} />
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden md:w-1/2 ">
                  <DataTable data={otherData} />
                </div>
              </div>
              <div className="text-2xl font-bold mt-4 text-center">
                Comparison transport
              </div>
              <div className=" flex md:space-x-4 md:flex-row flex-col space-y-2">
                <div className="flex flex-col md:w-1/3 justify-center items-center rounded-lg shadow-lg  text-center text-sm ">
                  <div className="flex bg-mywhite w-full text-center justify-center  items-center ">
                    <svg
                      className="h-6 w-6  mr-2"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <polyline points="9 11 12 14 20 6" />{" "}
                      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                    </svg>
                    Assuming one tree can absorb
                    <br /> about 21.77 kg of CO2 annually{" "}
                  </div>{" "}
                  <div className="">
                    {" "}
                    <Tree
                      percentage={parseInt(
                        data?.tree_absorption_comparison?.transit
                      )}
                      label="Transit"
                    />
                    <Tree
                      percentage={parseInt(
                        data?.tree_absorption_comparison?.driving
                      )}
                      label="Driving"
                    />
                  </div>
                </div>
                {
                  <div className="md:w-2/3">
                    <div className="bg-white shadow-md  overflow-hidden  rounded-lg">
                      <table className="w-full table rounded-lg">
                        <thead className="bg-mywhite  rounded-lg">
                          <tr>
                            <th className="py-2 px-4 text-left">
                              Transportation Mode
                            </th>
                            <th className="py-2 px-4 text-center">Distance</th>
                            <th className="py-2 px-4 text-center">Duration</th>
                            <th className="py-2 px-4 text-center">
                              Carbon Emission
                            </th>
                            <th className="py-2 px-4 text-center">
                              Tree Impact
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {data && data.emissions_comparison && (
                            <>
                              <tr>
                                <td className="py-2 px-4">{`Driving`}</td>
                                <td className="py-2 px-4 text-center">
                                  {drivingDistance}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {drivingDuration}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {data.emissions_comparison.driving}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {data.tree_absorption_comparison.driving}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4">{`Walking`}</td>
                                <td className="py-2 px-4 text-center">
                                  {walkingDistance}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {walkingDuration}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {data.emissions_comparison.walking}
                                </td>

                                <td className="py-2 px-4 text-center">
                                  {data.tree_absorption_comparison.walking}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4">{`Biking`}</td>
                                <td className="py-2 px-4 text-center">
                                  {bikingDistance}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {bikingDuration}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {data.emissions_comparison.biking}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {data.tree_absorption_comparison.biking}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 px-4">{`Public transport`}</td>
                                <td className="py-2 px-4 text-center">
                                  {transitDistance}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {transitDuration}
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {retotal} kg CO2
                                </td>
                                <td className="py-2 px-4 text-center">
                                  {data.tree_absorption_comparison.transit}%
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                }
              </div>

              <div className="flex md:flex-row flex-col bg-g rounded-lg p-4 mb-4 text-sm text-green-700 3">
                <div className="mr-2 md:w-[3%] w-8">
                  <img src={aiImage} alt="AI" className="" />
                </div>
                <div className="w-[95%]">
                  <span className="font-medium text-xl">
                    {" "}
                    {data?.recommended_route?.tree_impact?.calculation_details}
                  </span>
                </div>
              </div>

              <div className="flex md:flex-row flex-col rounded-lg p-4 mb-4 text-sm bg-myyellow text-warning-contnet ">
                <div className="mr-2 w-[3%]"> {transportImg.INFO}</div>
                <div className="w-[95%]">
                  <span className="font-medium text-xl">
                    {data?.final_note || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIanalsis;

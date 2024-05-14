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

const api = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const AIanalsis = ({ origin, destination }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  console.log(retotal);

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
            "calculation_details": "Assuming one tree can absorb about 21.77 kg of CO2 annually (based on general environmental studies), using the transit route would require the annual absorption capacity of approximately 10% of a tree."
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
      Please avoid using text block markers in code blocks.
      plese answer in json format. current time and weather of ${origin} provide the real time and weather condition of the origin and destination. and provide the real time and date of the recommendation.
    `;

  const fetchAI = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(api);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const results = await model.generateContent(prompt);
      const response = await results.response;
      const content = response.text();
      const result = JSON.parse(content);

      setData(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64" />
        </div>
      )}
      <a
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              AI Recommendation for environmental protection
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">
              Gemini AI by google
            </p>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
              className="size-16 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col space-y-2">
          <h5 className="text-sm md:text-lg font-medium text-gray-600">
            Recommended Route
          </h5>
          <div className="text-pretty text-sm text-gray-500">
            Transport type :{data && data.recommended_route?.type}
          </div>
          <div className="text-pretty text-sm text-gray-500">
            Carbon_emission :{data && data.recommended_route?.carbon_emission}
          </div>
          <div className="text-pretty text-sm text-gray-500">
            duration :{data && data.recommended_route?.duration}
          </div>
          <div className="text-pretty text-sm text-gray-500">
            distance :{data && data.recommended_route?.distance}
          </div>
          <div className="text-pretty text-sm text-gray-500">
            transit_details : Bus :{" "}
            {data && data.recommended_route?.transit_details?.bus_distance}{" "}
            Train:{" "}
            {data && data.recommended_route?.transit_details?.train_distance}{" "}
            Walking:{" "}
            {data && data.recommended_route?.transit_details?.walking_distance}{" "}
            Tram :{" "}
            {data && data.recommended_route?.transit_details?.tram_distance}{" "}
            bicycle:{" "}
            {data && data.recommended_route?.transit_details?.bicycle_distance}{" "}
          </div>

          <div className="text-pretty text-sm text-gray-500">
            Tree impact :
            {data &&
              data.recommended_route?.tree_impact?.transit_tree_absorption}
          </div>

          <div className="text-pretty text-sm text-gray-500">
            calculation details :
            {data && data.recommended_route?.tree_impact?.calculation_details}
          </div>

          <p className="text-pretty text-sm md:text-xl text-gray-500">
            {data && data.recommended_route?.reason}
          </p>
          {
            <div className=" mx-auto">
              <h2 className="text-2xl font-bold mb-4">Comparison Table</h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 text-left">
                        Transportation Mode
                      </th>
                      <th className="py-2 px-4 text-center">Distance</th>
                      <th className="py-2 px-4 text-center">Duration</th>
                      <th className="py-2 px-4 text-center">Carbon Emission</th>
                      <th className="py-2 px-4 text-center">Tree Impact</th>
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
                            {data.tree_absorption_comparison.transit}
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
      </a>
      <Button onClick={fetchAI}>Get AI Recommendation</Button>
    </div>
  );
};

export default AIanalsis;

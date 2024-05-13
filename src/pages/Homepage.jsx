import { useState } from "react";
import Direction from "../component/Direction";
import SearchForm from "../component/SearchForm";

const Homepage = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const calculateRoute = async (originRef, destiantionRef) => {
    if (originRef === "" || destiantionRef === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    setDirectionsResponse(null);
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef,
      destination: destiantionRef,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    console.log(results);
  };

  return (
    <div>
      <SearchForm calculateRoute={calculateRoute} />
    </div>
  );
};

export default Homepage;

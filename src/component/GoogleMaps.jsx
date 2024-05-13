import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

import useUserLocation from "../hooks/useUserLocation";

const api = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function RouteForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travelMode, setTravelMode] = useState("drive");
  const [results, setResults] = useState({});
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [map, setMap] = useState(null);

  const originAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: api,
    libraries: ["places"],
  });

  const handleOriginSelect = () => {
    const place = originAutocompleteRef.current.getPlace();
    if (place) {
      setOrigin(place.place_id);
    }
  };

  const handleDestinationSelect = () => {
    const place = destinationAutocompleteRef.current.getPlace();
    if (place) {
      setDestination(place.place_id);
    }
  };
  useEffect(() => {}, [results]);
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/routes", {
        origin,
        destination,
        travelMode,
      });
      setResults(response.data);
      setDistance(response.data.routes[0].legs[0].distance.text);
      setDuration(response.data.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error("Error sending route request:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (origin && destination) {
      await fetchData();
    }
  };

  const getCurrentPosition = () => {
    const useLocation = () => useUserLocation();
    setLocationInfo(useLocation);
  };
  const onLoad = (map) => {
    setMap(map);
  };
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Enter Route Information</h2>
        <div>
          <label>Origin:</label>
          <Autocomplete
            onLoad={(autocomplete) =>
              (originAutocompleteRef.current = autocomplete)
            }
            onPlaceChanged={handleOriginSelect}
          >
            <input type="text" placeholder="Enter origin location" />
          </Autocomplete>
        </div>
        <div>
          <label>Destination:</label>
          <Autocomplete
            onLoad={(autocomplete) =>
              (destinationAutocompleteRef.current = autocomplete)
            }
            onPlaceChanged={handleDestinationSelect}
          >
            <input type="text" placeholder="Enter destination location" />
          </Autocomplete>
        </div>
        <div>
          <label>Travel Mode:</label>
          <select
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
          >
            <option value="drive">Drive</option>
            <option value="walking">Walking</option>
            <option value="bicycling">Bicycling</option>
            <option value="transit">Transit</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>Distance: {distance}</div>
      <div>Duration: {duration}</div>

      <button onClick={getCurrentPosition}>Get Current Position </button>

      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={10}
          center={getCurrentPosition}
          onLoad={onLoad}
        >
          {results.routes && <DirectionsRenderer directions={results} />}
          {map && (
            <Marker
              position={{
                lat: locationInfo?.latitude,
                lng: locationInfo?.longitude,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
}

export default RouteForm;

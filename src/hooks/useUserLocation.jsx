import { useState, useEffect } from "react";

// Custom hook to get user's current location
const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the current user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // Update the value of userLocation variable
          setUserLocation({ latitude, longitude });
        },
        // If there was an error getting the user's location
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array ensures the effect runs only once

  return userLocation;
};

export default useUserLocation;

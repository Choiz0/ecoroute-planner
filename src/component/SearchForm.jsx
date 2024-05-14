import Input from "./Input";
import Button from "./Button";
import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import useDirection from "../hooks/useDirection";
const googleapi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

const SearchForm = ({ isSearhResult, destination, origin }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleapi,
    libraries: libraries,
  });
  const linkto = useNavigate();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const clearRoute = () => {
    if (isSearhResult) {
      originRef.current.value = "";
      destiantionRef.current.value = "";
    }
  };
  const handleSearch = () => {
    console.log("Origin:", originRef.current?.value);
    console.log("Destination:", destiantionRef.current?.value);
    if (originRef.current?.value && destiantionRef.current?.value) {
      linkto(
        `/searchResult/${originRef.current.value}/${destiantionRef.current.value}`
      );
    }
    if (isSearhResult) {
      linkto(
        `/searchResult/${originRef.current.value}/${destiantionRef.current.value}`
      );
    }
  };
  console.log(isSearhResult);
  return (
    <>
      <div
        className={`mx-auto  px-4 sm:px-6 ${
          isSearhResult ? "w-full" : " py-16 lg:px-8 max-w-screen-xl"
        }`}
      >
        <div className="mx-auto max-w-lg">
          <h1
            className={`text-center text-2xl font-bold text-indigo-600 sm:text-3xl ${
              isSearhResult ? "hidden" : "block"
            }`}
          >
            Search your Eco-Friendly directions
          </h1>

          <form
            className={`mb-0  space-y-4 rounded-lg  sm:p-6  flex flex-col w-full ${
              isSearhResult ? "w-full" : "lg:p-8  p-4 shadow-lg mt-6"
            }`}
          >
            <Autocomplete
              options={{ componentRestrictions: { country: "AU" } }}
            >
              <Input
                lableText="Origin"
                placeholder="Enter origin"
                reftext={originRef}
                onChange={(e) => e.target.value}
              />
            </Autocomplete>
            <Autocomplete
              options={{ componentRestrictions: { country: "AU" } }}
            >
              <Input
                lableText="Destination"
                placeholder="Enter destination"
                reftext={destiantionRef}
                onChange={(e) => e.target.value}
              />
            </Autocomplete>

            <Button className="" onClick={handleSearch}>
              Search Route
            </Button>
            <Button className=" " onClick={clearRoute}>
              Clear Route{" "}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchForm;

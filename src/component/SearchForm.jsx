import Input from "./Input";
import Button from "./Button";
import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";

const googleapi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

const SearchForm = ({ calculateRoute }) => {
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
  const handleSearch = () => {
    linkto(
      `searchResult/${originRef.current?.value}/${destiantionRef.current?.value}`
    );
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Search your Eco-Friendly directions
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 flex flex-col"
          >
            <Autocomplete
              options={{ componentRestrictions: { country: "AU" } }}
            >
              <Input
                lableText="Origin"
                placeholder="Enter origin"
                reftext={originRef}
              />
            </Autocomplete>
            <Autocomplete
              options={{ componentRestrictions: { country: "AU" } }}
            >
              <Input
                lableText="Destination"
                placeholder="Enter destination"
                reftext={destiantionRef}
              />
            </Autocomplete>

            <button className=" self-end" onClick={handleSearch}>
              Search Route
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

import React from "react";
import SearchForm from "./SearchForm";

const SideResults = ({ destination, origin }) => {
  return (
    <>
      <div className="flex flex-col px-8 md:w-full">
        <h1 className="md:text-2xl text-lg text-center p-2">Search Results</h1>

        <SearchForm
          isSearhResult="true"
          destination={destination}
          origin={origin}
        />

        <div className="  bg-blue-50 p-4 mt-4 rounded border-s-4 text-sm space-y-2 ">
          <div className="rounded border-s-4 flex items-center">
            <span className="">Origin</span>
            <span className="ml-2 text-gray-800">{origin}</span>
          </div>
          <div className=" mb-4 flex">
            <span className="p-1 ">Destination:</span>
            <span className="ml-2 text-gray-800">{destination}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideResults;

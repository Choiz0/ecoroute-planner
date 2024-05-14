import React from "react";
import SearchForm from "./SearchForm";

const SideResults = ({ destination, origin }) => {
  return (
    <>
      <div className="flex flex-col px-8">
        <h1 className="md:text-2xl text-lg text-center bg-slate-50 p-2">
          Search Results
        </h1>

        <SearchForm
          isSearhResult="true"
          destination={destination}
          origin={origin}
        />

        <div className=" border-blue-500 bg-blue-50 p-4 rounded border-s-4">
          <div className="rounded border-s-4">
            <span className="">Origin:</span>
            <span className="ml-2 text-gray-800">{origin}</span>
          </div>
          <div className="md:text-lg mb-4">
            <span className="p-1 ">Destination:</span>
            <span className="ml-2 text-gray-800">{destination}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideResults;

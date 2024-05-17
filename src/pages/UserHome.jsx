import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import axios from "axios";
import SearchForm from "../component/SearchForm";
import map from "../assets/map.svg";

const UserHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  console.log(user);
  return (
    <div>
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 md:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="order-2 lg:order-1 lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg ">
                Discover our AI-driven route recommendation tool that optimizes
                for lower carbon emissions, allowing you to see the
                environmental impact of your travel choices. Make a difference
                with every journey.
              </p>

              <div className="mt-8">
                <img src={map} alt="map" />
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-3 lg:pt-12 pt-6">
              <h1
                className={`text-center text-2xl font-bold text-mybrown sm:text-3xl}`}
              >
                <div>
                  Welcome!!{" "}
                  <span className="text-mypink">
                    {user?.username?.toUpperCase()}
                  </span>
                </div>
                <div>Search your Eco-Friendly directions</div>
              </h1>
              <SearchForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHome;

// Home.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import mainImg from "../assets/mainImg.svg";
import environment from "../assets/environment.svg";
import Login from "../component/Login";
import Signup from "../component/Signup";
import Button from "../component/Button";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/userhome");
    }
  }, []);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleLoginModal = () => {
    setLoginModalOpen((prev) => !prev);
  };
  const handleSignupModal = () => {
    setSignupModalOpen((prev) => !prev);
  };
  console.log(loginModalOpen, signupModalOpen);
  return (
    <>
      <div className="hero min-h-screen  border">
        <div className="hero-content flex-col lg:flex-row md:space-x-24">
          <img src={mainImg} className="max-w-xs md:max-w-md m-auto " />
          <div>
            <div className="flex flex-col md:space-y-8">
              <span className="md:h-2 w-20 bg-darkg"></span>
              <h1 className="font-bebas-neue mb-2 uppercase text-3xl sm:text-6xl font-black text-darkg flex flex-col leading-none dark:text-white ">
                Eco-Route Planner
              </h1>
              <p className="text-md  text-gray-700 dark:text-white">
                EcoRoute Planner compares carbon emissions across different
                transportation modes to suggest the most eco-friendly route.
                This allows users to see the environmental impact of their
                travel choices in real-time, enabling them to make informed
                decisions. By documenting how eco-friendly travel choices
                contribute to overall carbon reduction, it supports users in
                taking small steps towards a sustainable future.
              </p>
            </div>
            <div className="flex mt-8 space-x-2">
              <Button
                onClick={handleLoginModal}
                className="  text-white "
                className1="bg-teal-600  "
                className2="border-teal-600 text-white"
              >
                Login
              </Button>
              {loginModalOpen && (
                <Login
                  handleSignup={handleSignupModal}
                  handleLoginModal={handleLoginModal}
                  setLoginModalOpen={setLoginModalOpen}
                  loginModalOpen={loginModalOpen}
                />
              )}
              {signupModalOpen && (
                <Signup
                  handleLogin={handleLoginModal}
                  handleSignup={handleSignupModal}
                />
              )}
              <Button
                onClick={handleSignupModal}
                borderColor="border-mybrown"
                lastBgColor="bg-mybrown"
                textColor="text-white"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

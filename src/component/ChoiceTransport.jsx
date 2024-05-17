import { useState } from "react";
import transportImg from "./transportImg";
import Button from "./Button";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ChoiceTransport = ({
  isModalOpen,
  handleModal,
  data,
  setActiveModal,
}) => {
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState("");
  const [savings, setSavings] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const savingData = {
        userId: user.id,
        savings: savings,
        transport: selectedMode,
        origin: data.origin,
        destination: data.destination,
        distance: data.distance_comparison[selectedMode],
        duration: data.duration_comparison[selectedMode],
        emission: data.emissions_comparison[selectedMode],
      };
      const response = await axios.post(
        "http://localhost:5000/savings",
        savingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("successfully saved your saving ", {
          position: "top-left",
        });
        alert("successfully saved your saving");
        setActiveModal(false);
        handleModal();
      }
    } catch {
      toast.error("Failed to add savings", {
        position: "top-left",
      });
    }
  };
  console.log(user);
  const emissionsValues = Object.values(data.emissions_comparison).map(
    (value) => {
      if (
        value === "null" ||
        value === "undefined" ||
        value === "NaN" ||
        value === "0"
      )
        return 0;
      return (value = parseFloat(value));
    }
  );
  const notificaiton = (message) => {
    return (
      <div role="alert" className="alert bg-myyellow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{message}</span>
      </div>
    );
  };

  console.log(typeof emissionsValues[3]);

  const handleSelection = (mode) => {
    setSelectedMode(mode);
    calculateSavings(mode);
  };
  const calculateSavings = (mode) => {
    const selectedModeEmission = parseFloat(data.emissions_comparison[mode]);
    const maxEmission = Math.max(...emissionsValues);

    const savings = (maxEmission - selectedModeEmission).toFixed(2);
    console.log(selectedModeEmission);
    setSavings(savings);
    if (selectedModeEmission === maxEmission) {
      return setMessage(
        "You have chosen the least efficient mode of transport. Please consider choosing a more eco-friendly option."
      );
    } else if (selectedModeEmission === 0) {
      return setMessage(
        `You have chosen the most efficient mode of transport. Good job! saving  ${savings} KG CO2 compared to the least efficient mode.`
      );
    }
    return setMessage(
      `By choosing ${mode}, you save ${savings} KG CO2 compared to the least efficient mode.`
    );
  };
  return (
    <>
      <ToastContainer />
      <div className=" absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-10 py-10 z-10">
        <div className=" relative max-h-full w-full md:w-1/2 overflow-y-auto sm:rounded-2xl bg-white  ">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleModal}
          >
            ✕
          </button>
          <div className="w-full flex justify-center">
            <div className="m-8 my-20 mx-auto">
              <div className="mb-8 flex flex-col justify-center text-center">
                <h1 className="mb-4 text-2xl font-extrabold">
                  What will you be using for your trip?
                </h1>
                <p className="text-gray-600">
                  <div className="flex w-full items-center justify-center py-4 flex-col md:flex-row ">
                    <div className="flex flex-col items-center mr-2">
                      <label className="radio-label flex items-center mb-2 cursor-pointer bg-slate-200 rounded-lg py-1">
                        <input
                          type="radio"
                          name="radio-8"
                          onChange={(e) => handleSelection(e.target.value)}
                          value="walking"
                          checked={selectedMode === "walking"}
                          className="sradio radio-success mr-2"
                        />
                        Walking {transportImg.WALKING}
                      </label>
                    </div>
                    <div className="flex flex-col items-center">
                      <label className="radio-label flex items-center mb-2 cursor-pointer mr-2 bg-slate-200 rounded-lg">
                        <input
                          type="radio"
                          name="radio-8"
                          className="sradio radio-success mr-2"
                          onChange={(e) => handleSelection(e.target.value)}
                          value="driving"
                          checked={selectedMode === "driving"}
                        />
                        Driving {transportImg.DRIVING}
                      </label>
                    </div>
                    <div className="flex flex-col items-center">
                      <label className="radio-label flex items-center mb-2 cursor-pointer mr-2 bg-slate-200 rounded-lg">
                        <input
                          type="radio"
                          name="radio-8"
                          className="sradio radio-success mr-2"
                          onChange={(e) => handleSelection(e.target.value)}
                          value="biking"
                          checked={selectedMode === "biking"}
                        />
                        Bicycling {transportImg.BICYCLING}
                      </label>
                    </div>
                    <div className="flex flex-col items-center">
                      <label className="radio-label flex items-center mb-2 cursor-pointer mr-2 bg-slate-200 rounded-lg">
                        <input
                          type="radio"
                          name="radio-8"
                          className="sradio radio-success mr-2"
                          onChange={(e) => handleSelection(e.target.value)}
                          value="transit"
                          checked={selectedMode === "transit"}
                        />
                        Public Transport {transportImg.TRANSIT}
                      </label>
                    </div>
                  </div>
                  <div className="w-[60%] mx-auto">
                    {message && notificaiton(message)}
                  </div>
                </p>
              </div>
              <div className=" flex justify-end">
                <Button
                  onClick={handleSave}
                  lastBgColor="bg-mypink"
                  className="mr-2"
                >
                  Save Savings
                </Button>
                <Button onClick={handleModal} lastBgColor="bg-white">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceTransport;

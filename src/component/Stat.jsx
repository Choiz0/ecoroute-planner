import React from "react";

const Stat = ({ distance, duration, emi, color }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col md:flex-row w-full bg-white p-4 shadow-lg rounded-lg divide-x-2 h-full  ">
        <div className="flex flex-col flex-1 p-2 md:justify-between ">
          <div className="text-md font-medium text-gray-900 ">Distance</div>
          <div className="flex items-center mb-4 justify-around">
            <svg
              className="h-8 w-8"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="3"
              stroke={color}
              fill="none"
            >
              <path d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z" />
              <circle cx="17.52" cy="31.38" r="4.75" />
              <path d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z" />
              <circle cx="49.23" cy="17.32" r="3.75" />
              <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89" />
              <path
                d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
                strokeDasharray="7.8 2.92"
              />
              <path d="M45.63,35.8a23,23,0,0,1,3.88-.95" />
            </svg>
            <div className="flex flex-col justify-center space-y-1  h-full  items-center">
              <div className="md:text-2xl font-bold text-gray-600">
                {distance}
              </div>
            </div>{" "}
          </div>{" "}
          <div className="text-sm text-gray-500">Total travel distance</div>
        </div>

        <div className="flex flex-col flex-1 p-2 md:justify-between ">
          <div className="text-md font-medium text-gray-900 ">Duration</div>
          <div className="flex items-center mb-4 justify-around">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.24 16.24L12 12"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col justify-center space-y-1  h-full  items-center">
              <div
                className={` font-bold text-gray-600 text-2xl
            "md:text-3xl"
                }`}
              >
                {duration.includes("hours") ||
                duration.includes("mins") ||
                duration.includes("hour")
                  ? duration
                      .replace("hours", "h")
                      .replace("hour", "h")
                      .replace("mins", "m")
                      .replace(" ", "")
                  : duration}
              </div>
            </div>{" "}
          </div>{" "}
          <div className="text-sm text-gray-500">Estimated travel time</div>
        </div>

        <div className="flex flex-col flex-1 p-2 md:justify-between ">
          <div className="text-md font-medium text-gray-900 ">Emissions</div>
          <div className="flex items-center mb-4 justify-around">
            <svg
              fill={color}
              className="h-8 w-8"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 511.999 511.999"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M228.474,34.506c-83.97,0-152.747,66.294-156.729,149.396c-18.434,2.408-35.444,10.939-48.542,24.482
			C8.241,223.857,0,244.224,0,265.732c0,45.542,37.051,82.594,82.594,82.594h63.312v-16.556H82.594
			c-36.414,0-66.04-29.625-66.04-66.039c0-17.19,6.589-33.471,18.55-45.84c11.936-12.342,27.928-19.478,45.035-20.094l7.979-0.397
			v-7.985c0-77.393,62.963-140.356,140.356-140.356c22.671,0,44.297,5.24,64.278,15.577l7.607-14.704
			C278.318,40.531,253.462,34.506,228.474,34.506z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M399.129,122.585c-9.503,0-18.891,1.191-28.001,3.547c-11.467-24.987-29.235-46.508-51.735-62.564l-9.616,13.475
			c21.977,15.684,38.912,37.19,48.974,62.194l2.908,7.225l7.389-2.463c9.673-3.226,19.795-4.86,30.082-4.86
			c53.109,0,96.316,43.207,96.316,96.317c0,53.109-43.207,96.316-96.316,96.316h-231.21v16.554h231.21
			c62.238,0,112.871-50.635,112.87-112.87C511.999,173.218,461.367,122.585,399.129,122.585z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="277.831,419.883 255.811,393.678 273.336,372.912 260.685,362.236 234.17,393.656 256.19,419.86 234.17,445.954 
			260.673,477.493 273.348,466.843 255.811,445.976 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="393.434,419.883 371.414,393.678 388.939,372.912 376.288,362.236 349.773,393.656 371.793,419.86 
			349.773,445.954 376.276,477.493 388.951,466.843 371.414,445.976 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="167.731,419.883 145.712,393.678 163.236,372.912 150.585,362.236 124.071,393.656 146.09,419.86 
			124.071,445.954 150.574,477.493 163.248,466.843 145.712,445.976 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M206.456,81.317l2.783,7.795l-5.568-15.59c-0.831,0.297-20.584,7.433-40.562,21.703
			c-27.477,19.626-42.001,43.37-42.001,68.666h16.554c0-48.516,70.866-74.524,71.582-74.781L206.456,81.317z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect x="118.375" y="177.64" width="22.02" height="16.554" />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M217.466,287.733c-25.791,0-46.773-20.982-46.773-46.772s20.982-46.772,46.773-46.772c8.337,0,16.403,2.154,23.324,6.231
			l8.402-14.264c-9.466-5.576-20.437-8.522-31.726-8.522c-34.919,0-63.327,28.409-63.327,63.326s28.409,63.326,63.327,63.326
			c11.16,0,22.117-2.938,31.683-8.495l-8.316-14.314C233.688,285.629,225.826,287.733,217.466,287.733z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M334.054,197.293c-8.878-12.677-20.957-19.659-34.015-19.659c-13.058,0-25.137,6.982-34.015,19.659
			c-8.253,11.782-12.797,27.292-12.797,43.667c0,16.376,4.544,31.884,12.797,43.667c8.877,12.677,20.957,19.659,34.015,19.659
			c13.058,0,25.14-6.982,34.015-19.659c8.253-11.782,12.797-27.291,12.797-43.667C346.851,224.585,342.307,209.077,334.054,197.293z
			 M300.039,287.732c-16.401,0-30.257-21.419-30.257-46.772c0-25.353,13.856-46.772,30.257-46.772
			c16.402,0,30.257,21.419,30.257,46.772C330.296,266.313,316.44,287.732,300.039,287.732z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="383.829,287.732 388.218,276.762 423.92,276.762 423.92,216.168 368.832,216.168 368.832,240.96 385.386,240.96 
			385.386,232.723 407.366,232.723 407.366,260.208 377.008,260.208 359.379,304.287 426.653,304.287 426.653,287.732 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect x="52.312" y="271.216" width="22.02" height="16.554" />
                </g>
              </g>
              <g>
                <g>
                  <rect x="74.34" y="249.199" width="22.02" height="16.554" />
                </g>
              </g>
            </svg>
            <div className="flex flex-col justify-center space-y-1  h-full  items-center">
              <div className="md:text-2xl font-bold text-gray-600">
                {emi} <span className="text-sm">CO2 kg</span>
              </div>
            </div>{" "}
          </div>{" "}
          <div className="text-sm text-gray-500">Impact on environment</div>
        </div>
      </div>
    </div>
  );
};

export default Stat;

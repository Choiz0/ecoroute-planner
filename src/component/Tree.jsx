import React from "react";

const Tree = ({ percentage, label }) => {
  // Calculate the fill height based on the percentage
  const fillHeight = 100 - percentage; // Adjusts the start of the fill

  return (
    <div style={{ margin: "10px", display: "inline-block" }}>
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.2"
      >
        <defs>
          <linearGradient
            id={`fillGradient-${label}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset={`${fillHeight}%`} stopColor="#fff" />
            <stop offset={`${fillHeight}%`} stopColor="black" />
          </linearGradient>
        </defs>
        <path
          d="m8 1.75-4.25 5.5h2.5l-3.5 4h4v3h2.5v-3h4l-3.5-4h2.5z"
          fill={`url(#fillGradient-${label})`}
        />
        <path
          d="m8 1.75-4.25 5.5h2.5l-3.5 4h4v3h2.5v-3h4l-3.5-4h2.5z"
          fill="none"
          stroke="green"
        />
      </svg>
      <div className="text-center flex flex-col justify-center items-center space-y-1">
        <div className="badge bg-g">{percentage}%</div>
        <div className="badge bg-myg2 text-white py-2 ">
          {label === ("Transit" || "transit" || "Transit")
            ? "Public Tranport"
            : label}
        </div>
      </div>
    </div>
  );
};

export default Tree;

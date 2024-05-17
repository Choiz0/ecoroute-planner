import React from "react";

export const transportImg = {
  BICYCLING: (
    <svg
      className="h-8 w-8 text-blue-500 mr-2"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx={5} cy={18} r={3} />{" "}
      <circle cx={19} cy={18} r={3} />{" "}
      <polyline points="12 19 12 15 9 12 14 8 16 11 19 11" />{" "}
      <circle cx={17} cy={5} r={1} />
    </svg>
  ),
  DRIVING: (
    <svg
      className="h-8 w-8 text-red-500 mr-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="7" cy="17" r="2" />{" "}
      <circle cx="17" cy="17" r="2" />{" "}
      <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
    </svg>
  ),
  TRANSIT: (
    <svg
      className="h-8 w-8 text-orange-500 mr-2"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx={6} cy={17} r={2} />{" "}
      <circle cx={18} cy={17} r={2} />{" "}
      <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />{" "}
      <polyline points="16 5 17.5 12 22 12" />{" "}
      <line x1={2} y1={10} x2={17} y2={10} />{" "}
      <line x1={7} y1={5} x2={7} y2={10} />{" "}
      <line x1={12} y1={5} x2={12} y2={10} />
    </svg>
  ),
  WALKING: (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      //green color for
      fill="#00A98F"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3692 5.13905C13.3692 6.00924 12.6638 6.71466 11.7936 6.71466C10.9234 6.71466 10.218 6.00924 10.218 5.13905C10.218 4.26887 10.9234 3.56345 11.7936 3.56345C12.6638 3.56345 13.3692 4.26887 13.3692 5.13905Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="1.35052"
      />
      <path
        d="M11.7782 14.8313H9.48168C9.94681 12.7756 9.94681 11.0994 9.94681 9.42322L12.1943 9.64358C12.1943 11.2195 11.7782 13.0771 11.7782 14.8313Z"
        fill="#000000"
      />
      <path
        d="M9.48168 14.8313C8.09375 17.284 6.95068 21.1119 6.95068 21.1119M9.48168 14.8313C10.2219 14.8313 11.038 14.8313 11.7782 14.8313M9.48168 14.8313C9.94681 12.7756 9.94681 11.0994 9.94681 9.42322L12.1943 9.64358C12.1943 11.2195 11.7782 13.0771 11.7782 14.8313M11.7782 14.8313C13.2124 17.284 12.4653 21.1119 12.4653 21.1119"
        stroke="#000000"
        strokeWidth="2.36342"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6599 9.42322L14.8501 12.9967L17.5324 11.8874"
        stroke="#000000"
        strokeWidth="1.67621"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.80518 9.08887L6.53081 10.0556L8.79988 13.627"
        stroke="#000000"
        strokeWidth="1.67621"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  INFO: (
    <svg
      className="h-8 w-8 text-red-500"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />{" "}
      <line x1="12" y1="8" x2="12.01" y2="8" />{" "}
      <polyline points="11 12 12 12 12 16 13 16" />
    </svg>
  ),
};

export default transportImg;

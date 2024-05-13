import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, className, ...props }) => {
  return (
    <Link
      className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      {...props}
    >
      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="relative block border border-current bg-white px-8 py-3 text-center">
        {children}
      </span>
    </Link>
  );
};

export default Button;

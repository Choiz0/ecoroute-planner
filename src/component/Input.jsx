import React from "react";

const Input = ({
  children,
  placeholder,
  lableText,
  className,
  reftext,
  onChange,
  value,
  ...props
}) => {
  return (
    <label className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-darkg focus-within:ring-1 focus-within:ring-darkg">
      <input
        type="text"
        placeholder={placeholder}
        className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${className}`}
        ref={reftext}
        {...props}
        value={value}
        onChange={onChange}
      />

      <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
        {lableText}
      </span>
    </label>
  );
};

export default Input;

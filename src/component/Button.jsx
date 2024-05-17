const Button = ({
  children,
  className = "",
  backgroundColor = "bg-teal-600",
  textColor = "text-darkg",
  borderColor = "border-teal-600",
  lastBgColor = "bg-white",

  ...props
}) => {
  return (
    <a
      className={`group cursor-pointer bg-slate-500 text-center relative inline-block text-sm font-medium focus:outline-none focus:ring active:${textColor.replace(
        "text-",
        ""
      )} ${className}`}
      {...props}
    >
      <span
        className={`absolute inset-0 translate-x-0.5 translate-y-0.5 ${backgroundColor} transition-transform group-hover:translate-x-0 group-hover:translate-y-0`}
      ></span>
      <span
        className={`relative block border ${borderColor} ${textColor} px-8 py-3 ${lastBgColor}`}
      >
        {children}
      </span>
    </a>
  );
};

export default Button;

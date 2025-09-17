import React from "react";

const ColoredText = ({
  children,
  color = "blue",
  className = "",
  linkTo = null,
  onNavigate = null,
  autoQuotes = true,
  theme = "dark",
}) => {
  const colorClasses =
    theme === "light"
      ? {
          blue: "!text-red-600",
          yellow: "!text-green-600",
          green: "!text-blue-600",
          gray: "!text-purple-600",
          "gray-500": "!text-gray-500",
        }
      : {
          blue: "text-blue-400",
          yellow: "text-yellow-400",
          green: "text-green-400",
          gray: "text-gray-400",
          "gray-500": "text-gray-500",
        };

  const baseClasses = "text-xs font-mono break-words overflow-wrap-anywhere";
  const colorClass = colorClasses[color] || colorClasses.blue;

  const handleClick = () => {
    if (linkTo && onNavigate) {
      onNavigate(linkTo);
    }
  };

  const isClickable = linkTo && onNavigate;

  return (
    <span
      className={`${baseClasses} ${colorClass} ${className} ${
        isClickable
          ? `cursor-pointer transition-colors ${
              theme === "light" ? "hover:!text-red-900" : "hover:text-white"
            }`
          : ""
      }`}
      onClick={isClickable ? handleClick : undefined}
    >
      {autoQuotes ? `"${children}"` : children}
    </span>
  );
};

export default ColoredText;

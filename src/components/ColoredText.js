import React from "react";

const ColoredText = ({ children, color = "blue", className = "" }) => {
  const colorClasses = {
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
    gray: "text-gray-400",
    "gray-500": "text-gray-500",
  };

  const baseClasses = "text-xs font-mono";
  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <span className={`${baseClasses} ${colorClass} ${className}`}>
      {children}
    </span>
  );
};

export default ColoredText;

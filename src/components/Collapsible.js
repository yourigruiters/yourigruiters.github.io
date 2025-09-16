import React, { useState, useEffect } from "react";
import ColoredText from "./ColoredText";

const Collapsible = ({
  children,
  isOpen = true,
  onToggle,
  bracketType = "curly", // "curly", "square", "round"
  className = "",
  showComma = false,
  label = null, // Optional label text before the brackets
  inlineContent = false, // For props sections that should display inline
  theme = "dark",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  // Sync internal state with external isOpen prop
  useEffect(() => {
    setIsCollapsed(!isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const getBrackets = () => {
    switch (bracketType) {
      case "square":
        return { open: "[", close: "]" };
      case "round":
        return { open: "(", close: ")" };
      default:
        return { open: "{", close: "}" };
    }
  };

  const brackets = getBrackets();

  return (
    <div className={`block ${className}`}>
      <div className="inline-block">
        {label && (
          <>
            {label}
            <span className="mr-1"> </span>
          </>
        )}
        {isCollapsed ? (
          // When collapsed, make the entire {...} clickable inline
          <span
            className={`cursor-pointer transition-colors ${
              theme === "light" ? "hover:text-gray-800" : "hover:text-white"
            }`}
            onClick={handleToggle}
          >
            {brackets.open}
            <span
              className={theme === "light" ? "text-gray-600" : "text-gray-400"}
            >
              ...
            </span>
            {brackets.close}
          </span>
        ) : (
          // When expanded, brackets are clickable and content goes below
          <>
            <span
              className={`cursor-pointer transition-colors ${
                theme === "light" ? "hover:text-gray-800" : "hover:text-white"
              }`}
              onClick={handleToggle}
            >
              {brackets.open}
            </span>
            <div className="block">{children}</div>
            <span
              className={`cursor-pointer transition-colors ${
                theme === "light" ? "hover:text-gray-800" : "hover:text-white"
              }`}
              onClick={handleToggle}
            >
              {brackets.close}
            </span>
          </>
        )}

        {showComma && <span>,</span>}
      </div>
    </div>
  );
};

export default Collapsible;

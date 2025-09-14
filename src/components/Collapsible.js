import React, { useState } from "react";
import ColoredText from "./ColoredText";

const Collapsible = ({
  children,
  isOpen = false,
  onToggle,
  bracketType = "curly", // "curly", "square", "round"
  className = "",
  showComma = false,
  label = null, // Optional label text before the brackets
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

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
    <div className={`inline-block ${className}`}>
      {label && (
        <>
          {label}
          <span className="mr-1"> </span>
        </>
      )}
      {isCollapsed ? (
        // When collapsed, make the entire {...} clickable
        <span
          className="cursor-pointer hover:text-white transition-colors"
          onClick={handleToggle}
        >
          {brackets.open}
          <span className="text-gray-400">...</span>
          {brackets.close}
        </span>
      ) : (
        // When expanded, only brackets are clickable
        <>
          <span
            className="cursor-pointer hover:text-white transition-colors"
            onClick={handleToggle}
          >
            {brackets.open}
          </span>
          <div className="block">{children}</div>
          <span
            className="cursor-pointer hover:text-white transition-colors"
            onClick={handleToggle}
          >
            {brackets.close}
          </span>
        </>
      )}

      {showComma && <span>,</span>}
    </div>
  );
};

export default Collapsible;

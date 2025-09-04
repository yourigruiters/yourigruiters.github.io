import React, { useState, useEffect } from "react";

const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-turquoise border-turquoise text-darkBg",
          icon: "✓",
        };
      case "error":
        return {
          container: "bg-sunset border-sunset text-white",
          icon: "✕",
        };
      default:
        return {
          container: "bg-gray-500 border-gray-500 text-white",
          icon: "ℹ",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div
        className={`${styles.container} border-2 rounded-full px-6 py-3 shadow-lg flex items-center space-x-3 min-w-[200px] max-w-[400px]`}
      >
        <span className="text-lg font-bold">{styles.icon}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-lg font-bold hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;

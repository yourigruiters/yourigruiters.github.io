import React, { useState, useEffect } from "react";

const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-white/90 border-turquoise text-darkBg",
          icon: "✓",
        };
      case "error":
        return {
          container: "bg-white/90 border-sunset text-darkBg",
          icon: "✕",
        };
      default:
        return {
          container: "bg-white/90 border-gray-500 text-darkBg",
          icon: "ℹ",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down w-full max-w-4xl px-6">
      <div
        className={`${styles.container} border-2 rounded-xl px-6 py-4 shadow-lg flex items-center justify-center w-full`}
      >
        <span className="font-medium text-center">{message}</span>
      </div>
    </div>
  );
};

export default Toast;

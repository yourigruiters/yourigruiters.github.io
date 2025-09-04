import React from "react";
import { useToast } from "../contexts/ToastContext";

const ToastExample = () => {
  const { success, error } = useToast();

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-bold mb-4">Toast Notification Demo</h2>
      <div className="space-x-4">
        <button
          onClick={() => success("Great job! You did it right!")}
          className="bg-turquoise text-darkBg font-semibold px-6 py-2 rounded-lg hover:opacity-80 transition"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => error("Oops! Something went wrong!")}
          className="bg-sunset text-white font-semibold px-6 py-2 rounded-lg hover:opacity-80 transition"
        >
          Show Error Toast
        </button>
      </div>
    </div>
  );
};

export default ToastExample;

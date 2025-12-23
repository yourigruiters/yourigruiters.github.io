import React from "react";
import { useNavigate } from "react-router-dom";

const BottomBackBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mt-8 mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>Back to overview</span>
      </button>
    </div>
  );
};

export default BottomBackBtn;

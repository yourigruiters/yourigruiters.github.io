import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, imageUrl }) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-64 w-full">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-sm text-white hover:bg-white/30 transition-colors border border-white/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <div className="absolute bottom-4 left-4 right-4">
        <h1 className="text-3xl font-bold text-white shadow-sm">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;

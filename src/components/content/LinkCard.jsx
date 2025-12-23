import React from "react";
import { useNavigate } from "react-router-dom";

const LinkCard = ({ to, title, description, imageUrl, number }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mb-4">
      <div
        onClick={() => navigate(to)}
        className="w-[90%] bg-white rounded-lg shadow-sm border border-gray-100 flex overflow-hidden cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] duration-200 relative group"
      >
        <div className="w-24 h-24 flex-shrink-0 relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {number && (
            <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm text-indigo-900 font-serif font-bold text-xs px-2 py-0.5 rounded-full shadow-sm border border-white/50 z-10">
              {number}
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col justify-center">
          <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;

import React from "react";

const OptionCard = ({ title, description, imageUrl, onClick, number }) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 mb-4 border border-gray-100 relative group"
    >
      <div className="h-96 w-full overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {number && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-900 font-serif font-bold text-lg px-3 py-1 rounded-full shadow-sm border border-white/50 z-10">
            {number}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default OptionCard;

import React from "react";

const SectionQuote = ({ quote }) => {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-[85%] flex flex-col items-center relative p-4">
        <div className="text-indigo-300 text-6xl font-serif leading-none mb-2 opacity-60">
          “
        </div>
        <p className="text-gray-800 text-2xl font-serif italic leading-relaxed text-center">
          {quote}
        </p>
      </div>
    </div>
  );
};

export default SectionQuote;

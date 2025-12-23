import React from "react";

const SectionText = ({ children }) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="w-[90%] text-gray-700 leading-relaxed text-base space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SectionText;

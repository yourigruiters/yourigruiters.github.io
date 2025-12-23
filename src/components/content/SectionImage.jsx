import React from "react";

const SectionImage = ({ src, alt }) => {
  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-[90%] overflow-hidden rounded-xl shadow-md">
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default SectionImage;

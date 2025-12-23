import React from "react";

const SectionList = ({ items }) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <div className="w-[90%] flex flex-col gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <span className="text-gray-700 text-base font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionList;

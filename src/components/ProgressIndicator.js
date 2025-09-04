import React from "react";

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between items-center text-sm text-gray-400">
      <span>
        Step {currentStep + 1} of {totalSteps}
      </span>
      <div className="flex space-x-1">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i <= currentStep ? "bg-cream" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;

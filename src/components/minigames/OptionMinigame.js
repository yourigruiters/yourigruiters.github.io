import React, { useState } from "react";

const OptionMinigame = ({ onNext }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option) => {
    // TODO: Implement option selection logic
    console.log("Selected option:", option);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Option Minigame</h2>
      <p className="mb-4">Choose the correct option:</p>
      <div className="space-y-2">
        {/* TODO: Add options */}
        <p className="text-gray-400">Options will be added here</p>
      </div>
      {/* TODO: Add result feedback */}
    </div>
  );
};

export default OptionMinigame;

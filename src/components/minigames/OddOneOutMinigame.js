import React, { useState } from "react";

const OddOneOutMinigame = ({ onNext }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (item) => {
    // TODO: Implement item selection logic
    console.log("Selected item:", item);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Odd One Out</h2>
      <p className="mb-4">Find the item that doesn't belong:</p>
      <div className="grid grid-cols-2 gap-2">
        {/* TODO: Add items */}
        <p className="text-gray-400 col-span-2">Items will be added here</p>
      </div>
      {/* TODO: Add result feedback */}
    </div>
  );
};

export default OddOneOutMinigame;

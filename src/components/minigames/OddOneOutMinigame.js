import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const OddOneOutMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const handleSelect = (item) => {
    // TODO: Implement item selection logic
    console.log("Selected item:", item);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.ODD_ONE_OUT.title}
        description={GAME_DESCRIPTIONS.ODD_ONE_OUT.description}
        onContinue={handleContinue}
      />
    );
  }

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

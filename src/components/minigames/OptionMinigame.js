import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const OptionMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const handleSelect = (option) => {
    // TODO: Implement option selection logic
    console.log("Selected option:", option);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.OPTION_MINIGAME.title}
        description={GAME_DESCRIPTIONS.OPTION_MINIGAME.description}
        onContinue={handleContinue}
      />
    );
  }

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

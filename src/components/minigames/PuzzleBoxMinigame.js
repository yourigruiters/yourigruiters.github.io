import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const PuzzleBoxMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [code, setCode] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const checkCode = () => {
    // TODO: Implement code checking logic
    console.log("Checking code:", code);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.PUZZLE_BOX.title}
        description={GAME_DESCRIPTIONS.PUZZLE_BOX.description}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Puzzle Box</h2>
      <p className="mb-4">Crack the code to open the box:</p>
      <div className="bg-gray-800 p-6 rounded-lg mb-4">
        {/* TODO: Add puzzle clue */}
        <p className="text-gray-400">Puzzle clue will be added here</p>
      </div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength="4"
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4 text-center text-2xl tracking-widest"
        placeholder="____"
      />
      <button
        onClick={checkCode}
        disabled={showResult}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition disabled:opacity-50"
      >
        Open Box
      </button>
      {/* TODO: Add result feedback */}
    </div>
  );
};

export default PuzzleBoxMinigame;

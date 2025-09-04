import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const WordsMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const checkWord = () => {
    // TODO: Implement word checking logic
    console.log("Checking word:", input);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.WORDS_MINIGAME.title}
        description={GAME_DESCRIPTIONS.WORDS_MINIGAME.description}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Words Minigame</h2>
      <p className="mb-2">Type the required words</p>
      <p className="mb-4">Score: {score}/3</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && checkWord()}
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4"
        placeholder="Type a word"
      />
      <button
        onClick={checkWord}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
      >
        Submit
      </button>
      {/* TODO: Add word list and feedback */}
    </div>
  );
};

export default WordsMinigame;

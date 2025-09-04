import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const SongSnippetMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [guess, setGuess] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const checkGuess = () => {
    // TODO: Implement guess checking logic
    console.log("Checking guess:", guess);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.SONG_SNIPPET.title}
        description={GAME_DESCRIPTIONS.SONG_SNIPPET.description}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Song Snippet</h2>
      <p className="mb-4">Guess the song from this snippet:</p>
      <div className="bg-gray-800 p-4 rounded-lg mb-4 italic">
        {/* TODO: Add song snippet */}
        <p className="text-gray-400">Song snippet will be added here</p>
      </div>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4"
        placeholder="Your guess..."
      />
      <button
        onClick={checkGuess}
        disabled={showResult}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition disabled:opacity-50"
      >
        Submit Guess
      </button>
      {/* TODO: Add result feedback */}
    </div>
  );
};

export default SongSnippetMinigame;

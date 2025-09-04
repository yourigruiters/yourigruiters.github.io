import React, { useState } from "react";

const SongSnippetMinigame = ({ onNext }) => {
  const [guess, setGuess] = useState("");
  const [showResult, setShowResult] = useState(false);

  const checkGuess = () => {
    // TODO: Implement guess checking logic
    console.log("Checking guess:", guess);
  };

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

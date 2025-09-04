import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const NameValidator = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const validateName = () => {
    // TODO: Implement validation logic
    console.log("Validating name:", name);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.NAME_VALIDATOR.title}
        description={GAME_DESCRIPTIONS.NAME_VALIDATOR.description}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Name Validator</h2>
      <p className="mb-4">
        Enter your name (at least 2 characters, letters only)
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4"
        placeholder="Enter your name"
      />
      <button
        onClick={validateName}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
      >
        Validate
      </button>
      {/* TODO: Add validation feedback */}
    </div>
  );
};

export default NameValidator;

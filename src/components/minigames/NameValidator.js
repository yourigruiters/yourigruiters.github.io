import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";
import { useToast } from "../../contexts/ToastContext";

const NameValidator = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(null);
  const { success, error } = useToast();

  const handleContinue = () => {
    setShowIntro(false);
  };

  const validateName = () => {
    const lowerName = name.toLowerCase().trim();
    const validNames = ["luxmi", "laxmi"];

    if (validNames.includes(lowerName)) {
      setIsValid(true);
      success("🦒 Giraffe says hello! Welcome, " + name + "!");
      onNext();
    } else {
      setIsValid(false);
      error("😞...");
    }
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
      <h2 className="text-xl font-bold mb-4">Enter your name</h2>
      <p className="mb-4">
        With an U or an A, who am I to judge? They'll both work perfectly fine!
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && validateName()}
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4"
        placeholder="Enter your name"
      />
      <button
        onClick={validateName}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
      >
        Validate
      </button>
    </div>
  );
};

export default NameValidator;

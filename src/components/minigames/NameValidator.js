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
      setTimeout(() => onNext(), 2000);
    } else {
      setIsValid(false);
      error("😞 Disappointed... That's not quite right. Try again!");
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
      <h2 className="text-xl font-bold mb-4">🦒 Validator</h2>
      <p className="mb-4">
        Enter your name (hint: it's either "luxmi" or "laxmi")
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

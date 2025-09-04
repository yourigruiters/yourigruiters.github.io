import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";

const DateValidator = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [date, setDate] = useState("");
  const [isValid, setIsValid] = useState(null);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const validateDate = () => {
    // TODO: Implement validation logic
    console.log("Validating date:", date);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.DATE_VALIDATOR.title}
        description={GAME_DESCRIPTIONS.DATE_VALIDATOR.description}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Date Validator</h2>
      <p className="mb-4">Enter a valid past date (after 1900)</p>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4"
      />
      <button
        onClick={validateDate}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
      >
        Validate Date
      </button>
      {/* TODO: Add validation feedback */}
    </div>
  );
};

export default DateValidator;

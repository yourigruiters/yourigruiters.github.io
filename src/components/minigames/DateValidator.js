import React, { useState } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";
import { useToast } from "../../contexts/ToastContext";

const DateValidator = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [date, setDate] = useState("");
  const [isValid, setIsValid] = useState(null);
  const { success, error } = useToast();

  const handleContinue = () => {
    setShowIntro(false);
  };

  const validateDate = () => {
    // Check if the date is July 12, 2025
    const inputDate = new Date(date);
    const targetDate = new Date(2025, 6, 12); // Month is 0-indexed, so 6 = July

    // Normalize both dates to midnight to avoid timezone/time issues
    const normalizedInputDate = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );
    const normalizedTargetDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );

    if (normalizedInputDate.getTime() === normalizedTargetDate.getTime()) {
      setIsValid(true);
      success("🐨 July 12, 2025 it is!");
      onNext();
    } else {
      setIsValid(false);
      error("😞...");
    }
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
      <p className="mb-4">(hint: no chance, sort it out yourself)</p>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && validateDate()}
        className="w-full p-3 border border-darkBorder rounded-lg bg-darkBg text-darkText mb-4"
      />
      <button
        onClick={validateDate}
        className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
      >
        Validate Date
      </button>
    </div>
  );
};

export default DateValidator;

import React, { useState, useEffect } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";
import { useToast } from "../../contexts/ToastContext";

const OddOneOutMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completedOptions, setCompletedOptions] = useState(0);
  const { success, error } = useToast();

  const options = [
    {
      question: "Which 🚩 doesn't belong to you?",
      option1: "🇳🇱",
      option2: "🇦🇺",
      option3: "🇳🇵",
      option4: "🇺🇸",
      correct: 1,
    },
    {
      question: "Which 🎵 doesn't belong to me?",
      option1: "Monsters",
      option2: "De vlieger",
      option3: "Vanilla Twilight",
      option4: "Laat me niet los",
      correct: 4,
    },
    {
      question: "Which 🍪 doesn't belong to me?",
      option1: "M&M's",
      option2: "KitKat",
      option3: "Twix",
      option4: "Bounty",
      correct: 2,
    },
    {
      question: "Which 🍕 doesn't belong to me?",
      option1: "Mexican",
      option2: "Italian",
      option3: "Nepalese",
      option4: "Dutch",
      correct: 3,
    },
    {
      question: "Which 👶 doesn't belong to you?",
      option1: "Alexander",
      option2: "Mikaela",
      option3: "Ebru",
      option4: "Levi",
      correct: 4,
    },
  ];

  // Available Tailwind colors (excluding dark mode colors)
  const availableColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-rose-500",
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-fuchsia-400",
    "bg-rose-400",
  ];

  // Generate random colors for each option
  const getRandomColors = () => {
    const colors = [];
    for (let i = 0; i < 4; i++) {
      colors.push(
        availableColors[Math.floor(Math.random() * availableColors.length)]
      );
    }
    return colors;
  };

  const [buttonColors, setButtonColors] = useState(() => getRandomColors());

  const handleContinue = () => {
    setShowIntro(false);
  };

  // Reset selection and generate new colors when game starts or option changes
  useEffect(() => {
    if (!showIntro) {
      setSelectedOption(null);
      setButtonColors(getRandomColors());
    }
  }, [showIntro, currentOptionIndex]);

  const handleOptionSelect = (optionNumber) => {
    setSelectedOption(optionNumber);
  };

  const checkOption = (optionIndex) => {
    const currentOption = options[optionIndex];

    if (selectedOption === null) {
      error("😞 Please select an option first!");
      return;
    }

    if (selectedOption === currentOption.correct) {
      success(`🐨 Correct!`);
      setCompletedOptions((prev) => prev + 1);

      if (completedOptions + 1 >= 5) {
        onNext();
      } else {
        // Move to next option
        setCurrentOptionIndex((prev) => prev + 1);
        setSelectedOption(null);
      }
    } else {
      error("😞 For real? I don't think so!");
    }
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.ODD_ONE_OUT.title}
        description={GAME_DESCRIPTIONS.ODD_ONE_OUT.description}
        onContinue={handleContinue}
      />
    );
  }

  const currentOption = options[currentOptionIndex];

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-center mb-6">
          <span className="text-2xl font-bold text-white">
            {currentOption.question}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 mb-6">
          <button
            onClick={() => handleOptionSelect(1)}
            className={`w-64 px-6 py-2 rounded-lg font-bold text-base transition-all duration-300 ${
              selectedOption === 1
                ? `${buttonColors[0]} text-white opacity-100`
                : `${buttonColors[0]} text-white opacity-30 hover:opacity-50`
            }`}
          >
            {currentOption.option1}
          </button>

          <button
            onClick={() => handleOptionSelect(2)}
            className={`w-64 px-6 py-2 rounded-lg font-bold text-base transition-all duration-300 ${
              selectedOption === 2
                ? `${buttonColors[1]} text-white opacity-100`
                : `${buttonColors[1]} text-white opacity-30 hover:opacity-50`
            }`}
          >
            {currentOption.option2}
          </button>

          <button
            onClick={() => handleOptionSelect(3)}
            className={`w-64 px-6 py-2 rounded-lg font-bold text-base transition-all duration-300 ${
              selectedOption === 3
                ? `${buttonColors[2]} text-white opacity-100`
                : `${buttonColors[2]} text-white opacity-30 hover:opacity-50`
            }`}
          >
            {currentOption.option3}
          </button>

          <button
            onClick={() => handleOptionSelect(4)}
            className={`w-64 px-6 py-2 rounded-lg font-bold text-base transition-all duration-300 ${
              selectedOption === 4
                ? `${buttonColors[3]} text-white opacity-100`
                : `${buttonColors[3]} text-white opacity-30 hover:opacity-50`
            }`}
          >
            {currentOption.option4}
          </button>
        </div>

        <button
          onClick={() => checkOption(currentOptionIndex)}
          className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
        >
          Check Choice
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Question {currentOptionIndex + 1} of {options.length}
      </div>
    </div>
  );
};

export default OddOneOutMinigame;

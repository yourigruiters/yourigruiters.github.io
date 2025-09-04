import React, { useState, useEffect } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";
import { useToast } from "../../contexts/ToastContext";

const WordsMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [completedWords, setCompletedWords] = useState(0);
  const { success, error } = useToast();

  const words = [
    {
      visible: "Monopoly",
      missing: ["d", "e", "a", "l"],
      full: "Monopoly deal",
    },
    {
      visible: "Sausuge",
      missing: ["d", "o", "g"],
      full: "Sausage dog",
    },
    {
      visible: "Cutie",
      missing: ["p", "i", "e"],
      full: "Cutie pie",
    },
    {
      visible: "Australia",
      missing: ["z", "o", "o"],
      full: "Australia zoo",
    },
    {
      visible: "Yo- 🍨",
      missing: ["c", "h", "i"],
      full: "Yo-Chi 🍨",
    },
  ];

  const handleContinue = () => {
    setShowIntro(false);
  };

  // Auto-focus first input when game starts or word changes
  useEffect(() => {
    if (!showIntro) {
      setTimeout(() => {
        const firstInput = document.getElementById(
          `input-${currentWordIndex}-0`
        );
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    }
  }, [showIntro, currentWordIndex]);

  const handleInputChange = (wordIndex, letterIndex, value) => {
    setUserInputs((prev) => ({
      ...prev,
      [`${wordIndex}-${letterIndex}`]: value,
    }));

    // Auto-focus to next input if a character was entered
    if (value && letterIndex < words[wordIndex].missing.length - 1) {
      setTimeout(() => {
        const nextInput = document.getElementById(
          `input-${wordIndex}-${letterIndex + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    }
  };

  const checkWord = (wordIndex) => {
    const word = words[wordIndex];
    const userAnswer = word.missing
      .map((_, index) => userInputs[`${wordIndex}-${index}`] || "")
      .join("")
      .toLowerCase();

    const correctAnswer = word.missing.join("").toLowerCase();

    if (userAnswer === correctAnswer) {
      success(`🐨 Correct! "${word.full}"`);
      setCompletedWords((prev) => prev + 1);

      if (completedWords + 1 >= 5) {
        onNext();
      } else {
        // Move to next word
        setCurrentWordIndex((prev) => prev + 1);
        setUserInputs({});
      }
    } else {
      error("😞 Was expecting a little more from you!");
    }
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

  const currentWord = words[currentWordIndex];

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Words Minigame</h2>
      <p className="mb-4">
        Complete the words by filling in the missing letters
      </p>

      <div className="mb-8">
        <div className="text-center mb-6">
          <span className="text-2xl font-bold text-cream">
            {currentWord.visible}
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          {currentWord.missing.map((_, index) => (
            <input
              key={index}
              id={`input-${currentWordIndex}-${index}`}
              type="text"
              maxLength="1"
              value={userInputs[`${currentWordIndex}-${index}`] || ""}
              onChange={(e) =>
                handleInputChange(currentWordIndex, index, e.target.value)
              }
              className="w-12 h-12 text-center border border-darkBorder rounded bg-darkBg text-darkText font-bold text-xl"
            />
          ))}
        </div>

        <button
          onClick={() => checkWord(currentWordIndex)}
          className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
        >
          Check Word
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Word {currentWordIndex + 1} of {words.length}
      </div>
    </div>
  );
};

export default WordsMinigame;

import React, { useState, useEffect } from "react";

const GameIntro = ({ title, description, onContinue }) => {
  const [isFading, setIsFading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeText = () => {
      if (currentIndex < description.length) {
        setDisplayedText(description.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    // Start typing after a short delay
    const startTyping = setTimeout(typeText, 500);

    return () => clearTimeout(startTyping);
  }, [description]);

  const handleContinue = () => {
    setIsFading(true);
    // Wait for fade animation to complete before calling onContinue
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-darkBg flex items-center justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center max-w-2xl px-6">
        <h2 className="text-4xl font-bold mb-8 text-white">{title}</h2>
        <div className="bg-gray-800 rounded-xl p-8 mb-10">
          <p className="text-gray-300 leading-relaxed text-lg min-h-[120px]">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>
        <button
          onClick={handleContinue}
          disabled={isTyping}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform shadow-lg text-lg ${
            isTyping
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-blue-600 hover:to-purple-700 hover:scale-105"
          }`}
        >
          {isTyping ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default GameIntro;

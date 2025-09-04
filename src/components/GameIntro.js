import React, { useState, useEffect } from "react";

const GameIntro = ({ title, description, onContinue }) => {
  const [isFading, setIsFading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [randomBgColor, setRandomBgColor] = useState("");

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
    "bg-pink-500",
    "bg-rose-500",
    "bg-slate-500",
    "bg-gray-500",
    "bg-zinc-500",
    "bg-neutral-500",
    "bg-stone-500",
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
    "bg-pink-400",
    "bg-rose-400",
    "bg-slate-400",
    "bg-gray-400",
    "bg-zinc-400",
    "bg-neutral-400",
    "bg-stone-400",
  ];

  // Set random background color when component mounts
  useEffect(() => {
    const randomColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
    setRandomBgColor(randomColor);
  }, []);

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
      <div className="w-full text-center max-w-2xl px-6">
        <h2
          className="text-4xl font-bold mb-8 text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className={`flex-1 w-full ${randomBgColor} bg-opacity-20 rounded-xl p-8 mb-10`}
        >
          <p
            className="text-gray-300 leading-relaxed text-lg min-h-[120px]"
            dangerouslySetInnerHTML={{
              __html:
                displayedText +
                (isTyping ? '<span class="animate-pulse">|</span>' : ""),
            }}
          />
        </div>
        <button
          onClick={handleContinue}
          disabled={isTyping}
          className={`bg-gradient-to-br from-peach-dark via-peach to-cream-dark text-darkBg font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform shadow-lg text-lg hover:scale-105 ${
            isTyping
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gradient-to-br hover:from-cream-dark hover:via-cream hover:to-peach-dark"
          }`}
        >
          {isTyping ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default GameIntro;

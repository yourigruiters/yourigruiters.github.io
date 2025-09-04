import { useState } from "react";
import { MINIGAME_STEPS, TOTAL_STEPS } from "./constants/minigames";
import { createNextStepHandler } from "./utils/navigation";
import { ToastProvider } from "./contexts/ToastContext";
import CompletionScreen from "./components/CompletionScreen";
import FinalScreen from "./components/FinalScreen";
import {
  NameValidator,
  DateValidator,
  WordsMinigame,
  OptionMinigame,
  OddOneOutMinigame,
  PuzzleBoxMinigame,
} from "./components/minigames";

function App() {
  const [currentStep, setCurrentStep] = useState(MINIGAME_STEPS.NAME_VALIDATOR);
  const nextStep = createNextStepHandler(setCurrentStep);

  const renderCurrentMinigame = () => {
    switch (currentStep) {
      case MINIGAME_STEPS.NAME_VALIDATOR:
        return <NameValidator onNext={nextStep} />;
      case MINIGAME_STEPS.DATE_VALIDATOR:
        return <DateValidator onNext={nextStep} />;
      case MINIGAME_STEPS.WORDS_MINIGAME:
        return <WordsMinigame onNext={nextStep} />;
      case MINIGAME_STEPS.OPTION_MINIGAME:
        return <OptionMinigame onNext={nextStep} />;
      case MINIGAME_STEPS.ODD_ONE_OUT:
        return <OddOneOutMinigame onNext={nextStep} />;
      case MINIGAME_STEPS.PUZZLE_BOX:
        return <PuzzleBoxMinigame onNext={nextStep} />;
      case MINIGAME_STEPS.FINAL_SCREEN:
        return <FinalScreen />;
      case MINIGAME_STEPS.COMPLETION:
        return <CompletionScreen />;
      default:
        return <CompletionScreen />;
    }
  };

  // Only count the 5 minigames: DATE_VALIDATOR, WORDS_MINIGAME, OPTION_MINIGAME, ODD_ONE_OUT, PUZZLE_BOX
  const MINIGAME_COUNT = 5;

  const progressPercentage = (() => {
    if (currentStep === MINIGAME_STEPS.NAME_VALIDATOR) {
      return 0;
    }

    const minigameSteps = [
      MINIGAME_STEPS.DATE_VALIDATOR,
      MINIGAME_STEPS.WORDS_MINIGAME,
      MINIGAME_STEPS.OPTION_MINIGAME,
      MINIGAME_STEPS.ODD_ONE_OUT,
      MINIGAME_STEPS.PUZZLE_BOX,
    ];

    const currentMinigameIndex = minigameSteps.indexOf(currentStep);
    if (currentMinigameIndex === -1) {
      return 100; // Final screen or completion
    }

    return ((currentMinigameIndex + 1) / MINIGAME_COUNT) * 100;
  })();

  return (
    <ToastProvider>
      <div className="min-h-screen bg-darkBg text-darkText">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-darkPanel via-gray-800 to-darkPanel border-b border-darkBorder">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold mb-3 text-center">
              🇬🇧 🦒 🇳🇱 🐨 🇦🇺
            </h1>

            {/* Progress Bar */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-gray-400">
                  {(() => {
                    if (currentStep === MINIGAME_STEPS.NAME_VALIDATOR) {
                      return `0/${MINIGAME_COUNT}`;
                    }

                    const minigameSteps = [
                      MINIGAME_STEPS.DATE_VALIDATOR,
                      MINIGAME_STEPS.WORDS_MINIGAME,
                      MINIGAME_STEPS.OPTION_MINIGAME,
                      MINIGAME_STEPS.ODD_ONE_OUT,
                      MINIGAME_STEPS.PUZZLE_BOX,
                    ];

                    const currentMinigameIndex =
                      minigameSteps.indexOf(currentStep);
                    if (currentMinigameIndex === -1) {
                      return `${MINIGAME_COUNT}/${MINIGAME_COUNT}`; // Final screen or completion
                    }

                    return `${currentMinigameIndex + 1}/${MINIGAME_COUNT}`;
                  })()}
                </span>
              </div>

              {/* Progress Bar Background */}
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                {/* Gradient Progress Fill */}
                <div
                  className="h-full bg-gradient-to-r from-peach-dark via-peach to-cream-dark rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-32 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-darkPanel border border-darkBorder rounded-xl p-8 shadow-lg max-h-[calc(100vh-12rem)] overflow-y-auto">
              {renderCurrentMinigame()}
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;

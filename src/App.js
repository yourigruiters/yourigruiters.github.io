import { useState } from "react";
import { MINIGAME_STEPS, TOTAL_STEPS } from "./constants/minigames";
import { createNextStepHandler } from "./utils/navigation";
import { ToastProvider } from "./contexts/ToastContext";
import CompletionScreen from "./components/CompletionScreen";
import {
  NameValidator,
  DateValidator,
  WordsMinigame,
  OptionMinigame,
  OddOneOutMinigame,
  SongSnippetMinigame,
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
      case MINIGAME_STEPS.SONG_SNIPPET:
        return <SongSnippetMinigame onNext={nextStep} />;
      case MINIGAME_STEPS.PUZZLE_BOX:
        return <PuzzleBoxMinigame onNext={nextStep} />;
      case MINIGAME_STEPS.COMPLETION:
        return <CompletionScreen />;
      default:
        return <CompletionScreen />;
    }
  };

  const progressPercentage =
    currentStep === MINIGAME_STEPS.NAME_VALIDATOR
      ? 0
      : ((currentStep - MINIGAME_STEPS.NAME_VALIDATOR) / (TOTAL_STEPS - 1)) *
        100;

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
                  {currentStep === MINIGAME_STEPS.NAME_VALIDATOR
                    ? `0/${TOTAL_STEPS - 1}`
                    : `${currentStep - MINIGAME_STEPS.NAME_VALIDATOR}/${
                        TOTAL_STEPS - 1
                      }`}
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

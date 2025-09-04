import { useState } from "react";
import { MINIGAME_STEPS, TOTAL_STEPS } from "./constants/minigames";
import { createNextStepHandler } from "./utils/navigation";
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

  const getCurrentGameTitle = () => {
    switch (currentStep) {
      case MINIGAME_STEPS.NAME_VALIDATOR:
        return "Name Validator";
      case MINIGAME_STEPS.DATE_VALIDATOR:
        return "Date Validator";
      case MINIGAME_STEPS.WORDS_MINIGAME:
        return "Words Minigame";
      case MINIGAME_STEPS.OPTION_MINIGAME:
        return "Option Minigame";
      case MINIGAME_STEPS.ODD_ONE_OUT:
        return "Odd One Out";
      case MINIGAME_STEPS.SONG_SNIPPET:
        return "Song Snippet";
      case MINIGAME_STEPS.PUZZLE_BOX:
        return "Puzzle Box";
      case MINIGAME_STEPS.COMPLETION:
        return "Congratulations!";
      default:
        return "Minigame Quiz";
    }
  };

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

  const progressPercentage = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-darkBg text-darkText">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-darkPanel border-b border-darkBorder">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold mb-3 text-center">
            {getCurrentGameTitle()}
          </h1>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-gray-400">
                {currentStep + 1}/{TOTAL_STEPS}
              </span>
            </div>

            {/* Progress Bar Background */}
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              {/* Gradient Progress Fill */}
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-darkPanel border border-darkBorder rounded-xl p-8 shadow-lg">
            {renderCurrentMinigame()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

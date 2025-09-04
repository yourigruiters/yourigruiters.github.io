// Navigation utility functions for minigame progression

export const createNextStepHandler = (setCurrentStep) => {
  return () => {
    setCurrentStep((prev) => prev + 1);
  };
};

export const resetToFirstStep = (setCurrentStep) => {
  setCurrentStep(0);
};

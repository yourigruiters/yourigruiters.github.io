import React, { useState } from "react";
import GameIntro from "./GameIntro";

const FinalScreen = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleContinue = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return (
      <GameIntro
        title="🔥🔥🔥 </br> You've made it!"
        description="You've successfully completed all the challenges!<br/><br/>You've proven yourself worthy of a personal message and gift box."
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-cream">One Move Away!</h2>

        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-gray-300">
            Life is often just one move away from meeting someone who can change
            everything, or missing them entirely. You've made that move in the
            right moment.
          </p>

          <p className="text-gray-300">
            Timing and circumstances play their part, bringing moments into
            opportunities that we sometimes only realize after the moment. Like
            asking the silly question to weigh some luggage.
          </p>

          <p className="text-cream font-semibold">
            I’m grateful that you found me, and that we have this chance to
            create something meaningful together.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-cream mt-8">
          Your Gift Awaits!
        </h2>

        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-gray-300">
            Thank you for taking your time to play through this little silly
            game! There is a gift awaiting you in my possession and it will be
            given to you when we meet in Perth.
          </p>

          <p className="text-gray-300">
            I'm truly looking forward to seeing you and handing you this gift!
          </p>

          <p className="text-gray-300">Thank you.</p>
        </div>

        <div className="mt-12 text-4xl">🎁 ✨ 🎉</div>
      </div>
    </div>
  );
};

export default FinalScreen;

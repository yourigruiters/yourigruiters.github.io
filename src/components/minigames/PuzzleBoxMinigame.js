import React, { useState, useEffect } from "react";
import GameIntro from "../GameIntro";
import { GAME_DESCRIPTIONS } from "../../constants/gameData";
import { useToast } from "../../contexts/ToastContext";

const PuzzleBoxMinigame = ({ onNext }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [puzzle, setPuzzle] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(15);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAutoSolve, setShowAutoSolve] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);
  const { success, error } = useToast();

  // Create the image paths
  const createImagePaths = () => {
    const images = [];
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 4; col++) {
        images.push(`/media/row-${row}-column-${col}.webp`);
      }
    }
    return images;
  };

  // Fisher-Yates shuffle algorithm for proper scrambling
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize the puzzle
  const initializePuzzle = () => {
    const images = createImagePaths();
    const puzzle = images.map((image, index) => ({
      id: index,
      image: image,
      correctPosition: index,
    }));

    // Properly shuffle the puzzle pieces (except the last piece which stays empty)
    const piecesToShuffle = puzzle.slice(0, 15);
    const shuffledPieces = shuffleArray(piecesToShuffle);
    shuffledPieces.push({ id: 15, image: null, correctPosition: 15 }); // Empty piece

    setPuzzle(shuffledPieces);
    setEmptyIndex(15);
    setIsCompleted(false);
  };

  // Check if puzzle is completed
  const checkCompletion = (newPuzzle) => {
    const isComplete = newPuzzle.every(
      (piece, index) => piece.correctPosition === index
    );
    if (isComplete) {
      setIsCompleted(true);
      success("🎉 Puzzle completed! Well done!");
      setTimeout(() => onNext(), 2000);
    }
  };

  // Handle piece click
  const handlePieceClick = (clickedIndex) => {
    if (isCompleted) return;

    const row = Math.floor(clickedIndex / 4);
    const col = clickedIndex % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    // Check if the clicked piece is adjacent to the empty space
    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newPuzzle = [...puzzle];
      // Swap the clicked piece with the empty space
      [newPuzzle[clickedIndex], newPuzzle[emptyIndex]] = [
        newPuzzle[emptyIndex],
        newPuzzle[clickedIndex],
      ];

      setPuzzle(newPuzzle);
      setEmptyIndex(clickedIndex);
      checkCompletion(newPuzzle);
    }
  };

  const handleContinue = () => {
    setShowIntro(false);
    initializePuzzle();
    setGameStartTime(Date.now());
  };

  // Auto-solve timer effect
  useEffect(() => {
    if (gameStartTime && !isCompleted && !showAutoSolve) {
      const timer = setTimeout(() => {
        setShowAutoSolve(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [gameStartTime, isCompleted, showAutoSolve]);

  // Auto-solve function
  const handleAutoSolve = () => {
    const images = createImagePaths();
    const solvedPuzzle = images.map((image, index) => ({
      id: index,
      image: image,
      correctPosition: index,
    }));

    // Set the last piece as empty
    solvedPuzzle[15] = { id: 15, image: null, correctPosition: 15 };

    setPuzzle(solvedPuzzle);
    setEmptyIndex(15);
    setIsCompleted(true);
    setShowAutoSolve(false);
    success("🐨 Puzzle solved automatically!");
    setTimeout(() => onNext(), 2000);
  };

  if (showIntro) {
    return (
      <GameIntro
        title={GAME_DESCRIPTIONS.PUZZLE_BOX.title}
        description={GAME_DESCRIPTIONS.PUZZLE_BOX.description}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Puzzle Box</h2>
      <p className="mb-6">Slide the pieces to complete the puzzle!</p>

      {/* Preview Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowPreview(true)}
          className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition mb-4"
        >
          👁️ Preview Solution
        </button>

        {/* Auto-solve Button */}
        {showAutoSolve && (
          <div className="mt-4">
            <button
              onClick={handleAutoSolve}
              className="bg-sunset text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              ⚡ Auto-Solve Puzzle
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-4 gap-1 bg-gray-800 p-2 rounded-lg">
          {puzzle.map((piece, index) => (
            <div
              key={piece.id}
              className={`w-16 h-16 border border-gray-600 rounded cursor-pointer transition-all duration-200 ${
                piece.image ? "hover:scale-105 hover:shadow-lg" : "bg-gray-700"
              }`}
              onClick={() => handlePieceClick(index)}
            >
              {piece.image && (
                <img
                  src={piece.image}
                  alt={`Puzzle piece ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {isCompleted && (
        <div className="text-green-400 font-bold text-lg">
          🎉 Puzzle Completed! 🎉
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-darkPanel border border-darkBorder rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cream">
                Puzzle Solution Preview
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="/media/sample.jpg"
                alt="Puzzle solution"
                className="max-w-full max-h-96 object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-cream text-darkBg font-semibold px-6 py-2 rounded-lg hover:bg-peach transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleBoxMinigame;

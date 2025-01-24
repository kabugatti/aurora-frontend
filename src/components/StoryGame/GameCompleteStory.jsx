import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";

const GameCompleteStory = ({
  storyText,
  wordOptions,
  correctAnswers,
  onGoBack,
  onRestart,
  onComplete,
}) => {
  const [answers, setAnswers] = useState(Array(correctAnswers.length).fill(""));
  const [score, setScore] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleDrop = (index, word) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = word;
      return newAnswers;
    });
  };

  useEffect(() => {
    if (answers.every((answer) => answer !== "")) {
      const calculatedScore = answers.filter(
        (answer, index) => answer === correctAnswers[index]
      ).length;
      setScore(calculatedScore);
      setCompleted(true);
      if (onComplete) onComplete(calculatedScore);
    }
  }, [answers, correctAnswers, onComplete]);

  const restartGame = () => {
    setAnswers(Array(correctAnswers.length).fill(""));
    setScore(null);
    setCompleted(false);
    if (onRestart) onRestart();
  };

  const renderStoryText = () => {
    const parts = storyText.split(/({\d+})/g);
    return parts.map((part, index) => {
      if (part.match(/{\d+}/)) {
        const placeholderIndex = parseInt(part.replace(/[{}]/g, ""), 10);
        return (
          <DropZone
            key={index}
            index={placeholderIndex}
            word={answers[placeholderIndex]}
            onDrop={handleDrop}
          />
        );
      }
      return <span key={index} className="text-lg">{part} </span>;
    });
  };

  const isWordUsed = (word) => answers.includes(word);

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 rounded-lg shadow-lg">
        <AiFillTrophy className="text-yellow-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">Story Completed!</h2>
        <p className="text-lg text-gray-700">Your Score: {score}/{correctAnswers.length}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 transform transition-transform active:scale-95"
          onClick={restartGame}
        >
          <FaSyncAlt /> Play Again
        </button>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative p-6 bg-white min-h-screen flex flex-col items-center rounded-lg shadow-lg">
        <button
          className="absolute top-4 left-4 text-blue-500 hover:text-blue-700"
          onClick={onGoBack}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold mb-4">Complete the Story</h2>
        <p className="text-gray-600 mb-6">Drag and drop the words to complete the story</p>
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6 w-full max-w-2xl text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {renderStoryText()}
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-wrap gap-4">
            {wordOptions.map((word, index) => (
              <DraggableWord key={index} word={word} disabled={isWordUsed(word)} />
            ))}
          </div>
          <button
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-transform transform active:scale-95"
            onClick={restartGame}
          >
            <FaSyncAlt className="text-xl" />
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

const DraggableWord = ({ word, disabled }) => {
  const [, drag] = useDrag(() => ({
    type: "word",
    item: { word },
    canDrag: !disabled,
  }));
  return (
    <div
      ref={!disabled ? drag : null}
      className={`px-4 py-2 rounded shadow-md w-24 text-center ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
      }`}
    >
      {word}
    </div>
  );
};

const DropZone = ({ index, word, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "word",
    drop: (item) => onDrop(index, item.word),
  }));
  return (
    <div
      ref={drop}
      className="px-4 py-2 border-2 border-dashed border-gray-300 rounded text-center min-w-[100px] h-10 flex items-center justify-center bg-white"
    >
      {word || "________"}
    </div>
  );
};

export default GameCompleteStory;

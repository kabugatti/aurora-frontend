import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import "./GameCompleteStory.css";

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
      return <span key={index}>{part} </span>;
    });
  };

  if (completed) {
    return (
      <div className="game-completed">
        <AiFillTrophy className="trophy-icon" />
        <h2>Story Completed!</h2>
        <p>Your Score: {score}/{correctAnswers.length}</p>
        <button className="play-again-button" onClick={restartGame}>
          <FaSyncAlt className="button-icon" />
          Play Again
        </button>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-complete-story">
        <button className="go-back-icon" onClick={onGoBack}>
          <FaArrowLeft />
        </button>
        <h2 className="title">Complete the Story</h2>
        <p className="subtitle">Drag and drop the words to complete the story</p>
        <div className="story-text">{renderStoryText()}</div>
        <div className="word-options">
          {wordOptions.map((word, index) => (
            <DraggableWord key={index} word={word} />
          ))}
        </div>
        <button className="restart-icon" onClick={restartGame}>
          <FaSyncAlt />
        </button>
      </div>
    </DndProvider>
  );
};

const DraggableWord = ({ word }) => {
  const [, drag] = useDrag(() => ({
    type: "word",
    item: { word },
  }));
  return (
    <div ref={drag} className="draggable-word">
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
    <div ref={drop} className="drop-zone">
      {word || "________"}
    </div>
  );
};

export default GameCompleteStory;

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, RefreshCw, Home } from "lucide-react";

const questions = [
  {
    question: "What is the past tense of 'go'?",
    options: ["goed", "gone", "going", "went"],
    answer: "went",
  },
  {
    question: "Which word is a noun?",
    options: ["run", "happy", "house", "quickly"],
    answer: "house",
  },
  {
    question: "What is the plural of 'child'?",
    options: ["childs", "childes", "children", "childern"],
    answer: "children",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      if (option === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-xl mt-2">
            Score: {Math.round((score / questions.length) * 100)}%
          </p>
          <button
            onClick={handleRestart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <Home />
            Try Again
          </button>
          <Link
            href="/"
            className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            <RefreshCw />
            Return Home
          </Link>
        </div>
      ) : (
        <div>
          <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <h2 className="text-xl font-bold mb-4">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`block w-full text-left px-4 py-2 mb-2 border rounded-lg ${
                selectedAnswer
                  ? option === questions[currentQuestion].answer
                    ? "bg-green-200 border-green-500"
                    : option === selectedAnswer
                    ? "bg-red-200 border-red-500"
                    : "bg-gray-100"
                  : "hover:bg-blue-100"
              }`}
              disabled={!!selectedAnswer}
            >
              {option}{" "}
              {selectedAnswer &&
                option === questions[currentQuestion].answer && (
                  <CheckCircle className="inline-block ml-2 text-green-600" />
                )}
              {selectedAnswer &&
                option === selectedAnswer &&
                option !== questions[currentQuestion].answer && (
                  <XCircle className="inline-block ml-2 text-red-600" />
                )}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={!selectedAnswer}
          >
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "Show Results"}
          </button>
        </div>
      )}
    </div>
  );
}

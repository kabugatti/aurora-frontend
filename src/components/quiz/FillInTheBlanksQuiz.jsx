import { useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Home, HelpCircle } from "lucide-react";

// Mock data for the fill in the blanks quiz
const mockQuestions = [
  {
    id: 1,
    question: "The capital of France is _____.",
    answer: "Paris",
    hint: "This city is known as the City of Light",
  },
  {
    id: 2,
    question: "Water boils at _____ degrees Celsius at sea level.",
    answer: "100",
    hint: "It's a round number, think about the metric system",
  },
  {
    id: 3,
    question: "The largest planet in our solar system is _____.",
    answer: "Jupiter",
    hint: "Named after the king of Roman gods",
  },
  {
    id: 4,
    question: "The chemical symbol for gold is _____.",
    answer: "Au",
    hint: "Comes from the Latin word 'aurum'",
  },
  {
    id: 5,
    question: "Shakespeare wrote 'Romeo and _____'.",
    answer: "Juliet",
    hint: "A tragic love story between two feuding families",
  },
  {
    id: 6,
    question: "The Great Wall of _____ is visible from space.",
    answer: "China",
    hint: "Located in Asia's largest country by population",
  },
  {
    id: 7,
    question: "The speed of light is approximately 300,000 kilometers per _____.",
    answer: "second",
    hint: "A basic unit of time",
  },
  {
    id: 8,
    question: "The human body has _____ pairs of chromosomes.",
    answer: "23",
    hint: "It's between 20 and 25",
  },
  {
    id: 9,
    question: "The process of plants converting sunlight to energy is called _____.",
    answer: "photosynthesis",
    hint: "Photo means light, and synthesis means putting together",
  },
  {
    id: 10,
    question: "The currency of Japan is the _____.",
    answer: "yen",
    hint: "A three-letter word that starts with 'y'",
  },
];

export default function FillInTheBlanksQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (!isAnswered) {
      setIsAnswered(true);
      if (userAnswer.toLowerCase() === mockQuestions[currentQuestion].answer.toLowerCase()) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black">Quiz Completed!</h2>
          <p className="text-3xl mt-4 font-bold text-[#4184F3]">
            Score: {Math.round((score / mockQuestions.length) * 100)}%
          </p>
          <p className="text-gray-500 text-xl mt-2">
            You got {score} out of {mockQuestions.length} questions right.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleRestart}
              className="py-2 px-6 bg-blue-500 flex items-center text-white rounded-lg hover:bg-blue-600"
            >
              <RefreshCw className="mr-2" />
              Try Again
            </button>
            <Link
              to="/"
              className="py-2 px-6 bg-gray-500 flex items-center text-white rounded-lg hover:bg-gray-600"
            >
              <Home className="mr-2" />
              Return Home
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${((currentQuestion) / mockQuestions.length) * 100}%`,
              }}
            ></div>
          </div>

          <h2 className="text-xl font-bold mb-6 text-black flex justify-between items-center">
            <span>Question {currentQuestion + 1}</span>
            <span className="text-blue-500">
              {currentQuestion + 1}/{mockQuestions.length}
            </span>
          </h2>

          <div className="mb-6">
            <p className="text-lg text-black mb-4">{mockQuestions[currentQuestion].question}</p>
            <div className="flex gap-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isAnswered}
                placeholder="Type your answer here..."
                className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showHint && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
              <p className="font-medium">Hint: {mockQuestions[currentQuestion].hint}</p>
            </div>
          )}

          {isAnswered && (
            <div className={`mb-4 p-3 rounded-lg ${
              userAnswer.toLowerCase() === mockQuestions[currentQuestion].answer.toLowerCase()
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
              <p className="font-medium">
                {userAnswer.toLowerCase() === mockQuestions[currentQuestion].answer.toLowerCase()
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${mockQuestions[currentQuestion].answer}`}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            {!isAnswered && (
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Answer
              </button>
            )}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {currentQuestion < mockQuestions.length - 1 ? "Next Question" : "Show Results"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
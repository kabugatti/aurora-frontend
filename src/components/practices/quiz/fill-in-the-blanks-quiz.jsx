import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Home, HelpCircle } from "lucide-react";
import { questionsApi } from "@/services/questionsApi";

export default function FillInTheBlanksQuiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showHints, setShowHints] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsApi.getAllQuestions({ type: "fill-in-blanks" });
        setQuestions(response.data);
        setAnswers(response.data.map(() => ""));
        setShowHints(response.data.map(() => false));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const toggleHint = (index) => {
    const newShowHints = [...showHints];
    newShowHints[index] = !newShowHints[index];
    setShowHints(newShowHints);
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      const correctAnswers = answers.reduce((count, answer, index) => {
        return count + (answer.toLowerCase() === questions[index].content.correctAnswer.toLowerCase() ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setIsSubmitted(true);
    }
  };

  const handleRestart = () => {
    setAnswers(questions.map(() => ""));
    setShowHints(questions.map(() => false));
    setIsSubmitted(false);
    setScore(0);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
              <button onClick={() => toggleHint(index)} className="px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1" />
                Hint
              </button>
            </div>

            <p className="text-gray-700 mb-3">{question.content.sentence}</p>

            {showHints[index] && (
              <div className="mb-3 p-2 bg-amber-50 text-amber-800 rounded-lg">
                <p className="text-sm">{question.content.hint}</p>
              </div>
            )}

            <div className="flex gap-4">
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                disabled={isSubmitted}
                placeholder="Type your answer here..."
                className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            {isSubmitted && (
              <div
                className={`mt-2 p-2 rounded-lg ${
                  answers[index].toLowerCase() === question.content.correctAnswer.toLowerCase()
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <p className="text-sm">
                  {answers[index].toLowerCase() === question.content.correctAnswer.toLowerCase()
                    ? "Correct!"
                    : `Incorrect. The correct answer is: ${question.content.correctAnswer}`}
                </p>
                <p className="text-sm mt-1">{question.content.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
            <p
              className={`text-3xl font-bold mb-4 ${
                score === questions.length
                  ? "text-emerald-600" // 100%
                  : score >= questions.length * 0.8
                  ? "text-green-600" // 80-99%
                  : score >= questions.length * 0.6
                  ? "text-amber-600" // 60-79%
                  : score >= questions.length * 0.4
                  ? "text-orange-600" // 40-59%
                  : "text-red-600" // Below 40%
              }`}
            >
              Score: {Math.round((score / questions.length) * 100)}%
            </p>
            <p className="text-gray-500 text-xl mb-6">
              You got {score} out of {questions.length} questions right.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={handleRestart} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
              <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          <button onClick={handleSubmit} className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit Answers
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CheckCircle, XCircle, Info, ArrowLeft, Home } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const IdiomChallenge = () => {
  // State variables to manage the current question, selected answer, progress, and results
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracks the selected answer index
  const [isCorrect, setIsCorrect] = useState(null); // Tracks if the selected answer is correct
  const [progress, setProgress] = useState(0); // Tracks progress as a percentage
  const [correctAnswers, setCorrectAnswers] = useState(0); // Tracks the number of correct answers

  // List of questions for the quiz
    const questions = [
        // Each question includes the idiom, context sentence, options, correct answer, explanation, and tips
        {
        idiom: "Break a leg",
        sentence: `"My daughter has her first piano recital tonight. I told her to break a leg!"`,
        options: [
            "A wish for bad luck",
            "A wish for good luck",
            "A warning about injury",
            "A dancing instruction",
        ],
        correct: 1, // Correct answer index
        explanation:
            "This idiom is used to wish someone good luck, especially before a performance. It comes from theater superstition where wishing good luck was thought to bring bad luck, so people said the opposite instead.",
        tips: [
            "Commonly used in performing arts",
            "Never meant literally",
            "Shows support and encouragement",
        ],
        },
        {
        idiom: "Hit the sack",
        sentence: `"I'm exhausted. It's time for me to hit the sack."`,
        options: [
            "To go to bed",
            "To work hard",
            "To get angry",
            "To start a fight",
        ],
        correct: 0,
        explanation:
            "This idiom means to go to bed or sleep. It originates from soldiers who used to fill sacks with hay to create makeshift beds.",
        tips: ["Commonly used to express tiredness", "Informal context"],
        },
        {
        idiom: "Spill the beans",
        sentence: `"He accidentally spilled the beans about the surprise party."`,
        options: [
            "To ruin a dish",
            "To share a secret",
            "To create a mess",
            "To apologize",
        ],
        correct: 1,
        explanation:
            "This idiom means to reveal a secret or confidential information. It is thought to originate from ancient voting practices using beans.",
        tips: ["Used in informal settings", "Associated with secrets"],
        },
        {
        idiom: "Cost an arm and a leg",
        sentence: `"That luxury car costs an arm and a leg."`,
        options: [
            "To be very cheap",
            "To be extremely expensive",
            "To require a lot of effort",
            "To cause injury",
        ],
        correct: 1,
        explanation:
            "This idiom means something is very expensive. It emphasizes the high cost by metaphorically suggesting the loss of limbs.",
        tips: ["Commonly used for high prices", "Informal context"],
        },
        {
        idiom: "Piece of cake",
        sentence: `"The math test was a piece of cake!"`,
        options: [
            "Very difficult",
            "Extremely easy",
            "Something tasty",
            "Something confusing",
        ],
        correct: 1,
        explanation:
            "This idiom means something is very easy to accomplish. It likely originated from cakewalk contests, where winning was easy.",
        tips: ["Used to describe easy tasks", "Casual and informal"],
        },
    ];

    // Function to handle answer selection
    const handleAnswer = (index) => {
        const isAnswerCorrect = index === questions[currentQuestion].correct; // Check if the selected answer is correct
        setSelectedAnswer(index); // Update the selected answer
        setIsCorrect(isAnswerCorrect); // Update the correctness state

        if (isAnswerCorrect) {
        setCorrectAnswers(correctAnswers + 1); // Increment correct answers count if the answer is correct
        }
        setProgress(((currentQuestion + 1) / questions.length) * 100); // Update the progress bar
    };

    // Function to proceed to the next question
    const handleNext = () => {
        setSelectedAnswer(null); // Reset the selected answer
        setIsCorrect(null); // Reset the correctness state
        setCurrentQuestion(currentQuestion + 1); // Move to the next question
    };

    // Function to reset the quiz
    const handleReset = () => {
        setCurrentQuestion(0); // Reset the question index
        setSelectedAnswer(null); // Reset the selected answer
        setIsCorrect(null); // Reset the correctness state
        setProgress(0); // Reset the progress bar
        setCorrectAnswers(0); // Reset the correct answers count
    };

    // Function to calculate the final score as a percentage
    const calculateScore = () => {
        return Math.round((correctAnswers / questions.length) * 100); // Calculate percentage
    };

    const question = questions[currentQuestion]; // Get the current question data

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
        {/* Check if the user has completed all questions */}
        {selectedAnswer !== null && currentQuestion === questions.length - 1 ? (
            <div className="text-center space-y-12">
            <h1 className="text-4xl font-bold text-gray-900">Challenge Complete!</h1>
            <p className="text-6xl font-bold text-red-500">{calculateScore()}%</p>
            <p className="text-xl text-gray-700">
                You got <span className="font-bold">{correctAnswers}</span> out of{" "}
                <span className="font-bold">{questions.length}</span> idioms correct!
            </p>
            {/* Buttons to reset the quiz or return to the main menu */}
            <div className="flex justify-between mt-16">
                <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition"
                >
                <ArrowLeft className="w-5 h-5" />
                Back
                </button>
                <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-[#1E293B] rounded-md shadow-sm transition"
                style={{ border: "none", color: "white" }}
                >
                <Home className="w-5 h-5" />
                Main Menu
                </Link>
            </div>
            </div>
        ) : (
            <>
            {/* Display the current question number */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Idiom Challenge</h1>
                <span className="text-gray-500 text-sm">
                {currentQuestion + 1} of {questions.length}
                </span>
            </div>

            {/* Render the progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Display the current question and its context */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
                <h2 className="text-2xl font-bold text-gray-950 mb-4">{question.idiom}</h2>
                <p className="text-base text-gray-600">{question.sentence}</p>
            </div>

            {/* Render the answer options */}
            <div className="space-y-3">
                {question.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(index)} // Handle answer selection
                    className={`w-full py-3 px-4 text-sm text-left rounded-lg shadow-sm transition ${
                    selectedAnswer !== null
                        ? index === question.correct
                        ? "bg-green-50 text-gray-400"
                        : index === selectedAnswer
                        ? "bg-red-50 text-gray-400"
                        : "bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-gray-100"
                    } flex items-center gap-3`}
                    disabled={selectedAnswer !== null} // Disable buttons if an answer is selected
                    style={{
                    border: "none",
                    cursor: selectedAnswer !== null ? "default" : "pointer",
                    }}
                >
                    {/* Display icons for correct/incorrect answers */}
                    {selectedAnswer !== null &&
                    (index === question.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : index === selectedAnswer ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                    ) : (
                        <span className="w-5 h-5"></span>
                    ))}
                    {option}
                </button>
                ))}
            </div>

            {/* Display explanation and tips if an answer is selected */}
            {selectedAnswer !== null && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-xl font-bold text-black">Explanation:</h3>
                </div>
                <p className="pl-7 text-sm text-gray-950 mb-4">{question.explanation}</p>
                <h3 className="text-xl font-bold text-black mb-2">Usage Tips:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {question.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                    ))}
                </ul>
                </div>
            )}

            {/* Render the "Next" button if more questions are available */}
            {selectedAnswer !== null && currentQuestion < questions.length - 1 && (
                <div className="flex justify-end mt-4">
                <button
                    onClick={handleNext} // Move to the next question
                    className="py-2 px-6 bg-[#1E293B] text-white rounded-md text-lg font-semibold hover:bg-[#111827] transition"
                    style={{ border: "none" }}
                >
                    Next →
                </button>
                </div>
            )}
            </>
        )}
        </div>
    );
};

export default IdiomChallenge; 

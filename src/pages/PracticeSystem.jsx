import TopHeaders from "../components/practice/TopHeaders";
import QuestionsSection from "../components/practice/QuestionsSection";
import { web3Questions } from "../qestion";
import { useState } from "react";
const PracticeSystem = () => {
  
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false); 

  const handleNextQuestion = () => {
    if (currentQuestion < web3Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      
      setIsQuizFinished(true);
    }
  };

  const handleBackQuestion=()=>{
    if(currentQuestion > 0){
        setCurrentQuestion(currentQuestion -1)
    }
  }
  return (
    <div className="md:w-[1200px] mx-auto px-4">
      <TopHeaders />
      {isQuizFinished ? (
        // Display congratulatory message when the quiz is finished
        <div className="text-center py-10 w-full mt-28">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Congratulations! 🎉
          </h2>
          <p className="text-xl text-gray-700">
            You have successfully finished your quiz.
          </p>
        </div>
      ): <QuestionsSection question={web3Questions[currentQuestion]} />}
     
      {!isQuizFinished && <div className="mt-5 flex items-center justify-between w-full">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBackQuestion}
          className="text-white bg-gradient-to-br from-blue-700 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back
        </button>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
              {web3Questions.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentQuestion
                      ? "bg-blue-500" 
                      : "bg-gray-300" 
                  }`}
                ></span>
              ))}
            </div>
        {/* Next button */}
        <button
          type="button"
          onClick={handleNextQuestion}
          className="text-white bg-gradient-to-br from-blue-700 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Next
        </button>
      </div>}
    </div>
  );
};

export default PracticeSystem;

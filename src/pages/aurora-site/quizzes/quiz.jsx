import { useState, useEffect } from "react";
import QuizComp from "@/components/practices/quiz/quiz";
import { questionsApi } from "@/services/questionsApi";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsApi.getAllQuestions({ type: "multiple-choice" });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <>
      <QuizComp questions={questions} />
    </>
  );
}

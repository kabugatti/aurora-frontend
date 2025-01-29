import QuizComp from "../components/quiz/quiz";

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
  return (
    <>
      <QuizComp questions={questions} />
    </>
  );
}

import QuizComp from "../components/quiz/quiz";

const questions = [
  {
    question: "What is the past tense of 'go'?",
    options: ["goed", "gone", "going", "went"],
    answer: "went",
    feedback: "The past tense of 'go' is 'went'. It's an irregular verb.",
  },
  {
    question: "Which word is a noun?",
    options: ["run", "happy", "house", "quickly"],
    answer: "house",
    feedback: "'House' is a noun - it's a person, place, or thing.",
  },
  {
    question: "What is the plural of 'child'?",
    options: ["childs", "childes", "children", "childern"],
    answer: "children",
    feedback: "'Children' is an irregular plural form of 'child'.",
  },
];

export default function Quiz() {
  return (
    <>
      <QuizComp questions={questions} />
    </>
  );
}

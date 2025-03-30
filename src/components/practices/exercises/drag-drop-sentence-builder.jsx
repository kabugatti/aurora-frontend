import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout/ui/card";
import { Button } from "@/components/layout/ui/button";
import { Progress } from "@/components/layout/ui/progress";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { questionsApi } from "@/services/questionsApi";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const DraggableWord = ({ word, id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { word, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`px-4 py-2 m-1 border rounded bg-white cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {word}
    </div>
  );
};

DraggableWord.propTypes = {
  word: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const DropZone = ({ sentence, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div
      ref={drop}
      className={`w-full min-h-16 border-2 border-dashed rounded flex flex-wrap items-center p-4 ${
        isOver ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
    >
      {sentence.map(({ word, id }) => (
        <div key={id} className="px-4 py-2 m-1 border rounded bg-gray-200 cursor-pointer" onClick={() => onRemove(id)}>
          {word}
        </div>
      ))}
      {sentence.length === 0 && <span className="text-gray-400">Drop words here to build your sentence</span>}
    </div>
  );
};

DropZone.propTypes = {
  sentence: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDrop: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const DragDropSentenceBuilder = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentence, setSentence] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCheckEnabled, setIsCheckEnabled] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultsDisplayed, setResultsDisplayed] = useState(false);
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsApi.getAllQuestions({ type: "sentence-builder" });
        setQuestions(response.data);
        if (response.data.length > 0) {
          const words = response.data[0].content.words.map((word) => ({ id: uuidv4(), word }));
          setAvailableWords(shuffleArray([...words]));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    setSentence([]);
    if (questions[currentIndex]) {
      const words = questions[currentIndex].content.words.map((word) => ({ id: uuidv4(), word }));
      setAvailableWords(shuffleArray([...words]));
    }
    setFeedback(null);
    setShowNext(false);
    setIsResetDisabled(false);
  }, [currentIndex, questions]);

  useEffect(() => {
    if (questions[currentIndex]) {
      setIsCheckEnabled(sentence.length === questions[currentIndex].content.words.length);
    }
  }, [sentence, currentIndex, questions]);

  const handleDrop = ({ word, id }) => {
    setSentence((prev) => {
      if (!prev.some((w) => w.id === id) && availableWords.some((w) => w.id === id)) {
        const newSentence = [...prev, { word, id }];
        setAvailableWords((prevWords) => prevWords.filter((w) => w.id !== id));
        return newSentence;
      }
      return prev;
    });
  };

  const handleRemove = (id) => {
    setSentence((prev) => prev.filter((w) => w.id !== id));
    setAvailableWords((prev) => {
      const wordToReturn = questions[currentIndex].content.words.find((w) => w === sentence.find((s) => s.id === id)?.word);
      return wordToReturn ? [...prev, { id: uuidv4(), word: wordToReturn }] : prev;
    });
    setFeedback(null);
    setShowNext(false);
  };

  const checkAnswer = () => {
    const userSentence = sentence.map((w) => w.word).join(" ");
    const correctSentence = questions[currentIndex].content.sentence;
    if (userSentence === correctSentence) {
      setFeedback({ correct: true, message: questions[currentIndex].content.explanation });
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setFeedback({ correct: false, message: "Incorrect. Try again!" });
    }
    setProgress(((currentIndex + 1) / questions.length) * 100);
    if (currentIndex === questions.length - 1) {
      setShowResults(true);
    } else {
      setShowNext(true);
    }
    setIsResetDisabled(true);
  };

  const nextSentence = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsResetDisabled(false);
    }
  };

  const resetExercise = () => {
    setSentence([]);
    if (questions[currentIndex]) {
      const words = questions[currentIndex].content.words.map((word) => ({ id: uuidv4(), word }));
      setAvailableWords(shuffleArray([...words]));
    }
    setFeedback(null);
    setShowNext(false);
    setShowResults(false);
    setResultsDisplayed(false);
  };

  const handleShowResults = () => {
    setResultsDisplayed(true);
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions available</div>;
  }

  if (resultsDisplayed) {
    const percentage = (correctAnswers / questions.length) * 100;
    return (
      <DndProvider backend={HTML5Backend}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold">Exercise Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 text-center font-extrabold text-6xl">{`${percentage}%`}</p>
            <p className="mt-3 text-center">{`You got ${correctAnswers} out of ${questions.length} sentences correct!`}</p>
            <div className="mt-3 flex justify-between w-full">
              <Button variant="outline" onClick={() => setResultsDisplayed(false)}>
                Back
              </Button>
              <Button className="rounded-lg" onClick={() => navigate("/")}>
                Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </DndProvider>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-row justify-between mb-3">
            <CardTitle>Sentence Builder</CardTitle>
            <div className="text-sm text-gray-500">
              {currentIndex + 1} of {questions.length}
            </div>
          </div>
          <Progress value={progress} className="w-full h-2 bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium">Sentence Type: {questions[currentIndex].metadata.subCategory}</p>
            <p className="text-sm text-gray-600">Drag and drop the words to form a correct sentence.</p>
          </div>
          <DropZone sentence={sentence} onDrop={handleDrop} onRemove={handleRemove} />
          <div className="mt-6 flex flex-wrap p-4 bg-gray-50 rounded-lg">
            {availableWords.map(({ word, id }) => (
              <DraggableWord key={id} word={word} id={id} />
            ))}
          </div>
          {feedback && feedback.correct && (
            <div className="p-4 mt-4 border-l-4 border-green-500 bg-green-50 rounded-md text-green-700">
              <p className="font-semibold">✔ Grammar Explanation:</p>
              <p className="mt-2">{feedback.message}</p>
            </div>
          )}
          {feedback && !feedback.correct && (
            <div className="p-3 mt-4 border rounded-lg bg-red-50 border-red-200 text-red-600">
              <p>{feedback.message}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={resetExercise} disabled={isResetDisabled}>
              Reset
            </Button>
            <Button
              className="rounded-lg"
              disabled={!isCheckEnabled}
              onClick={showResults ? handleShowResults : showNext ? nextSentence : checkAnswer}
            >
              {showResults ? "Show Results" : showNext ? "Next" : "Check Answer"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  );
};

export default DragDropSentenceBuilder;

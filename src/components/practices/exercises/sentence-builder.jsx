import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout/ui/card";
import { Button } from "@/components/layout/ui/button";
import { Progress } from "@/components/layout/ui/progress";
import { questionsApi } from "@/services/questionsApi";

const DraggableWord = ({ word, index, type, onWordReturn }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "word",
    item: { word, index, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult && type === "sentence" && onWordReturn) {
        onWordReturn(word, index);
      }
    },
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`px-4 py-2 m-1 border rounded cursor-move 
        ${type === "available" ? "bg-gray-50" : "bg-white"}`}
    >
      {word}
    </div>
  );
};

DraggableWord.propTypes = {
  word: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onWordReturn: PropTypes.func,
};

const DropZone = ({ index, onDrop, word, onWordReturn }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDrop(item.word, item.index, item.type, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-24 h-12 m-1 border-2 border-dashed rounded flex items-center justify-center
        ${isOver ? "border-primary bg-primary/10" : "border-gray-300"}
        ${word ? "border-solid bg-white" : ""}`}
    >
      {word && <DraggableWord word={word} index={index} type="sentence" onWordReturn={onWordReturn} />}
      {!word && <span className="text-gray-400 text-sm">Drop word</span>}
    </div>
  );
};

DropZone.propTypes = {
  index: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  word: PropTypes.string,
  onWordReturn: PropTypes.func.isRequired,
};

const INITIAL_TIME = 120;

const SentenceBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentence, setSentence] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isCurrentSentenceCorrect, setIsCurrentSentenceCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [completedSentences, setCompletedSentences] = useState(new Set());
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionsApi.getAllQuestions({ type: "sentence-builder" });
        setQuestions(response.data);
        if (response.data.length > 0) {
          setSentence(Array(response.data[0].content.words.length).fill(""));
          setAvailableWords(response.data[0].content.words);
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
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, isTimerActive]);

  const checkIfSentenceIsCorrect = (newSentence) => {
    if (!questions[currentSentenceIndex]) return false;
    const userSentence = newSentence.filter(Boolean).join(" ");
    const correctSentence = questions[currentSentenceIndex].content.sentence;
    return userSentence.toLowerCase() === correctSentence.toLowerCase();
  };

  const resetForNewSentence = (sentenceIndex) => {
    if (!questions[sentenceIndex]) return;
    setSentence(Array(questions[sentenceIndex].content.words.length).fill(""));
    setAvailableWords(questions[sentenceIndex].content.words);
    setIsCurrentSentenceCorrect(false);
    setTimeLeft(INITIAL_TIME);
  };

  const handleDrop = (word, sourceIndex, sourceType, targetIndex) => {
    if (!questions[currentSentenceIndex]) return;

    let newSentence = [...sentence];

    if (sourceType === "available") {
      const replacedWord = newSentence[targetIndex];
      newSentence[targetIndex] = word;

      const newAvailableWords = questions[currentSentenceIndex].content.words.filter(
        (w) => (w !== word && !newSentence.includes(w)) || w === replacedWord
      );

      setAvailableWords(newAvailableWords);
    } else if (sourceType === "sentence") {
      const temp = newSentence[targetIndex];
      newSentence[targetIndex] = newSentence[sourceIndex];
      newSentence[sourceIndex] = temp;
    }

    setSentence(newSentence);

    const isCorrect = checkIfSentenceIsCorrect(newSentence);
    setIsCurrentSentenceCorrect(isCorrect);

    if (isCorrect && !completedSentences.has(currentSentenceIndex)) {
      const newCompletedSentences = new Set(completedSentences);
      newCompletedSentences.add(currentSentenceIndex);
      setCompletedSentences(newCompletedSentences);
      setProgress((newCompletedSentences.size / questions.length) * 100);
    }
  };

  const handleWordReturn = (word, index) => {
    const newSentence = [...sentence];
    newSentence[index] = "";
    setSentence(newSentence);

    const newAvailableWords = questions[currentSentenceIndex].content.words.filter((w) => !newSentence.includes(w) || w === word);

    setAvailableWords(newAvailableWords);
    setIsCurrentSentenceCorrect(false);
  };

  const handleReset = () => {
    resetForNewSentence(currentSentenceIndex);
  };

  const handleNextQuestion = () => {
    if (currentSentenceIndex < questions.length - 1 && isCurrentSentenceCorrect) {
      const nextIndex = currentSentenceIndex + 1;
      setCurrentSentenceIndex(nextIndex);
      resetForNewSentence(nextIndex);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions available</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sentence Builder</CardTitle>
          <div className="text-sm text-gray-500">
            Exercise {currentSentenceIndex + 1} of {questions.length}
          </div>
          <Progress value={progress} className="w-full h-2" />
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="mb-2 font-medium">Build your sentence here:</p>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg min-h-[80px]">
              {sentence.map((word, index) => (
                <DropZone key={index} index={index} onDrop={handleDrop} word={word} onWordReturn={handleWordReturn} />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg mb-2">Available words:</p>
            <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-lg">
              {availableWords.map((word, index) => (
                <DraggableWord key={`available-${word}-${index}`} word={word} index={index} type="available" />
              ))}
            </div>
          </div>

          {isCurrentSentenceCorrect && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-center font-medium">
                ¡Correct! Well done!
                {currentSentenceIndex < questions.length - 1 && " Click 'Next Question' to continue."}
              </p>
              <p className="text-sm mt-2">{questions[currentSentenceIndex].content.explanation}</p>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Progress: {progress}%</div>
              <div className="text-sm text-gray-600">Time Left: {formatTime(timeLeft)}</div>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center m-3">
          <Button
            className={`w-full rounded-lg ${isCurrentSentenceCorrect ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"} text-white transition-colors`}
            onClick={handleNextQuestion}
            disabled={!isCurrentSentenceCorrect || currentSentenceIndex === questions.length - 1}
          >
            {currentSentenceIndex === questions.length - 1 ? "Complete!" : "Next Question"}
          </Button>
        </div>
      </Card>
    </DndProvider>
  );
};

export default SentenceBuilder;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from 'uuid';

const SENTENCES_DATA = [
  {
    sentence: "She has been studying for hours",
    words: ["She", "has", "been", "studying", "for", "hours"].map(word => ({ id: uuidv4(), word })),
    explanation: "This sentence uses the present perfect continuous tense to describe an ongoing action.\n\n• Subject (She)\n• Auxiliary verbs (has been)\n• Main verb (studying)\n• Time expression (for hours)"
  },
  {
    sentence: "I have been working all day",
    words: ["I", "have", "been", "working", "all", "day"].map(word => ({ id: uuidv4(), word })),
    explanation: "This sentence uses the present perfect continuous tense.\n\n• Subject (I)\n• Auxiliary verbs (have been)\n• Main verb (working)\n• Time expression (all day)"
  },
  {
    sentence: "They have been living here since 2010",
    words: ["They", "have", "been", "living", "here", "since", "2010"].map(word => ({ id: uuidv4(), word })),
    explanation: "This sentence uses the present perfect continuous tense.\n\n• Subject (They)\n• Auxiliary verbs (have been)\n• Main verb (living)\n• Time expression (since 2010)"
  },
  {
    sentence: "We have been waiting for the bus",
    words: ["We", "have", "been", "waiting", "for", "the", "bus"].map(word => ({ id: uuidv4(), word })),
    explanation: "This sentence uses the present perfect continuous tense.\n\n• Subject (We)\n• Auxiliary verbs (have been)\n• Main verb (waiting)\n• Time expression (for the bus)"
  },
  {
    sentence: "He has been playing football for an hour",
    words: ["He", "has", "been", "playing", "football", "for", "an", "hour"].map(word => ({ id: uuidv4(), word })),
    explanation: "This sentence uses the present perfect continuous tense.\n\n• Subject (He)\n• Auxiliary verbs (has been)\n• Main verb (playing)\n• Time expression (for an hour)"
  }
];

const DraggableWord = ({ word, id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'word',
    item: { word, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`px-4 py-2 m-1 border rounded bg-white cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
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
    accept: 'word',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({ isOver: monitor.isOver() })
  });

  return (
    <div
      ref={drop}
      className={`w-full min-h-16 border-2 border-dashed rounded flex flex-wrap items-center p-4 ${isOver ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
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
  sentence: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  onDrop: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const DragDropSentenceBuilder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentence, setSentence] = useState([]);
  const [availableWords, setAvailableWords] = useState([...SENTENCES_DATA[0].words]);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCheckEnabled, setIsCheckEnabled] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setSentence([]);
    setAvailableWords([...SENTENCES_DATA[currentIndex].words]);
    setFeedback(null);
    setShowNext(false);
  }, [currentIndex]);

  useEffect(() => {
    setIsCheckEnabled(sentence.length === SENTENCES_DATA[currentIndex].words.length);
  }, [sentence, currentIndex]);

  const handleDrop = ({ word, id }) => {
    setSentence((prev) => {
      if (!prev.some(w => w.id === id) && availableWords.some(w => w.id === id)) {
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
      const wordToReturn = SENTENCES_DATA[currentIndex].words.find(w => w.id === id);
      return wordToReturn ? [...prev, wordToReturn] : prev;
    });
    setFeedback(null);
    setProgress(0);
    setShowNext(false);
  };

  const checkAnswer = () => {
    const userSentence = sentence.map(w => w.word).join(' ');
    const correctSentence = SENTENCES_DATA[currentIndex].sentence;
    if (userSentence === correctSentence) {
      setFeedback({ correct: true, message: SENTENCES_DATA[currentIndex].explanation });
      setProgress(((currentIndex + 1) / SENTENCES_DATA.length) * 100);
    } else {
      setFeedback({ correct: false, message: "Incorrect. Try again!" });
      setProgress(0);
    }
    setShowNext(true);
  };

  const nextSentence = () => {
    if (currentIndex < SENTENCES_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetExercise = () => {
    setSentence([]);
    setAvailableWords([...SENTENCES_DATA[currentIndex].words]);
    setFeedback(null);
    setProgress(0);
    setShowNext(false);
  };

  const handleShowResults = () => {
    // Handle the logic to show results
    console.log("Show Results");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sentence Builder</CardTitle>
          <Progress value={progress} className="w-full h-2  bg-gray-200" />
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium">Sentence Type: Present perfect continuous</p>
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
            <Button variant="outline" onClick={resetExercise}>Reset</Button>
            <Button className="rounded-lg" disabled={!isCheckEnabled} onClick={showNext ? (showResults ? handleShowResults : nextSentence) : checkAnswer}>
              {showNext ? (showResults ? 'Show Results' : 'Next') : 'Check Answer'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  );
};

export default DragDropSentenceBuilder;
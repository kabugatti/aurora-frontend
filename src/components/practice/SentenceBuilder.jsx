import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const DraggableWord = ({ word, index, type, onWordReturn }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'word',
    item: { word, index, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult && type === 'sentence' && onWordReturn) {
        onWordReturn(word, index);
      }
    },
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`px-4 py-2 m-1 border rounded cursor-move 
        ${type === 'available' ? 'bg-gray-50' : 'bg-white'}`}
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
    accept: 'word',
    drop: (item) => onDrop(item.word, item.index, item.type, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-24 h-12 m-1 border-2 border-dashed rounded flex items-center justify-center
        ${isOver ? 'border-primary bg-primary/10' : 'border-gray-300'}
        ${word ? 'border-solid bg-white' : ''}`}
    >
      {word && (
        <DraggableWord 
          word={word} 
          index={index} 
          type="sentence" 
          onWordReturn={onWordReturn}
        />
      )}
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

const SentenceBuilder = () => {
  const [sentence, setSentence] = useState(Array(7).fill(''));
  const [availableWords, setAvailableWords] = useState(['the', 'dog', 'chases', 'ball', 'in', 'park', 'the']);
  const [correctSentence] = useState("The dog chases the ball in the park");
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWordReturn = (word, index) => {
    setSentence(prev => {
      const newSentence = [...prev];
      newSentence[index] = '';
      setAvailableWords(prevWords => [...prevWords, word]);
      return newSentence;
    });
  };

  const handleDrop = (word, sourceIndex, sourceType, targetIndex) => {
    if (sourceType === 'available') {
      setAvailableWords(prev => {
        const newAvailable = [...prev];
        newAvailable.splice(sourceIndex, 1);
        return newAvailable;
      });
      
      setSentence(prev => {
        const newSentence = [...prev];
        if (newSentence[targetIndex]) {
          setAvailableWords(available => [...available, newSentence[targetIndex]]);
        }
        newSentence[targetIndex] = word;
        return newSentence;
      });
    } else if (sourceType === 'sentence') {
      setSentence(prev => {
        const newSentence = [...prev];
        const temp = newSentence[targetIndex];
        newSentence[targetIndex] = newSentence[sourceIndex];
        newSentence[sourceIndex] = temp;
        return newSentence;
      });
    }
  };

  const handleReset = () => {
    setSentence(Array(7).fill(''));
    setAvailableWords(['the', 'dog', 'chases', 'ball', 'in', 'park', 'the']);
    setProgress(0);
  };

  const checkAnswer = () => {
    const userSentence = sentence.filter(Boolean).join(' ').toLowerCase();
    const correct = correctSentence.toLowerCase();
    setProgress(userSentence === correct ? 100 : 50);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sentence Builder</CardTitle>
          <div className="text-sm text-gray-500">
            Exercise 5 of 10
          </div>
          <Progress value={50} className="w-full h-2" />
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg mb-2">Form a correct sentence using the following words:</p>
            <p className="text-gray-600 italic">&ldquo;{correctSentence}&rdquo;</p>
          </div>

          <div className="mb-6">
            <p className="mb-2 font-medium">Build your sentence here:</p>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg min-h-[80px]">
              {sentence.map((word, index) => (
                <DropZone 
                  key={index} 
                  index={index} 
                  onDrop={handleDrop}
                  word={word}
                  onWordReturn={handleWordReturn}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 font-medium">Available words:</p>
            <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-lg">
              {availableWords.map((word, index) => (
                <DraggableWord 
                  key={`available-${word}-${index}`}
                  word={word} 
                  index={index}
                  type="available"
                />
              ))}
              {availableWords.length === 0 && (
                <div className="w-full py-2 px-4 text-green-600 bg-green-50 rounded-lg border border-green-200">
                  Correct! Well done!
                </div>
              )}
            </div>
          </div>

          {progress > 0 && (
            <div className="mb-4">
              <Progress value={progress} className="w-full" />
              <p className={`mt-2 text-center ${progress === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                {progress === 100 ? 'Correct! Well done!' : 'Try again!'}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
              <Button className="bg-blue-600"onClick={checkAnswer}>Check Answer</Button>
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Score: {progress}%</div>
              <div className="text-sm text-gray-600">Time Remaining: {formatTime(timeLeft)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  );
};

export default SentenceBuilder;
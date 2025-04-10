import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff } from 'lucide-react';
import styles from './voice-input.module.css';

const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US'; // Changed to English

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (event.results[0].isFinal) {
          onTranscript(transcript);
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please try using a modern browser like Chrome.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className={styles.voiceInputContainer}>
      <button
        onClick={toggleListening}
        className={`${styles.voiceButton} ${isListening ? styles.recording : ''}`}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        title={isListening ? 'Click to stop recording' : 'Click to start recording'}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5 relative z-10" />
            <div className={styles.recordingIndicator}>
              <div className={styles.pulse}></div>
              <div className={styles.pulse} style={{ animationDelay: '1s' }}></div>
            </div>
          </>
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      {isListening && (
        <div className={styles.recordingLabel}>
          Recording...
        </div>
      )}
    </div>
  );
};

VoiceInput.propTypes = {
  onTranscript: PropTypes.func.isRequired,
};

export default VoiceInput; 
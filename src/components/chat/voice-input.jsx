import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff } from 'lucide-react';
import styles from './voice-input.module.css';

const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setInterimTranscript(interimTranscript);

        if (finalTranscript) {
          onTranscript(finalTranscript);
          setInterimTranscript('');
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimTranscript('');
        
        // Show user-friendly error messages
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          alert('No speech detected. Please try speaking again.');
        } else if (event.error === 'network') {
          alert('Network error occurred. Please check your connection and try again.');
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser. Please try using a modern browser like Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setIsListening(true);
        setInterimTranscript('');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert('Failed to start voice recording. Please try again.');
      }
    }
  };

  if (!isSupported) {
    return null; // Hide button if not supported
  }

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
      
      {/* Live transcription display */}
      {isListening && (
        <div className={styles.transcriptionContainer}>
          <div className={styles.recordingLabel}>
            Recording...
          </div>
          {interimTranscript && (
            <div className={styles.interimTranscript}>
              "{interimTranscript}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

VoiceInput.propTypes = {
  onTranscript: PropTypes.func.isRequired,
};

export default VoiceInput; 
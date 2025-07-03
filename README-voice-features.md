# Voice Features Implementation

## Overview

This document describes the implementation of voice-driven chat features in the AURORA AI language learning platform. The implementation includes both speech-to-text (STT) and text-to-speech (TTS) capabilities with seamless fallback to text-only mode.

## Architecture

### Components Structure

```
src/
├── components/chat/
│   ├── voice-input.jsx              # Speech-to-text component
│   ├── voice-input.module.css       # Voice input styles
│   ├── text-to-speech.jsx           # Text-to-speech component
│   ├── voice-settings.jsx           # Voice configuration modal
│   └── voice-status-indicator.jsx   # Browser support indicator
├── hooks/
│   └── use-speech-support.js        # Browser support detection hook
└── pages/aurora-site/aurora-chat/
    └── index.jsx                    # Main chat component (updated)
```

## Implementation Details

### 1. Speech-to-Text (VoiceInput Component)

**Features:**
- Real-time transcription display
- Browser support detection
- Error handling with user-friendly messages
- Visual feedback during recording
- Automatic message sending

**Key Implementation:**
```javascript
// Browser support detection
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// Live transcription
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
  }
};
```

### 2. Text-to-Speech (TextToSpeech Component)

**Features:**
- Play/pause functionality
- Customizable voice settings
- Automatic cleanup
- Browser support detection

**Key Implementation:**
```javascript
// Voice settings integration
const getVoiceSettings = () => {
  const saved = localStorage.getItem('voiceSettings');
  return saved ? JSON.parse(saved) : defaultSettings;
};

// Speech synthesis with settings
utteranceRef.current = new SpeechSynthesisUtterance(text);
const settings = getVoiceSettings();
utteranceRef.current.rate = settings.rate;
utteranceRef.current.pitch = settings.pitch;
utteranceRef.current.volume = settings.volume;
```

### 3. Voice Settings (VoiceSettings Component)

**Features:**
- Voice selection dropdown
- Speed, pitch, and volume controls
- Test functionality
- Persistent storage

**Key Implementation:**
```javascript
// Voice loading
const loadVoices = () => {
  const availableVoices = window.speechSynthesis.getVoices();
  const englishVoices = availableVoices.filter(voice => 
    voice.lang.startsWith('en')
  );
  setVoices(englishVoices);
};

// Settings persistence
const saveSettings = () => {
  const settings = { voice: selectedVoice, rate, pitch, volume };
  localStorage.setItem('voiceSettings', JSON.stringify(settings));
};
```

### 4. Browser Support Detection (useSpeechSupport Hook)

**Features:**
- Centralized support detection
- Real-time status updates
- Component visibility control

**Key Implementation:**
```javascript
const checkSupport = () => {
  const speechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const speechSynthesis = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  
  setSupport({
    speechRecognition,
    speechSynthesis,
    isSupported: speechRecognition || speechSynthesis
  });
};
```

## Browser Compatibility

### Supported Features by Browser

| Browser | Speech Recognition | Speech Synthesis | Notes |
|---------|-------------------|------------------|-------|
| Chrome | ✅ Full Support | ✅ Full Support | Recommended |
| Edge | ✅ Full Support | ✅ Full Support | Good support |
| Safari | ✅ Full Support | ✅ Full Support | Good support |
| Firefox | ⚠️ Limited | ✅ Full Support | Recognition may be limited |

### Fallback Strategy

1. **Feature Detection**: Components check for API support before rendering
2. **Graceful Degradation**: Unsupported features are hidden, not broken
3. **User Feedback**: Clear messages when features aren't available
4. **Alternative Modes**: Text-only mode remains fully functional

## Security Considerations

### Privacy Protection
- **No Server Storage**: Voice data never leaves the browser
- **Local Processing**: All speech recognition happens client-side
- **No Recording**: Audio is not recorded or stored
- **HTTPS Required**: Voice features only work on secure connections

### Permission Handling
- **Explicit Consent**: Users must grant microphone permission
- **Clear Feedback**: Visual indicators show permission status
- **Error Recovery**: Graceful handling of permission denials

## Performance Optimizations

### Memory Management
- **Cleanup on Unmount**: Speech synthesis is cancelled when components unmount
- **Single Instance**: Only one speech synthesis instance at a time
- **Event Cleanup**: Proper removal of event listeners

### User Experience
- **Loading States**: Visual feedback during voice processing
- **Error Recovery**: Automatic retry mechanisms
- **Responsive Design**: Voice controls adapt to screen size

## Testing Strategy

### Manual Testing Checklist
- [ ] Microphone permission flow
- [ ] Speech recognition accuracy
- [ ] Text-to-speech playback
- [ ] Voice settings persistence
- [ ] Browser compatibility
- [ ] Error handling scenarios
- [ ] Accessibility compliance

### Automated Testing
```javascript
// Example test for voice support detection
describe('useSpeechSupport', () => {
  it('should detect browser support correctly', () => {
    // Mock Web Speech API
    global.webkitSpeechRecognition = jest.fn();
    global.speechSynthesis = {};
    
    const { result } = renderHook(() => useSpeechSupport());
    
    expect(result.current.speechRecognition).toBe(true);
    expect(result.current.speechSynthesis).toBe(true);
  });
});
```

## Deployment Considerations

### Environment Requirements
- **HTTPS**: Voice features require secure connection
- **Modern Browser**: Web Speech API support
- **User Permissions**: Microphone access capability

### Monitoring
- **Error Tracking**: Monitor voice feature errors
- **Usage Analytics**: Track feature adoption
- **Performance Metrics**: Monitor voice processing times

## Future Enhancements

### Planned Features
1. **Multi-language Support**: Extend beyond English
2. **Voice Activity Detection**: Automatic recording start/stop
3. **Pronunciation Feedback**: Compare user speech to target
4. **Voice Commands**: Navigate app with voice
5. **Offline Processing**: Work without internet connection

### Technical Improvements
1. **WebAssembly Integration**: Faster speech processing
2. **Streaming Recognition**: Real-time processing
3. **Custom Voice Models**: Personalized AI voices
4. **Background Processing**: Non-blocking voice operations

## Troubleshooting Guide

### Common Issues

**Microphone Not Working**
```javascript
// Check permissions
navigator.permissions.query({ name: 'microphone' })
  .then(result => {
    if (result.state === 'denied') {
      // Show permission request UI
    }
  });
```

**Speech Synthesis Errors**
```javascript
// Handle synthesis errors
utterance.onerror = (event) => {
  console.error('Speech synthesis error:', event.error);
  // Show user-friendly error message
};
```

**Browser Compatibility**
```javascript
// Feature detection
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
  // Hide voice features
  return null;
}
```

## Contributing

### Development Guidelines
1. **Follow Existing Patterns**: Use established component structure
2. **Test Browser Compatibility**: Verify across major browsers
3. **Handle Errors Gracefully**: Provide fallbacks for failures
4. **Document Changes**: Update this README for new features

### Code Style
- Use kebab-case for file names
- Use @/ aliases for imports
- Follow existing CSS module patterns
- Include PropTypes for all components

---

*This implementation provides a robust foundation for voice-driven language learning while maintaining accessibility and performance.* 
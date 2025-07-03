# Voice Features Documentation

## Overview

The AURORA AI chat now supports voice-driven interactions with both speech-to-text (STT) and text-to-speech (TTS) capabilities. This enhances the language learning experience by allowing users to practice speaking and listening skills naturally.

## Features

### 🎤 Speech-to-Text (Voice Input)
- **Mic Button**: Located next to the text input field
- **Live Transcription**: See your speech transcribed in real-time
- **Automatic Sending**: Transcribed text is automatically sent when you finish speaking
- **Visual Feedback**: Recording indicator with pulsing animation

### 🔊 Text-to-Speech (Audio Playback)
- **Play Button**: Each AI message has a speaker icon
- **Customizable Voice**: Adjust speed, pitch, volume, and voice selection
- **Automatic Stop**: Previous audio stops when new audio starts

### ⚙️ Voice Settings
- **Access**: Click the "Voice Settings" button in the chat header
- **Customization**: Choose voice, speed, pitch, and volume
- **Test Feature**: Try your settings before saving
- **Persistent**: Settings are saved in your browser

## Browser Support

### Supported Browsers
- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Safari
- ✅ Firefox (limited support)

### Requirements
- **Microphone Access**: Must allow microphone permissions
- **HTTPS**: Voice features require secure connection
- **Modern Browser**: Web Speech API support

## How to Use

### Starting Voice Input
1. Click the microphone icon next to the text input
2. Allow microphone access when prompted
3. Speak clearly into your microphone
4. Watch the live transcription appear
5. Your message will be sent automatically when you finish speaking

### Playing AI Responses
1. Look for the speaker icon on AI messages
2. Click the icon to hear the message read aloud
3. Click again to stop playback
4. Only one message can play at a time

### Configuring Voice Settings
1. Click "Voice Settings" in the chat header
2. Choose your preferred voice from the dropdown
3. Adjust speed, pitch, and volume using the sliders
4. Click "Test Voice" to preview your settings
5. Click "Save" to apply your preferences

## Troubleshooting

### Microphone Not Working
- **Check Permissions**: Ensure microphone access is allowed
- **Browser Settings**: Check browser microphone settings
- **Hardware**: Verify microphone is connected and working
- **HTTPS**: Ensure you're on a secure connection

### Voice Playback Issues
- **Volume**: Check system and browser volume
- **Browser Support**: Try a different browser
- **Settings**: Verify voice settings are configured

### No Voice Features Available
- **Browser Update**: Update to the latest browser version
- **Alternative Browser**: Try Chrome or Edge
- **Fallback**: Use text-only mode if voice features aren't supported

## Technical Details

### Speech Recognition
- Uses Web Speech API (`webkitSpeechRecognition` or `SpeechRecognition`)
- Language: English (en-US)
- Continuous: False (single utterance mode)
- Interim Results: True (live transcription)

### Speech Synthesis
- Uses Web Speech API (`speechSynthesis`)
- Configurable parameters: voice, rate, pitch, volume
- Automatic cleanup on component unmount
- Error handling for unsupported features

### Settings Storage
- Voice preferences saved in `localStorage`
- Settings persist across browser sessions
- Fallback to defaults if settings are corrupted

## Accessibility

### Screen Readers
- All voice controls have proper ARIA labels
- Status indicators provide audio feedback
- Keyboard navigation supported

### Visual Indicators
- Clear icons for voice functions
- Color-coded status indicators
- Hover states for interactive elements

## Privacy & Security

### Data Handling
- **No Server Storage**: Voice data is not sent to servers
- **Local Processing**: Speech recognition happens in the browser
- **No Recording**: Audio is not recorded or stored

### Permissions
- **Microphone**: Required for speech-to-text
- **HTTPS**: Required for voice features to work
- **User Consent**: Explicit permission required

## Future Enhancements

### Planned Features
- Multiple language support
- Voice activity detection
- Pronunciation feedback
- Voice commands for navigation
- Offline voice processing

### Performance Optimizations
- Voice caching for common phrases
- Background voice processing
- Adaptive quality settings

## Support

If you encounter issues with voice features:

1. **Check Browser Compatibility**: Ensure you're using a supported browser
2. **Verify Permissions**: Confirm microphone access is granted
3. **Test in Incognito**: Try in private/incognito mode
4. **Contact Support**: Report issues with browser and OS details

---

*Voice features enhance the AURORA learning experience by making language practice more natural and interactive.* 
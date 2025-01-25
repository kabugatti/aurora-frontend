import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hello! How can I assist you today?' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages((prev) => [...prev, { sender: 'user', text: input }]);
            setInput('');

            // Simulate AI response
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { sender: 'ai', text: 'Let me look into that for you!' },
                ]);
            }, 1000);
        }
    };
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-6">
            <div className="max-w-3xl mx-auto flex flex-col flex-grow">
                <div className="flex items-center justify-center mb-6">
                    <MessageSquare className="w-8 h-8 text-blue-400" />
                    <h1 className="text-3xl font-bold ml-2">AI Assistant</h1>
                </div>

                <div className="flex-grow overflow-y-auto bg-gray-800 p-4 rounded-lg border border-gray-700">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'
                                }`}
                        >
                            <div
                                className={`max-w-xs p-3 rounded-lg text-sm ${message.sender === 'ai'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-100'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                    <Button
                        onClick={handleSend}
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                    >
                        <Send className="w-5 h-5" /> Send
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AIAssistant
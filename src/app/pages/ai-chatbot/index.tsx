/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, Mic, MicOff, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useBooking } from '../../../context/BookingContext';
import PaymentPage from '../payment-page/PaymentPage';
import ChatbotProcessor from '../utils/chatbotProcessor';
import SpeechRecognition from '../utils/speechRecognition';
import BookingForm from './BookingForm';
import TicketConfirmation from './TicketConformation';
import { Typography } from 'antd';
const{Title}=Typography

const ChatInterface = () => {
  const bookingContext = useBooking();
  const {
    messages,
    addMessage,
    isListening,
    isProcessing,
    setIsListening,
    setIsProcessing,
    bookingState,
  } = bookingContext;
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognition = new SpeechRecognition();
  const chatbotProcessor = new ChatbotProcessor();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };
    
    addMessage(userMessage);
    setInputText('');
    setIsProcessing(true);
    
    try {
      await chatbotProcessor.processMessage(userMessage.text, bookingContext);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const toggleListening = async () => {
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        const transcript = await speechRecognition.start();
        if (transcript) {
          setInputText(transcript);
          const userMessage = {
            id: Date.now().toString(),
            text: transcript,
            sender: 'user' as const,
            timestamp: new Date().toISOString(),
          };
          
          addMessage(userMessage);
          setIsProcessing(true);
          
          try {
            await chatbotProcessor.processMessage(transcript, bookingContext);
          } finally {
            setIsProcessing(false);
          }
        }
      } catch (error) {
        console.error('Speech recognition error:', error);
      } finally {
        setIsListening(false);
      }
    }
  };
  
  const renderCurrentStage = () => {
    if (bookingState.bookingComplete) {
      return <TicketConfirmation />;
    }
    
    if (bookingState.fromStation && bookingState.toStation) {
      if (bookingState.date) {
        return <PaymentPage />;
      }
      return <BookingForm />;
    }
    
    return null;
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-13rem)]">
      <div className="flex-1 flex flex-col border rounded-lg shadow-sm overflow-hidden bg-white">
        <div className="p-4 bg-blue-50 border-b">
          <h2 className="text-lg font-medium text-blue-800">Chat with RailBot</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {messages.map((message:any) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <Title level={5}>{message.text}</Title>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t bg-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
              disabled={isProcessing}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isListening || isProcessing}
            />
            
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={inputText.trim() === '' || isListening || isProcessing}
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col">
        {renderCurrentStage()}
      </div>
    </div>
  );
};

export default ChatInterface;
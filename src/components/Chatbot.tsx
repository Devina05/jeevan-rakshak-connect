
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useChatbot } from "@/contexts/ChatbotContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';

const Chatbot = () => {
  const { t } = useLanguage();
  const { messages, isChatOpen, addMessage, toggleChat } = useChatbot();
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current && isChatOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen, isMinimized]);

  // Toggle chat minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Handle input form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input, 'user');
      setInput('');
    }
  };

  // If chat is not open, show only the trigger button
  if (!isChatOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary-foreground hover:text-primary flex items-center justify-center z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`chatbot-container transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
      <div className="chatbot-header">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>{t('appName')} {t('chatWithUs')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={toggleMinimize}>
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={toggleChat}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${
                  message.sender === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot'
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="chatbot-input">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chatbotPrompt')}
              className="flex-grow border-0 focus-visible:ring-0"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Send className="h-5 w-5 text-primary" />
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;

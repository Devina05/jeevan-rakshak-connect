
import React, { useState } from "react";
import { Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOffline } from "@/contexts/OfflineContext";

interface SearchBarProps {
  onSearchSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const { t, language } = useLanguage();
  const { isOffline } = useOffline();
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Voice recognition setup
  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      // Create a new SpeechRecognition instance
      const recognition = new SpeechRecognitionAPI();
      
      recognition.lang = language === 'en' ? 'en-US' : 
                         language === 'hi' ? 'hi-IN' : 
                         language === 'ta' ? 'ta-IN' : 'bn-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      console.log('Speech recognition not supported');
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className="py-2">
      <form onSubmit={handleSearchSubmit} className="flex w-full max-w-sm items-center space-x-2 mx-auto">
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
          disabled={isOffline}
        />
        <Button 
          type="button" 
          size="icon" 
          variant={isListening ? "destructive" : "outline"}
          className={isListening ? "voice-btn-pulse" : ""}
          onClick={startListening}
          disabled={isOffline}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button type="submit" disabled={isOffline}>
          <Search className="h-4 w-4 mr-2" />
          {t('searchPlaceholder')}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;

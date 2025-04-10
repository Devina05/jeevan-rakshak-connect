
import React, { useState, useEffect } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlarmClock, 
  Stethoscope, 
  Phone, 
  FirstAid, 
  Shield, 
  FileText, 
  Search, 
  Mic, 
  Languages, 
  User,
  Menu,
  X
} from "lucide-react";
import { useOffline } from "@/contexts/OfflineContext";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isOffline } = useOffline();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Voice recognition setup
  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      // Type assertion to handle TypeScript issue
      const recognition = new (SpeechRecognition as any)();
      
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

  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Save language preference to localStorage
    localStorage.setItem('jeevanrakshak-language', newLanguage);
  };

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('jeevanrakshak-language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // Reset the search field
      setSearchQuery('');
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <FirstAid className="h-8 w-8 text-medical-blue mr-2" />
            <h1 className="text-xl font-bold text-medical-blue">{t('appName')}</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {/* Emergency Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <AlarmClock className="mr-2 h-4 w-4" />
                  {t('emergencyServices')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <FirstAid className="mr-2 h-4 w-4" />
                  {t('firstAid')}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('sos')}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  {t('symptomChecker')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Insurance Help Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  {t('insuranceHelp')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <AlarmClock className="mr-2 h-4 w-4" />
                  {t('emergencyServices')}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  {t('insurance')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Languages className="mr-2 h-4 w-4" />
                  {t('languages')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  className={`cursor-pointer ${language === 'en' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${language === 'hi' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleLanguageChange('hi')}
                >
                  हिंदी (Hindi)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${language === 'ta' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleLanguageChange('ta')}
                >
                  தமிழ் (Tamil)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${language === 'bn' ? 'bg-primary/10' : ''}`}
                  onClick={() => handleLanguageChange('bn')}
                >
                  বাংলা (Bengali)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/Signup */}
            <Button variant="ghost" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {t('login')}/{t('signup')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
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

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <div className="px-4 py-2 font-medium text-lg">{t('emergencyServices')}</div>
            <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
              <FirstAid className="mr-2 h-4 w-4" />
              {t('firstAid')}
            </a>
            <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
              <Phone className="mr-2 h-4 w-4" />
              {t('sos')}
            </a>
            <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
              <Stethoscope className="mr-2 h-4 w-4" />
              {t('symptomChecker')}
            </a>
            
            <div className="px-4 py-2 font-medium text-lg border-t mt-3">{t('insuranceHelp')}</div>
            <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
              <AlarmClock className="mr-2 h-4 w-4" />
              {t('emergencyServices')}
            </a>
            <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
              <FileText className="mr-2 h-4 w-4" />
              {t('insurance')}
            </a>
            
            <div className="px-4 py-2 font-medium text-lg border-t mt-3">{t('languages')}</div>
            <a 
              href="#" 
              className={`block px-4 py-2 flex items-center hover:bg-gray-100 ${language === 'en' ? 'bg-primary/10' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange('en');
                toggleMobileMenu();
              }}
            >
              English
            </a>
            <a 
              href="#" 
              className={`block px-4 py-2 flex items-center hover:bg-gray-100 ${language === 'hi' ? 'bg-primary/10' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange('hi');
                toggleMobileMenu();
              }}
            >
              हिंदी (Hindi)
            </a>
            <a 
              href="#" 
              className={`block px-4 py-2 flex items-center hover:bg-gray-100 ${language === 'ta' ? 'bg-primary/10' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange('ta');
                toggleMobileMenu();
              }}
            >
              தமிழ் (Tamil)
            </a>
            <a 
              href="#" 
              className={`block px-4 py-2 flex items-center hover:bg-gray-100 ${language === 'bn' ? 'bg-primary/10' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLanguageChange('bn');
                toggleMobileMenu();
              }}
            >
              বাংলা (Bengali)
            </a>
            
            <div className="border-t mt-3"></div>
            <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
              <User className="mr-2 h-4 w-4" />
              {t('login')}/{t('signup')}
            </a>
          </div>
        )}

        {/* Offline Indicator */}
        {isOffline && (
          <div className="bg-red-500 text-white py-1 text-center text-sm">
            {t('offlineMessage')}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

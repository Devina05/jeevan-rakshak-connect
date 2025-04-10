
import React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Save language preference to localStorage
    localStorage.setItem('jeevanrakshak-language', newLanguage);
  };

  return (
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
  );
};

export default LanguageSelector;

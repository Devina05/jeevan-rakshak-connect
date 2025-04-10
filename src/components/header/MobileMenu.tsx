
import React from "react";
import { Heart, Phone, Stethoscope, AlarmClock, FileText, User } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
  const { language, setLanguage, t } = useLanguage();

  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Save language preference to localStorage
    localStorage.setItem('jeevanrakshak-language', newLanguage);
    toggleMenu();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 space-y-3 border-t">
      <div className="px-4 py-2 font-medium text-lg">{t('emergencyServices')}</div>
      <a href="#" className="block px-4 py-2 flex items-center hover:bg-gray-100">
        <Heart className="mr-2 h-4 w-4" />
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
  );
};

export default MobileMenu;

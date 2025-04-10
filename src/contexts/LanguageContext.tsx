
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define supported languages
export type Language = 'en' | 'hi' | 'ta' | 'bn';

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'JeevanRakshak',
    firstAid: 'First Aid',
    sos: 'SOS',
    symptomChecker: 'Symptom Checker',
    insurance: 'Insurance',
    emergencyServices: 'Emergency Services',
    insuranceHelp: 'Insurance Help',
    searchPlaceholder: 'Search for emergency help...',
    login: 'Login',
    signup: 'Signup',
    nearby: 'Nearby Facilities',
    welcome: 'Welcome to JeevanRakshak',
    welcomeMessage: 'Your emergency healthcare assistant',
    firstAidGuides: 'First Aid Guides',
    callEmergency: 'Call Emergency',
    chatWithUs: 'Chat with us',
    offlineMessage: 'You are currently offline. Some features may be limited.',
    cpr: 'CPR',
    bleeding: 'Bleeding',
    burns: 'Burns',
    choking: 'Choking',
    fractures: 'Fractures',
    seizures: 'Seizures',
    heartAttack: 'Heart Attack',
    stroke: 'Stroke',
    emergencyContact: 'Emergency Contact',
    findHospital: 'Find Hospital',
    languages: 'Languages',
    chatbotWelcome: 'Hello! I\'m your JeevanRakshak assistant. How can I help you today?',
    chatbotPrompt: 'Type your message...',
    send: 'Send',
    voiceSearch: 'Voice Search',
  },
  hi: {
    appName: 'जीवनरक्षक',
    firstAid: 'प्राथमिक चिकित्सा',
    sos: 'आपात स्थिति',
    symptomChecker: 'लक्षण जांचकर्ता',
    insurance: 'बीमा',
    emergencyServices: 'आपातकालीन सेवाएं',
    insuranceHelp: 'बीमा सहायता',
    searchPlaceholder: 'आपातकालीन सहायता खोजें...',
    login: 'लॉगिन',
    signup: 'साइन अप',
    nearby: 'नज़दीकी सुविधाएँ',
    welcome: 'जीवनरक्षक में आपका स्वागत है',
    welcomeMessage: 'आपका आपातकालीन स्वास्थ्य सहायक',
    firstAidGuides: 'प्राथमिक चिकित्सा गाइड',
    callEmergency: 'आपातकालीन कॉल',
    chatWithUs: 'हमसे चैट करें',
    offlineMessage: 'आप वर्तमान में ऑफ़लाइन हैं। कुछ सुविधाएँ सीमित हो सकती हैं।',
    cpr: 'सीपीआर',
    bleeding: 'रक्तस्राव',
    burns: 'जलन',
    choking: 'दम घुटना',
    fractures: 'फ्रैक्चर',
    seizures: 'दौरे',
    heartAttack: 'दिल का दौरा',
    stroke: 'स्ट्रोक',
    emergencyContact: 'आपातकालीन संपर्क',
    findHospital: 'अस्पताल खोजें',
    languages: 'भाषाएँ',
    chatbotWelcome: 'नमस्ते! मैं आपका जीवनरक्षक सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?',
    chatbotPrompt: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    voiceSearch: 'आवाज़ खोज',
  },
  ta: {
    appName: 'ஜீவன்ரக்ஷக்',
    firstAid: 'முதலுதவி',
    sos: 'அவசர உதவி',
    symptomChecker: 'அறிகுறி சரிபார்ப்பி',
    insurance: 'காப்பீடு',
    emergencyServices: 'அவசர சேவைகள்',
    insuranceHelp: 'காப்பீடு உதவி',
    searchPlaceholder: 'அவசர உதவி தேடு...',
    login: 'உள்நுழைக',
    signup: 'பதிவு செய்க',
    nearby: 'அருகிலுள்ள வசதிகள்',
    welcome: 'ஜீவன்ரக்ஷக்-க்கு வரவேற்கிறோம்',
    welcomeMessage: 'உங்கள் அவசரகால சுகாதார உதவியாளர்',
    firstAidGuides: 'முதலுதவி வழிகாட்டிகள்',
    callEmergency: 'அவசர அழைப்பு',
    chatWithUs: 'எங்களுடன் அரட்டை',
    offlineMessage: 'நீங்கள் தற்போது ஆஃப்லைனில் உள்ளீர்கள். சில அம்சங்கள் வரம்புக்குட்பட்டவை.',
    cpr: 'சிபிஆர்',
    bleeding: 'இரத்தப்போக்கு',
    burns: 'தீக்காயங்கள்',
    choking: 'மூச்சுத்திணறல்',
    fractures: 'எலும்பு முறிவுகள்',
    seizures: 'வலிப்பு',
    heartAttack: 'இதய அடைப்பு',
    stroke: 'பக்கவாதம்',
    emergencyContact: 'அவசர தொடர்பு',
    findHospital: 'மருத்துவமனையைக் கண்டறியவும்',
    languages: 'மொழிகள்',
    chatbotWelcome: 'வணக்கம்! நான் உங்கள் ஜீவன்ரக்ஷக் உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    chatbotPrompt: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
    send: 'அனுப்புக',
    voiceSearch: 'குரல் தேடல்',
  },
  bn: {
    appName: 'জীবনরক্ষক',
    firstAid: 'প্রাথমিক চিকিৎসা',
    sos: 'জরুরী সাহায্য',
    symptomChecker: 'লক্ষণ পরীক্ষক',
    insurance: 'বীমা',
    emergencyServices: 'জরুরী পরিষেবা',
    insuranceHelp: 'বীমা সহায়তা',
    searchPlaceholder: 'জরুরী সাহায্য খুঁজুন...',
    login: 'লগইন',
    signup: 'সাইন আপ',
    nearby: 'কাছাকাছি সুবিধাসমূহ',
    welcome: 'জীবনরক্ষকে আপনাকে স্বাগতম',
    welcomeMessage: 'আপনার জরুরী স্বাস্থ্যসেবা সহকারী',
    firstAidGuides: 'প্রাথমিক চিকিৎসা গাইড',
    callEmergency: 'জরুরী কল',
    chatWithUs: 'আমাদের সাথে চ্যাট করুন',
    offlineMessage: 'আপনি বর্তমানে অফলাইনে আছেন। কিছু বৈশিষ্ট্য সীমিত হতে পারে।',
    cpr: 'সিপিআর',
    bleeding: 'রক্তক্ষরণ',
    burns: 'পোড়া',
    choking: 'শ্বাসরোধ',
    fractures: 'হাড় ভাঙা',
    seizures: 'খিঁচুনি',
    heartAttack: 'হার্ট অ্যাটাক',
    stroke: 'স্ট্রোক',
    emergencyContact: 'জরুরী যোগাযোগ',
    findHospital: 'হাসপাতাল খুঁজুন',
    languages: 'ভাষাসমূহ',
    chatbotWelcome: 'হ্যালো! আমি আপনার জীবনরক্ষক সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    chatbotPrompt: 'আপনার বার্তা লিখুন...',
    send: 'পাঠান',
    voiceSearch: 'কণ্ঠস্বর অনুসন্ধান',
  }
};

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

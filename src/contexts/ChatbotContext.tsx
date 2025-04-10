
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

// Message interface
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Context interface
interface ChatbotContextType {
  messages: ChatMessage[];
  isChatOpen: boolean;
  addMessage: (text: string, sender: 'user' | 'bot') => void;
  toggleChat: () => void;
  clearChat: () => void;
}

// Create context
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Simple responses based on keywords
const getResponse = (message: string, language: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Basic first aid responses
  if (lowerMsg.includes('cpr') || lowerMsg.includes('cardio')) {
    if (language === 'hi') return 'सीपीआर के लिए, पीड़ित को सपाट सतह पर रखें, हाथों को छाती के बीच में रखें, 100-120 संपीड़न प्रति मिनट की दर से संपीड़न करें। 30 संपीड़न के बाद, 2 सांसें दें।';
    if (language === 'ta') return 'சிபிஆருக்கு, பாதிக்கப்பட்டவரை சமதளத்தில் வைக்கவும், கைகளை மார்பின் மத்தியில் வைக்கவும், நிமிடத்திற்கு 100-120 அழுத்தங்கள் விகிதத்தில் அழுத்தவும். 30 அழுத்தங்களுக்குப் பிறகு, 2 சுவாசங்களை வழங்கவும்.';
    if (language === 'bn') return 'সিপিআরের জন্য, আক্রান্ত ব্যক্তিকে সমতল পৃষ্ঠে রাখুন, বুকের মাঝখানে হাত রাখুন, মিনিটে 100-120 চাপের হারে চাপ দিন। 30টি চাপের পর, 2টি শ্বাস দিন।';
    return 'For CPR, place victim on flat surface, position hands at center of chest, compress at rate of 100-120 compressions per minute. After 30 compressions, give 2 breaths.';
  }
  
  if (lowerMsg.includes('bleed') || lowerMsg.includes('blood')) {
    if (language === 'hi') return 'रक्तस्राव को नियंत्रित करने के लिए, घाव पर सीधा दबाव डालें। यदि संभव हो तो घाव को हृदय के स्तर से ऊपर उठाएं। साफ कपड़े या गॉज पैड का उपयोग करें।';
    if (language === 'ta') return 'இரத்தப்போக்கைக் கட்டுப்படுத்த, காயத்தின் மீது நேரடி அழுத்தத்தைப் பயன்படுத்துங்கள். முடிந்தால் காயத்தை இதயத்தின் மட்டத்திற்கு மேலே உயர்த்தவும். சுத்தமான துணி அல்லது காஸ் பேடைப் பயன்படுத்துங்கள்.';
    if (language === 'bn') return 'রক্তপাত নিয়ন্ত্রণ করতে, ক্ষতের উপর সরাসরি চাপ প্রয়োগ করুন। সম্ভব হলে ক্ষতস্থান হৃদয়ের স্তরের উপরে তুলুন। পরিষ্কার কাপড় বা গজ প্যাড ব্যবহার করুন।';
    return 'To control bleeding, apply direct pressure to the wound. Elevate the wound above heart level if possible. Use clean cloth or gauze pad.';
  }
  
  if (lowerMsg.includes('burn')) {
    if (language === 'hi') return 'जलन के लिए, प्रभावित क्षेत्र को 10-15 मिनट के लिए ठंडे, बहते पानी के नीचे रखें। रासायनिक जलन के लिए, जलन क्षेत्र को 20 मिनट के लिए धोएं। फफोले न फोड़ें।';
    if (language === 'ta') return 'தீக்காயங்களுக்கு, பாதிக்கப்பட்ட பகுதியை 10-15 நிமிடங்களுக்கு குளிர்ந்த, ஓடும் தண்ணீரின் கீழ் வைக்கவும். இரசாயன எரிச்சலுக்கு, எரிச்சல் பகுதியை 20 நிமிடங்களுக்கு கழுவவும். கொப்புளங்களை உடைக்க வேண்டாம்.';
    if (language === 'bn') return 'পোড়ার জন্য, আক্রান্ত এলাকাটি 10-15 মিনিটের জন্য ঠান্ডা, প্রবাহমান জলের নীচে রাখুন। রাসায়নিক পোড়ার জন্য, পোড়া এলাকা 20 মিনিটের জন্য ধুয়ে নিন। ফোসকা ফাটাবেন না।';
    return 'For burns, place affected area under cool, running water for 10-15 minutes. For chemical burns, flush burn area for 20 minutes. Do not break blisters.';
  }
  
  if (lowerMsg.includes('fracture') || lowerMsg.includes('broken bone')) {
    if (language === 'hi') return 'फ्रैक्चर के लिए, प्रभावित क्षेत्र को स्थिर करें। घायल अंग को हिलाने की कोशिश न करें। बर्फ लागू करें और प्रभावित क्षेत्र को हृदय के स्तर से ऊपर उठाएं।';
    if (language === 'ta') return 'எலும்பு முறிவுகளுக்கு, பாதிக்கப்பட்ட பகுதியை அசையாமல் வைக்கவும். காயமடைந்த கைகால்களை அசைக்க முயற்சிக்க வேண்டாம். பனி வைத்து, பாதிக்கப்பட்ட பகுதியை இதயத்தின் மட்டத்திற்கு மேலே உயர்த்தவும்.';
    if (language === 'bn') return 'ফ্র্যাকচারের জন্য, আক্রান্ত এলাকাটি স্থির করুন। আহত অঙ্গ নাড়াচাড়া করার চেষ্টা করবেন না। বরফ প্রয়োগ করুন এবং আক্রান্ত এলাকাটি হৃদয়ের স্তরের উপরে তুলুন।';
    return 'For fractures, immobilize the affected area. Do not try to move the injured limb. Apply ice and elevate the affected area above heart level.';
  }
  
  // Navigation-related responses
  if (lowerMsg.includes('hospital') || lowerMsg.includes('doctor')) {
    if (language === 'hi') return 'आपके पास के अस्पताल खोजने के लिए, ऐप के मुख्य स्क्रीन पर "नज़दीकी सुविधाएँ" विकल्प का उपयोग करें।';
    if (language === 'ta') return 'உங்களுக்கு அருகில் உள்ள மருத்துவமனைகளைக் கண்டறிய, பயன்பாட்டின் முகப்புத் திரையில் உள்ள "அருகிலுள்ள வசதிகள்" விருப்பத்தைப் பயன்படுத்தவும்.';
    if (language === 'bn') return 'আপনার কাছাকাছি হাসপাতাল খুঁজতে, অ্যাপের হোম স্ক্রিনে "কাছাকাছি সুবিধাসমূহ" বিকল্পটি ব্যবহার করুন।';
    return 'To find hospitals near you, use the "Nearby Facilities" option on the app home screen.';
  }
  
  if (lowerMsg.includes('insurance') || lowerMsg.includes('claim')) {
    if (language === 'hi') return 'बीमा दावा सहायता के लिए, "बीमा सहायता" मेनू पर जाएं। आप आपातकालीन स्थिति के अनुसार कवरेज और आवश्यक दस्तावेज़ों के बारे में जानकारी पा सकते हैं।';
    if (language === 'ta') return 'காப்பீட்டு உரிமைகோரல் உதவிக்கு, "காப்பீடு உதவி" மெனுவிற்குச் செல்லவும். அவசரநிலைக்கு ஏற்ப கவரேஜ் மற்றும் தேவையான ஆவணங்கள் பற்றிய தகவல்களைக் காணலாம்.';
    if (language === 'bn') return 'বীমা দাবি সহায়তার জন্য, "বীমা সহায়তা" মেনুতে যান। আপনি জরুরী অবস্থা অনুসারে কভারেজ এবং প্রয়োজনীয় নথি সম্পর্কে তথ্য পেতে পারেন।';
    return 'For insurance claim assistance, go to the "Insurance Help" menu. You can find information about coverage and required documents based on the emergency.';
  }
  
  if (lowerMsg.includes('sos') || lowerMsg.includes('emergency')) {
    if (language === 'hi') return 'आपातकालीन सहायता के लिए, होम स्क्रीन पर लाल SOS बटन पर क्लिक करें। यह आपके स्थान के साथ आपके आपातकालीन संपर्कों को अलर्ट भेजेगा।';
    if (language === 'ta') return 'அவசர உதவிக்கு, முகப்புத் திரையில் உள்ள சிவப்பு SOS பொத்தானைக் கிளிக் செய்யவும். இது உங்கள் இருப்பிடத்துடன் உங்கள் அவசர தொடர்புகளுக்கு எச்சரிக்கையை அனுப்பும்.';
    if (language === 'bn') return 'জরুরী সাহায্যের জন্য, হোম স্ক্রিনে লাল SOS বোতামে ক্লিক করুন। এটি আপনার অবস্থান সহ আপনার জরুরী পরিচিতিদের সতর্ক করবে।';
    return 'For emergency assistance, click the red SOS button on the home screen. This will send alerts to your emergency contacts with your location.';
  }
  
  // Default fallback responses
  if (language === 'hi') return 'मैं आपकी सहायता करने के लिए यहां हूं। क्या आप प्राथमिक चिकित्सा, SOS सहायता, या बीमा जानकारी के बारे में पूछना चाहते हैं?';
  if (language === 'ta') return 'நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன். முதலுதவி, SOS உதவி அல்லது காப்பீட்டுத் தகவல் பற்றி நீங்கள் கேட்க விரும்புகிறீர்களா?';
  if (language === 'bn') return 'আমি আপনাকে সাহায্য করতে এখানে আছি। আপনি কি প্রাথমিক চিকিৎসা, SOS সহায়তা, বা বীমা তথ্য সম্পর্কে জিজ্ঞাসা করতে চান?';
  return 'I\'m here to help. Would you like to ask about first aid, SOS assistance, or insurance information?';
};

// Provider component
export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const { language, t } = useLanguage();

  // Add message to chat
  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // If it's a user message, generate a bot response
    if (sender === 'user') {
      setTimeout(() => {
        const botResponse = getResponse(text, language);
        addMessage(botResponse, 'bot');
      }, 1000);
    }
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Clear chat messages
  const clearChat = () => {
    setMessages([]);
    addMessage(t('chatbotWelcome'), 'bot');
  };

  // Initialize with welcome message - using useEffect instead of useState
  useEffect(() => {
    addMessage(t('chatbotWelcome'), 'bot');
  }, []);

  return (
    <ChatbotContext.Provider value={{ messages, isChatOpen, addMessage, toggleChat, clearChat }}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Custom hook to use chatbot context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

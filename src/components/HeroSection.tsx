
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FirstAid, 
  Phone, 
  Stethoscope, 
  Shield, 
  MapPin, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useChatbot } from "@/contexts/ChatbotContext";
import { useOffline } from "@/contexts/OfflineContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { toggleChat } = useChatbot();
  const { isOffline } = useOffline();
  
  return (
    <div className="relative bg-gradient-to-br from-white to-blue-50 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background shape */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute right-0 top-0 h-full text-blue-50 transform translate-x-1/3"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 50,100 0,100" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {t('welcome')}
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              {t('welcomeMessage')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-medical-red hover:bg-red-600 rounded-full"
                disabled={isOffline}
              >
                <Phone className="mr-2 h-5 w-5" /> {t('callEmergency')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-medical-blue text-medical-blue hover:bg-medical-blue/10"
                onClick={toggleChat}
              >
                <MessageSquare className="mr-2 h-5 w-5" /> {t('chatWithUs')}
              </Button>
            </div>
          </div>

          {/* Quick access cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-medical-blue">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FirstAid className="h-6 w-6 text-medical-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('firstAid')}</h3>
                <p className="text-gray-500 text-sm mb-2">Quick guides for emergencies</p>
                <Button variant="link" className="p-0 text-medical-blue">
                  View guides <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-medical-red">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-medical-red" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('sos')}</h3>
                <p className="text-gray-500 text-sm mb-2">Quick emergency alert</p>
                <Button variant="link" className="p-0 text-medical-red">
                  Send SOS <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-medical-green">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-medical-green" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('symptomChecker')}</h3>
                <p className="text-gray-500 text-sm mb-2">Check your symptoms</p>
                <Button variant="link" className="p-0 text-medical-green">
                  Start check <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-medical-orange">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-medical-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('nearby')}</h3>
                <p className="text-gray-500 text-sm mb-2">Find medical facilities</p>
                <Button variant="link" className="p-0 text-medical-orange">
                  Find now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import React from "react";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Logo: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Heart className="h-8 w-8 text-medical-blue mr-2" />
      <h1 className="text-xl font-bold text-medical-blue">{t('appName')}</h1>
    </div>
  );
};

export default Logo;

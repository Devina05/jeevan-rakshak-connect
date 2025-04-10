
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, Wifi } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface OfflineBannerProps {
  onNavigateToFirstAid: () => void;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ onNavigateToFirstAid }) => {
  const { t } = useLanguage();
  
  return (
    <Alert className="bg-red-50 border-red-200 my-4">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-500 flex items-center">
        <Wifi className="h-4 w-4 mr-2" />
        {t('offlineMessage')}
      </AlertTitle>
      <AlertDescription className="text-gray-700">
        <p className="mt-2">First aid guides are still available for offline use.</p>
        <Button 
          variant="outline" 
          className="mt-3 text-medical-blue border-medical-blue"
          onClick={onNavigateToFirstAid}
        >
          Access First Aid Guides
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default OfflineBanner;

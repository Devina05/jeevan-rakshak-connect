
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Book, 
  Phone, 
  Stethoscope, 
  Shield 
} from 'lucide-react';
import EmergencyCard from './EmergencyCard';
import { useOffline } from "@/contexts/OfflineContext";

const EmergencyServices = () => {
  const { t } = useLanguage();
  const { isOffline } = useOffline();
  
  // Handle emergency card actions
  const handleFirstAid = () => {
    console.log('Navigating to First Aid section');
    const firstAidSection = document.getElementById('first-aid-section');
    if (firstAidSection) {
      firstAidSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleSOS = () => {
    if (isOffline) return;
    console.log('Sending SOS alert');
    // Implement SOS functionality
    alert('SOS Alert: Emergency contacts would be notified with your location (disabled in demo)');
  };
  
  const handleSymptomCheck = () => {
    if (isOffline) return;
    console.log('Opening symptom checker');
    // Implement symptom checker
  };
  
  const handleInsurance = () => {
    if (isOffline) return;
    console.log('Opening insurance help');
    // Implement insurance guidance
  };
  
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{t('emergencyServices')}</h2>
          <p className="text-gray-600 mt-2">Quick access to emergency services and guidance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EmergencyCard
            title={t('firstAid')}
            description="Access step-by-step guides for medical emergencies"
            icon={Book}
            action={handleFirstAid}
            actionText="View Guides"
            type="first-aid"
          />
          
          <EmergencyCard
            title={t('sos')}
            description="Send location and alert to emergency contacts"
            icon={Phone}
            action={handleSOS}
            actionText="Send SOS"
            type="sos"
            disabled={isOffline}
          />
          
          <EmergencyCard
            title={t('symptomChecker')}
            description="Check symptoms and get guidance on next steps"
            icon={Stethoscope}
            action={handleSymptomCheck}
            actionText="Check Symptoms"
            type="symptom"
            disabled={isOffline}
          />
          
          <EmergencyCard
            title={t('insurance')}
            description="Get help with insurance claims for emergencies"
            icon={Shield}
            action={handleInsurance}
            actionText="Insurance Help"
            type="insurance"
            disabled={isOffline}
          />
        </div>
      </div>
    </section>
  );
};

export default EmergencyServices;

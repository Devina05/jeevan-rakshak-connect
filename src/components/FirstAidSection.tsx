
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { firstAidData } from '@/data/firstAidData';
import FirstAidItem from './FirstAidItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOffline } from "@/contexts/OfflineContext";
import { Heart, Droplet, Flame, AlertTriangle, Bone } from 'lucide-react';

const FirstAidSection = () => {
  const { t } = useLanguage();
  const { isOffline } = useOffline();
  const [selectedGuide, setSelectedGuide] = useState<typeof firstAidData[0] | null>(null);
  
  const iconMap: Record<string, React.FC> = {
    'heart-pulse': Heart,
    'droplet': Droplet,
    'flame': Flame,
    'alert-triangle': AlertTriangle,
    'bone': Bone
  };
  
  const handleGuideClick = (guide: typeof firstAidData[0]) => {
    setSelectedGuide(guide);
  };
  
  const closeDialog = () => {
    setSelectedGuide(null);
  };
  
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{t('firstAidGuides')}</h2>
          <p className="text-gray-600 mt-2">
            {isOffline ? "These guides are available offline." : "Learn how to respond to common emergencies."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstAidData.map((guide) => {
            const IconComponent = iconMap[guide.icon];
            return (
              <FirstAidItem
                key={guide.id}
                title={guide.title}
                description={guide.description}
                icon={IconComponent || Heart}
                onClick={() => handleGuideClick(guide)}
              />
            );
          })}
        </div>
      </div>
      
      {/* First Aid Guide Dialog */}
      {selectedGuide && (
        <Dialog open={!!selectedGuide} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center">
                {(() => {
                  const IconComponent = iconMap[selectedGuide.icon];
                  return IconComponent ? <IconComponent className="mr-2 h-6 w-6 text-medical-blue" /> : null;
                })()}
                {selectedGuide.title}
              </DialogTitle>
              <DialogDescription>
                {selectedGuide.description}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[50vh] mt-4 pr-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Step-by-step guide:</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  {selectedGuide.steps.map((step, idx) => (
                    <li key={idx} className="text-gray-700">
                      <strong>{step.title}:</strong> {step.description}
                    </li>
                  ))}
                </ol>
                <div className="pt-4 text-sm text-gray-500 italic">
                  Note: This information is a guide only and is not a substitute for professional medical advice.
                  Always seek professional help in an emergency.
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default FirstAidSection;

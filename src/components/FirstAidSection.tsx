
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { firstAidGuides } from '@/data/firstAidData';
import FirstAidItem from './FirstAidItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOffline } from "@/contexts/OfflineContext";

const FirstAidSection = () => {
  const { language, t } = useLanguage();
  const { isOffline } = useOffline();
  const [selectedGuide, setSelectedGuide] = useState<typeof firstAidGuides[0] | null>(null);
  
  const handleGuideClick = (guide: typeof firstAidGuides[0]) => {
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {firstAidGuides.map((guide) => (
            <FirstAidItem
              key={guide.id}
              title={guide.title[language as keyof typeof guide.title]}
              description={guide.description[language as keyof typeof guide.description]}
              icon={guide.icon}
              onClick={() => handleGuideClick(guide)}
            />
          ))}
        </div>
      </div>
      
      {/* First Aid Guide Dialog */}
      {selectedGuide && (
        <Dialog open={!!selectedGuide} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center">
                <selectedGuide.icon className="mr-2 h-6 w-6 text-medical-blue" />
                {selectedGuide.title[language as keyof typeof selectedGuide.title]}
              </DialogTitle>
              <DialogDescription>
                {selectedGuide.description[language as keyof typeof selectedGuide.description]}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[50vh] mt-4 pr-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Step-by-step guide:</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  {selectedGuide.steps[language as keyof typeof selectedGuide.steps].map((step, idx) => (
                    <li key={idx} className="text-gray-700">{step}</li>
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

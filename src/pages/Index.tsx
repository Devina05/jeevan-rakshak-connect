
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import EmergencyServices from "@/components/EmergencyServices";
import FirstAidSection from "@/components/FirstAidSection";
import NearbyFacilities from "@/components/NearbyFacilities";
import OfflineBanner from "@/components/OfflineBanner";
import Chatbot from "@/components/Chatbot";
import { useOffline } from "@/contexts/OfflineContext";

const Index = () => {
  const { isOffline } = useOffline();

  // Handle service worker registration for offline support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch((error) => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);

  // Scroll to first aid section
  const scrollToFirstAid = () => {
    const firstAidSection = document.getElementById('first-aid-section');
    if (firstAidSection) {
      firstAidSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        {isOffline && <OfflineBanner onNavigateToFirstAid={scrollToFirstAid} />}
        
        <EmergencyServices />
        
        <div id="first-aid-section">
          <FirstAidSection />
        </div>
        
        <NearbyFacilities />
      </main>
      
      <Chatbot />
      
      <Footer />
    </div>
  );
};

export default Index;

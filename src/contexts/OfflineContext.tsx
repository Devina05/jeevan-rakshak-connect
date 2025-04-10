
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface OfflineContextType {
  isOffline: boolean;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Function to update online status
    const handleStatusChange = () => {
      const offline = !navigator.onLine;
      setIsOffline(offline);
      
      if (offline) {
        toast({
          title: "You're offline",
          description: "Limited features are available. First aid guides can still be accessed.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "You're back online",
          description: "All features are now available.",
          variant: "default",
        });
      }
    };

    // Set initial status
    setIsOffline(!navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [toast]);

  return (
    <OfflineContext.Provider value={{ isOffline }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

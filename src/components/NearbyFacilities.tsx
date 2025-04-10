
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { nearbyHospitals, nearbyPharmacies } from '@/data/hospitalData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Clock, Phone } from 'lucide-react';
import { useOffline } from '@/contexts/OfflineContext';

const NearbyFacilities = () => {
  const { t } = useLanguage();
  const { isOffline } = useOffline();
  const [selectedTab, setSelectedTab] = useState("hospitals");
  
  // Function to handle directions
  const handleGetDirections = (lat: number, lng: number) => {
    if (isOffline) return;
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };
  
  // Function to handle calling
  const handleCall = (phone: string) => {
    if (isOffline) return;
    
    window.location.href = `tel:${phone}`;
  };
  
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{t('nearby')}</h2>
          <p className="text-gray-600 mt-2">Find emergency medical facilities close to you</p>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full md:w-96 mx-auto grid-cols-2">
            <TabsTrigger value="hospitals">
              <Hospital className="h-4 w-4 mr-2" />
              Hospitals
            </TabsTrigger>
            <TabsTrigger value="pharmacies">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8a2 2 0 0 0 2-2v-3.4a5 5 0 0 0-1.5-3.6l-.5-.5" />
                <path d="M8.5 7H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h5" />
                <path d="M11 16a3 3 0 0 0-3-3m0 0a3 3 0 0 0-3 3m6-3a3 3 0 0 0-3 3m0 0a3 3 0 0 0-3-3" />
                <path d="m15 11 1-9 4 1-1 8" />
                <path d="M15 11a3 3 0 0 1-3 3m0 0a3 3 0 0 1-3-3m6 0a3 3 0 0 0-3-3m0 0a3 3 0 0 0-3 3" />
              </svg>
              Pharmacies
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hospitals" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyHospitals.map((hospital) => (
                <Card key={hospital.id} className={`overflow-hidden ${hospital.emergency ? 'border-l-4 border-medical-red' : 'border-l-4 border-gray-300'}`}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{hospital.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {hospital.distance}
                        </CardDescription>
                      </div>
                      {hospital.emergency && (
                        <span className="bg-red-100 text-medical-red text-xs font-medium px-2.5 py-0.5 rounded-full">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hospital.services.slice(0, 3).map((service, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-50 text-medical-blue text-xs px-2 py-0.5 rounded"
                        >
                          {service}
                        </span>
                      ))}
                      {hospital.services.length > 3 && (
                        <span className="text-xs text-gray-500">+{hospital.services.length - 3} more</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-2 grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCall(hospital.phone)}
                      disabled={isOffline}
                      className="text-medical-blue w-full"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleGetDirections(hospital.coordinates.lat, hospital.coordinates.lng)}
                      disabled={isOffline}
                      className="bg-medical-blue w-full"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pharmacies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className={`overflow-hidden ${pharmacy.open24Hours ? 'border-l-4 border-medical-green' : 'border-l-4 border-gray-300'}`}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {pharmacy.distance}
                        </CardDescription>
                      </div>
                      {pharmacy.open24Hours && (
                        <span className="bg-green-100 text-medical-green text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Open 24h
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-2">{pharmacy.address}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {pharmacy.open24Hours ? 'Open 24 hours' : 'Standard hours'}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-2 grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCall(pharmacy.phone)}
                      disabled={isOffline}
                      className="text-medical-green w-full"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleGetDirections(pharmacy.coordinates.lat, pharmacy.coordinates.lng)}
                      disabled={isOffline}
                      className="bg-medical-green w-full"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NearbyFacilities;

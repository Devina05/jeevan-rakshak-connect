
export interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  services: string[];
  emergency: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Sample hospital data for demonstration (in a real app, this would be fetched from an API)
export const nearbyHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    distance: '2.3 km',
    address: '123 Medical Lane, Cityville',
    phone: '+91-1234-567890',
    services: ['Emergency Care', 'Trauma Center', 'ICU', 'General Surgery'],
    emergency: true,
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    }
  },
  {
    id: 'h2',
    name: 'Wellness Medical Center',
    distance: '3.5 km',
    address: '456 Health Avenue, Townsburg',
    phone: '+91-9876-543210',
    services: ['General Practice', 'Pediatrics', 'Emergency Care'],
    emergency: true,
    coordinates: {
      lat: 28.6129,
      lng: 77.2280
    }
  },
  {
    id: 'h3',
    name: 'Sunrise Hospital',
    distance: '4.8 km',
    address: '789 Care Street, Villagetown',
    phone: '+91-8765-432109',
    services: ['Emergency Care', 'Cardiology', 'Neurology', 'Orthopedics'],
    emergency: true,
    coordinates: {
      lat: 28.6219,
      lng: 77.2190
    }
  },
  {
    id: 'h4',
    name: 'LifeLine Clinic',
    distance: '5.2 km',
    address: '321 Wellness Road, Healthville',
    phone: '+91-7654-321098',
    services: ['General Practice', 'Diagnostic Services', 'Pharmacy'],
    emergency: false,
    coordinates: {
      lat: 28.6029,
      lng: 77.2180
    }
  },
  {
    id: 'h5',
    name: 'Mercy Healthcare',
    distance: '6.7 km',
    address: '654 Healing Blvd, Caringtown',
    phone: '+91-6543-210987',
    services: ['Emergency Care', 'Surgery', 'Maternity', 'Pediatrics'],
    emergency: true,
    coordinates: {
      lat: 28.6339,
      lng: 77.1990
    }
  }
];

export interface Pharmacy {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  open24Hours: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Sample pharmacy data
export const nearbyPharmacies: Pharmacy[] = [
  {
    id: 'p1',
    name: 'MediCare Pharmacy',
    distance: '1.2 km',
    address: '111 Remedy Road, Cityville',
    phone: '+91-1122-334455',
    open24Hours: true,
    coordinates: {
      lat: 28.6149,
      lng: 77.2100
    }
  },
  {
    id: 'p2',
    name: 'Health First Chemists',
    distance: '2.4 km',
    address: '222 Wellness Way, Townsburg',
    phone: '+91-2233-445566',
    open24Hours: false,
    coordinates: {
      lat: 28.6159,
      lng: 77.2290
    }
  },
  {
    id: 'p3',
    name: 'LifeCare Medicines',
    distance: '3.1 km',
    address: '333 Drug Lane, Villagetown',
    phone: '+91-3344-556677',
    open24Hours: true,
    coordinates: {
      lat: 28.6239,
      lng: 77.2170
    }
  },
  {
    id: 'p4',
    name: 'QuickMeds Store',
    distance: '3.8 km',
    address: '444 Pharmacy Street, Healthville',
    phone: '+91-4455-667788',
    open24Hours: false,
    coordinates: {
      lat: 28.6049,
      lng: 77.2160
    }
  },
  {
    id: 'p5',
    name: 'PrimeCare Pharmacy',
    distance: '4.5 km',
    address: '555 Medical Market, Caringtown',
    phone: '+91-5566-778899',
    open24Hours: true,
    coordinates: {
      lat: 28.6359,
      lng: 77.1970
    }
  }
];

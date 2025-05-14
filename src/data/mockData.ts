import { Wedding, Registration } from '../types';

// Mock data for weddings
export const mockWeddings: Wedding[] = [
  {
    id: 'wedding-001',
    title: 'James & Emily Beachside Celebration',
    description: 'Join us for a beautiful beachside ceremony and reception in Cancun. We are excited to share our special day with friends and family from around the world in this stunning tropical paradise.',
    date: '2025-06-15',
    location: {
      country: 'Mexico',
      city: 'Cancun',
      venue: 'Blue Paradise Resort',
      coordinates: {
        lat: 21.161908,
        lng: -86.851528,
      },
    },
    hosts: [
      { name: 'James Wilson' },
      { name: 'Emily Parker' }
    ],
    photoUrl: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
    capacity: 120,
    registered: 45,
  },
  {
    id: 'wedding-002',
    title: 'Michael & Sophia Alpine Wedding',
    description: 'A spectacular wedding in the heart of the Swiss Alps. Experience breathtaking views, delicious Swiss cuisine, and celebrate love in one of the most beautiful settings in the world.',
    date: '2025-07-22',
    location: {
      country: 'Switzerland',
      city: 'Zermatt',
      venue: 'Alpine Lodge',
      coordinates: {
        lat: 46.0207,
        lng: 7.7491,
      },
    },
    hosts: [
      { name: 'Michael Brown' },
      { name: 'Sophia Martinez' }
    ],
    photoUrl: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg',
    capacity: 80,
    registered: 32,
  },
  {
    id: 'wedding-003',
    title: 'David & Olivia Vineyard Ceremony',
    description: 'An intimate wedding at a historic Tuscan vineyard. Enjoy world-class wine, authentic Italian cuisine, and celebrate with us under the Tuscan sun surrounded by rolling hills and ancient olive groves.',
    date: '2025-08-10',
    location: {
      country: 'Italy',
      city: 'Florence',
      venue: 'Villa Toscana',
      coordinates: {
        lat: 43.7696,
        lng: 11.2558,
      },
    },
    hosts: [
      { name: 'David Johnson' },
      { name: 'Olivia Smith' }
    ],
    photoUrl: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
    capacity: 100,
    registered: 62,
  },
  {
    id: 'wedding-004',
    title: 'Robert & Emma Traditional Japanese Wedding',
    description: 'Experience a blend of modern and traditional Japanese wedding customs in the beautiful city of Kyoto. The ceremony will be held at a historic shrine followed by a reception featuring Japanese culinary delights.',
    date: '2025-09-05',
    location: {
      country: 'Japan',
      city: 'Kyoto',
      venue: 'Kiyomizu Temple',
      coordinates: {
        lat: 34.9949,
        lng: 135.7851,
      },
    },
    hosts: [
      { name: 'Robert Taylor' },
      { name: 'Emma Garcia' }
    ],
    photoUrl: 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg',
    capacity: 60,
    registered: 28,
  },
  {
    id: 'wedding-005',
    title: 'William & Isabella Garden Wedding',
    description: 'A charming garden wedding in the English countryside. Join us for a day filled with flowers, music, and celebration in the picturesque setting of the historic Pembroke Gardens.',
    date: '2025-05-28',
    location: {
      country: 'United Kingdom',
      city: 'Oxford',
      venue: 'Pembroke Gardens',
      coordinates: {
        lat: 51.7520,
        lng: -1.2577,
      },
    },
    hosts: [
      { name: 'William Davis' },
      { name: 'Isabella Rodriguez' }
    ],
    photoUrl: 'https://images.pexels.com/photos/266643/pexels-photo-266643.jpeg',
    capacity: 90,
    registered: 41,
  },
  {
    id: 'wedding-006',
    title: 'Alexander & Mia Santorini Sunset Wedding',
    description: 'Say "I do" against the backdrop of Santorini\'s famous sunset. This magical wedding will take place on a cliff overlooking the Aegean Sea, followed by a traditional Greek feast under the stars.',
    date: '2025-06-30',
    location: {
      country: 'Greece',
      city: 'Santorini',
      venue: 'Caldera View Terrace',
      coordinates: {
        lat: 36.4618,
        lng: 25.3764,
      },
    },
    hosts: [
      { name: 'Alexander Wilson' },
      { name: 'Mia Thompson' }
    ],
    photoUrl: 'https://images.pexels.com/photos/5502390/pexels-photo-5502390.jpeg',
    capacity: 70,
    registered: 38,
  },
];

// Initialize mock registrations
export const initMockRegistrations = (): Registration[] => {
  const storedRegistrations = localStorage.getItem('registrations');
  if (storedRegistrations) {
    return JSON.parse(storedRegistrations);
  }
  
  // Default empty registrations
  return [];
};

// Helper functions for manipulating mock data
export const registerForWedding = (userId: string, weddingId: string, guests: number): Registration => {
  const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
  
  // Check if user already registered for this wedding
  const existingRegistration = registrations.find(
    (r: Registration) => r.userId === userId && r.weddingId === weddingId
  );
  
  if (existingRegistration) {
    throw new Error('You are already registered for this wedding');
  }
  
  // Create new registration
  const newRegistration: Registration = {
    id: `reg-${Date.now()}`,
    userId,
    weddingId,
    registrationDate: new Date().toISOString(),
    status: 'confirmed',
    guests,
  };
  
  registrations.push(newRegistration);
  localStorage.setItem('registrations', JSON.stringify(registrations));
  
  // Update wedding registered count
  const weddings = [...mockWeddings];
  const weddingIndex = weddings.findIndex(w => w.id === weddingId);
  if (weddingIndex !== -1) {
    weddings[weddingIndex].registered += guests;
    localStorage.setItem('weddings', JSON.stringify(weddings));
  }
  
  return newRegistration;
};

export const cancelRegistration = (registrationId: string): void => {
  const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
  const regIndex = registrations.findIndex((r: Registration) => r.id === registrationId);
  
  if (regIndex === -1) {
    throw new Error('Registration not found');
  }
  
  const registration = registrations[regIndex];
  
  // Update registration status
  registrations[regIndex].status = 'canceled';
  localStorage.setItem('registrations', JSON.stringify(registrations));
  
  // Update wedding registered count
  const weddings = [...mockWeddings];
  const weddingIndex = weddings.findIndex(w => w.id === registration.weddingId);
  if (weddingIndex !== -1) {
    weddings[weddingIndex].registered -= registration.guests;
    localStorage.setItem('weddings', JSON.stringify(weddings));
  }
};

export const getUserRegistrations = (userId: string): Registration[] => {
  const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
  return registrations.filter((r: Registration) => r.userId === userId);
};

// Initialize the application with mock data
export const initMockData = () => {
  // Initialize weddings if not already in localStorage
  if (!localStorage.getItem('weddings')) {
    localStorage.setItem('weddings', JSON.stringify(mockWeddings));
  }
  
  // Initialize registrations if not already in localStorage
  if (!localStorage.getItem('registrations')) {
    localStorage.setItem('registrations', JSON.stringify([]));
  }
  
  // Initialize users if not already in localStorage
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
};
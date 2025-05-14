export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would never be stored in state like this
}

export interface Wedding {
  id: string;
  title: string;
  description: string;
  date: string;
  location: {
    country: string;
    city: string;
    venue: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  hosts: {
    name: string;
    photoUrl?: string;
  }[];
  photoUrl: string;
  capacity: number;
  registered: number;
}

export interface Registration {
  id: string;
  userId: string;
  weddingId: string;
  registrationDate: string;
  status: 'confirmed' | 'pending' | 'canceled';
  guests: number;
}

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type WeddingFilters = {
  search: string;
  country: string;
  fromDate: string;
  toDate: string;
};
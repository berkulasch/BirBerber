import { Theme } from '../theme';
import { User } from '../types/user';

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  availableSlots: {
    [date: string]: string[]; // date (YYYY-MM-DD) -> array of times
  };
  location: string;
  services: string[]; // IDs of services offered
}

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    phoneNumber: '+1234567890',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  {
    id: 'u2',
    name: 'Mustafa the Master',
    email: 'mustafa@barber.com',
    role: 'barber',
    phoneNumber: '+1987654321',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mustafa+Master&background=C5A059&color=fff',
  },
  {
    id: 'u3',
    name: 'Admin User',
    email: 'admin@birberber.com',
    role: 'admin',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=000&color=fff',
  },
];

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Haircut', price: 250, duration: 30 },
  { id: '2', name: 'Beard Trim', price: 150, duration: 20 },
  { id: '3', name: 'Hot Towel Shave', price: 200, duration: 30 },
  { id: '4', name: 'Hair + Beard Combo', price: 350, duration: 50 },
  { id: '5', name: 'Full Service Package', price: 500, duration: 75 },
];

export const MOCK_BARBERS: Barber[] = [
  {
    id: '1',
    name: 'Mustafa the Master',
    specialty: 'Classic Cuts & Shaves',
    rating: 4.9,
    imageUrl: 'https://ui-avatars.com/api/?name=Mustafa+Master&background=C5A059&color=fff',
    location: 'Downtown Istanbul',
    availableSlots: {
      '2025-11-12': ['10:00', '11:00', '14:00', '16:00'],
      '2025-11-13': ['09:00', '12:00', '15:00'],
    },
    services: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    name: 'Elegant Cuts',
    specialty: 'Modern Styling',
    rating: 4.7,
    imageUrl: 'https://ui-avatars.com/api/?name=Elegant+Cuts&background=1E1E1E&color=fff',
    location: 'Besiktas',
    availableSlots: {
      '2025-11-12': ['13:00', '14:30', '16:00'],
      '2025-11-13': ['10:00', '11:00', '14:00'],
    },
    services: ['1', '2', '4'],
  },
  {
    id: '3',
    name: 'Golden Scissors',
    specialty: 'Beard Trims & Facials',
    rating: 4.8,
    imageUrl: 'https://ui-avatars.com/api/?name=Golden+Scissors&background=C5A059&color=fff',
    location: 'Kadikoy',
    availableSlots: {
      '2025-11-12': ['09:00', '10:00', '11:00', '12:00'],
      '2025-11-14': ['14:00', '15:00', '16:00'],
    },
    services: ['2', '3', '4'],
  },
];

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
  contactNumber?: string;
  workingHours?: string; // e.g. "09:00 - 18:00"
  services: string[]; // IDs of services offered
}

export interface Appointment {
  id: string;
  barberId: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    gender: 'male',
    phoneNumber: '+1234567890',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  {
    id: 'u2',
    name: 'Mustafa the Master',
    email: 'mustafa@barber.com',
    role: 'barber',
    gender: 'male',
    phoneNumber: '+1987654321',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mustafa+Master&background=C5A059&color=fff',
  },
  {
    id: 'u3',
    name: 'Shop Owner',
    email: 'owner@birberber.com',
    role: 'owner',
    gender: 'male',
    avatarUrl: 'https://ui-avatars.com/api/?name=Shop+Owner&background=000&color=fff',
  },
  {
    id: 'u4',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    gender: 'female',
    phoneNumber: '+9876543210',
    avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
  }
];

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Haircut', price: 250, duration: 30 },
  { id: '2', name: 'Beard Trim', price: 150, duration: 20 },
  { id: '3', name: 'Hot Towel Shave', price: 200, duration: 30 },
  { id: '4', name: 'Hair + Beard Combo', price: 350, duration: 50 },
  { id: '5', name: 'Full Service Package', price: 500, duration: 75 },
  { id: '6', name: 'Ladies Cut', price: 400, duration: 60 },
  { id: '7', name: 'Coloring', price: 800, duration: 120 },
];

export const MOCK_BARBERS: Barber[] = [
  {
    id: '1',
    name: 'Mustafa the Master',
    specialty: 'Classic Cuts & Shaves',
    rating: 4.9,
    imageUrl: 'https://ui-avatars.com/api/?name=Mustafa+Master&background=C5A059&color=fff',
    location: 'Downtown Istanbul',
    contactNumber: '+90 555 111 2233',
    workingHours: '09:00 - 19:00',
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
    contactNumber: '+90 555 444 5566',
    workingHours: '10:00 - 20:00',
    availableSlots: {
      '2025-11-12': ['13:00', '14:30', '16:00'],
      '2025-11-13': ['10:00', '11:00', '14:00'],
    },
    services: ['1', '2', '4', '6', '7'],
  },
  {
    id: '3',
    name: 'Golden Scissors',
    specialty: 'Beard Trims & Facials',
    rating: 4.8,
    imageUrl: 'https://ui-avatars.com/api/?name=Golden+Scissors&background=C5A059&color=fff',
    location: 'Kadikoy',
    contactNumber: '+90 555 777 8899',
    workingHours: '09:00 - 18:00',
    availableSlots: {
      '2025-11-12': ['09:00', '10:00', '11:00', '12:00'],
      '2025-11-14': ['14:00', '15:00', '16:00'],
    },
    services: ['2', '3', '4'],
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    barberId: '1',
    userId: 'u1',
    serviceId: '1',
    date: '2025-11-12',
    time: '10:00',
    status: 'confirmed'
  }
];

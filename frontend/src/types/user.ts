export type UserRole = 'user' | 'barber' | 'owner';

export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gender?: Gender;
  phoneNumber?: string;
  avatarUrl?: string;
}



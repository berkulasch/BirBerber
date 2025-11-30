export type UserRole = 'customer' | 'barber' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
}

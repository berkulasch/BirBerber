import React, { createContext, useState, useContext } from 'react';
import { User, UserRole } from '../types/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: UserRole;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  role: 'user',
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const role = user?.role || 'user';

  return (
    <UserContext.Provider value={{ user, setUser, role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

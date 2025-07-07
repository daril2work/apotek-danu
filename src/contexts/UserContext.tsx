
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'owner' | 'admin' | 'staff';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string;
  branchName?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isOwner: boolean;
  isBranchUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock user data - in real app this would come from authentication
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Staff Apotek',
    email: 'staff@apotek.com',
    role: 'staff', // Change this to 'owner' to see owner view
    branchId: 'branch-1',
    branchName: 'Cabang Utama'
  });

  const isOwner = user?.role === 'owner';
  const isBranchUser = user?.role === 'admin' || user?.role === 'staff';

  return (
    <UserContext.Provider value={{ user, setUser, isOwner, isBranchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

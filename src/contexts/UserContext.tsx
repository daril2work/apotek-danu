
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
  // Determine user type based on current route
  const currentPath = window.location.pathname;
  const isBranchRoute = currentPath.startsWith('/cabang');
  
  const [user, setUser] = useState<User>(
    isBranchRoute ? {
      id: '2',
      name: 'Staff Cabang',
      email: 'staff@cabang.com',
      role: 'staff',
      branchId: 'branch-1',
      branchName: 'Cabang Utama'
    } : {
      id: '1',
      name: 'Owner Apotek',
      email: 'owner@apotek.com',
      role: 'owner'
    }
  );

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

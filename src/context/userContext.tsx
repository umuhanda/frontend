/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import { getuserInfo } from '../utils/getUserInfo';


const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [attempts] = useState({
    totalAttempts: 0,
    maxScore: 0,
    attemptsLeft: '0',
    leftAttempts: 0,
    unLimited: true,
  });

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const data = await getuserInfo();
    setUser(data);
    setLoading(false);
  };

  

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        loading,
        attempts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

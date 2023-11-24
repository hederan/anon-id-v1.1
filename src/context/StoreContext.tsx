import React, { createContext, useState, useContext, useEffect } from 'react';
import { localStorageGet, localStorageSet } from '../utils/localStorage';

interface StoreContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  user: string;
  setUser: (value: string) => void;
}

interface propsType {
  children: React.ReactNode;
}

const StoreContext = createContext<StoreContextProps | null>(null);

const StoreProvider = (props: propsType) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(localStorageGet('isLoggedIn'));
  const [user, setUser] = useState<string>(localStorageGet('username'));

  const setLogged = (flag: boolean) => {
    setLoggedIn(flag);
    localStorageSet('isLoggedIn', flag);
  };

  const setUserName = (user: string) => {
    setUser(user);
  };

  return (
    <StoreContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn: setLogged,
        user,
        setUser: setUserName
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("can't find context");
  }
  return context;
};

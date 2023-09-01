import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface DarkContextType {
  addToDark: () => void;
  darkMode: boolean
}

interface DarkProviderProps {
  children: ReactNode;
}

const DarkContext = createContext<DarkContextType | undefined>(undefined);

export const DarkProvider: FC<DarkProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const addToDark = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkContext.Provider value={ { addToDark, darkMode } }>
      { children }
    </DarkContext.Provider>
  );
};

export function useDark() {
  const context = useContext(DarkContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

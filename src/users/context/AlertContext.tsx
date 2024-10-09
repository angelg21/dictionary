'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Notification from '@/src/users/components/Notification/Notification';

interface AlertContextProps {
  showAlert: (message: string, type: "success" | "error" | "info", description?: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info"; description?: string } | null>(null);
  const [show, setShow] = useState(false);

  const showAlert = (message: string, type: "success" | "error" | "info", description?: string) => {
    setAlert({ message, type, description });
    setShow(true);
    setTimeout(() => setShow(false), 3000); // Hide the notification after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Notification
          show={show}
          type={alert.type}
          message={alert.message}
          description={alert.description}
          onClose={() => setShow(false)}
        />
      )}
    </AlertContext.Provider>
  );
};
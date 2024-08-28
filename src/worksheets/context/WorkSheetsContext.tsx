import React, { createContext, useContext, useState, ReactNode } from "react";

// Definir la forma del contexto
interface WorksheetsContextProps {
  searchTerm: string;
  filterType: string;
  setSearchTerm: (value: string) => void;
  setFilterType: (value: string) => void;
}

// Crear el contexto con un valor por defecto como undefined
const WorksheetsContext = createContext<WorksheetsContextProps | undefined>(undefined);

// Crear un hook personalizado para usar el contexto
export const useWorksheetsContext = () => {
  const context = useContext(WorksheetsContext);
  if (!context) {
    throw new Error("useWorksheetsContext must be used within a WorksheetsProvider");
  }
  return context;
};

// Crear el proveedor del contexto
export const WorksheetsProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('Todos');

  return (
    <WorksheetsContext.Provider value={{ searchTerm, filterType, setSearchTerm, setFilterType }}>
      {children}
    </WorksheetsContext.Provider>
  );
};
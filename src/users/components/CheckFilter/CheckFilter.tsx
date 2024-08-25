"use client";
import React, { useState } from 'react';

interface CheckFilterProps {
  onFilterChange: (selectedRoles: string[]) => void;
}

const CheckFilter: React.FC<CheckFilterProps> = ({ onFilterChange }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleCheckboxChange = (role: string) => {
    setSelectedRoles((prevRoles) => {
      const isSelected = prevRoles.includes(role);
      const updatedRoles = isSelected
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role];

      onFilterChange(updatedRoles); // Llama a la función cuando cambian los filtros
      return updatedRoles;
    });
  };

  return (
    <div className='flex justify-center lg:justify-end'>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[#6B7280] mb-[20px]">Filtrar por:</legend>
        <div className="max-lg:grid max-lg:grid-cols-2 max-lg:gap-12 lg:flex lg:items-center lg:space-x-4">
          <div className="flex items-center">
            <input
              id="admin"
              name="roles"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-d-green focus:ring-d-green"
              onChange={() => handleCheckboxChange('admin')}
            />
            <label htmlFor="admin" className="ml-2 text-sm font-medium text-[#6B7280]">
              Administrador
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="editor"
              name="roles"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-d-green focus:ring-d-green"
              onChange={() => handleCheckboxChange('editor')}
            />
            <label htmlFor="editor" className="ml-2 text-sm font-medium text-[#6B7280]">
              Editor
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="reviewer"
              name="roles"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-d-green focus:ring-d-green"
              onChange={() => handleCheckboxChange('reviewer')}
            />
            <label htmlFor="reviewer" className="ml-2 text-sm font-medium text-[#6B7280]">
              Revisor
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="researcher"
              name="roles"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-d-green focus:ring-d-green"
              onChange={() => handleCheckboxChange('researcher')}
            />
            <label htmlFor="researcher" className="ml-2 text-sm font-medium text-[#6B7280]">
              Investigador
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default CheckFilter;
"use client";
import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar', onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className='w-full lg:max-w-[400px]'>
      <div className="relative rounded-md shadow-sm content-center">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <img src="/assets/magnifying-glass.svg" alt="hide-password-icon"/>
        </div>
        <input
          id="search"
          name="search"
          type="text"
          placeholder={placeholder}
          className="w-full block rounded-md text-sm border-0 py-1.5 pl-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#6B7280] placeholder:font-normal focus:ring-2 focus:ring-inset focus:ring-d-blue lg:text-base lg:leading-6"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
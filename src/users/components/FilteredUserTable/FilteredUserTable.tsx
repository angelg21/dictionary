"use client";
import React, { useState, useEffect } from 'react';
import CheckFilter from "@/src/users/components/CheckFilter/CheckFilter";
import UserTable from "@/src/users/components/UserTable/UserTable";
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  image: string;
}

interface FilteredUserTableProps {
  users: User[];
}

const FilteredUserTable: React.FC<FilteredUserTableProps> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de elementos por página
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let filtered = users;

    if (selectedRoles.length > 0) {
      filtered = filtered.filter((user) =>
        user.roles.some((role) => selectedRoles.includes(role))
      );
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.email.toLowerCase().includes(lowercasedTerm)
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Resetear la página cuando se aplica un filtro o búsqueda
  }, [selectedRoles, searchTerm, users]);

  // Calcular los usuarios de la página actual
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar la página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between min-[1200px]:grid min-[1200px]:grid-cols-2 min-[1200px]:gap-4">
        <SearchBar onSearchChange={setSearchTerm} />
        <CheckFilter onFilterChange={setSelectedRoles} />
      </div>
      <UserTable users={currentUsers} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FilteredUserTable;
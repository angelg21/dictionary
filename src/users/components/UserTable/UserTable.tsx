"use client"
// UserTable.tsx
import React, { useState } from 'react';
import RoleModal from '../RoleModal/RoleModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import { changeUserRole } from '../../actions/change-user-role';
import { deleteUser } from '../../actions/delete-user';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  image: string;
};

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenRoleModal = (user: User) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const handleCloseRoleModal = () => {
    setIsRoleModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveRoles = async (roles: string[]) => {
    if (selectedUser) {
      try {
        await changeUserRole(selectedUser.id, roles);
        return true; 
      } catch (error) {
        console.error('Error al cambiar los roles:', error);
        return false; 
      }
    }
    return false;
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser?.id);
        return true; 
      } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
        return false; 
      }
    }
    return false;
  };
  return (
    <div className="">
      <div className="mt-8 max-lg:flex max-lg:justify-center">
        <div className="overflow-x-auto min-[316px]:max-w-[276px] min-[414px]:max-w-[374px] min-[510px]:max-w-[430px] min-[594px]:max-w-[514px] lg:max-w-[2000px]">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300 overflow-hidden rounded-lg">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                  >
                    USUARIO
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                  >
                    ROLES
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                  >
                    ACCIONES
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0 bg-slate-500 rounded-full">
                          {
                            user.image !== '' ?
                              (<img alt="" src={user.image} className="h-11 w-11 rounded-full object-center object-contain" />)
                              :
                              (<span className="inline-block h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>)
                          }
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="mt-1 text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {user.roles.map((role, index) => {
                          let roleClass = '';
                          let roleText = '';
                          switch (role) {
                            case 'researcher':
                              roleClass = 'bg-green-100 text-green-800';
                              roleText = 'Investigador';
                              break;
                            case 'editor':
                              roleClass = 'bg-blue-100 text-blue-800';
                              roleText = 'Editor';
                              break;
                            case 'admin':
                              roleClass = 'bg-orange-100 text-orange-800';
                              roleText = 'Administrador';
                              break;
                            case 'reviewer':
                              roleClass = 'bg-yellow-100 text-yellow-800';
                              roleText = 'Revisor';
                              break;
                            default:
                              roleClass = 'bg-gray-100 text-gray-800';
                          }
                          return (
                            <span
                              key={index}
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${roleClass}`}
                            >
                              {roleText}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="flex flex-row gap-6 lg:grid lg:grid-cols-2 lg:gap-4">
                        <button
                          className="xl:hidden text-d-blue hover:text-blue-700 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                          onClick={() => handleOpenRoleModal(user)}
                        >
                          <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-blue-700" />
                          </svg>
                        </button>
                        <button
                          className="hidden xl:flex text-d-blue hover:text-blue-700 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                          onClick={() => handleOpenRoleModal(user)}
                        >
                          <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-blue-700" />
                          </svg>
                          Modificar Roles
                        </button>
                        <button
                          className="xl:hidden text-d-red hover:text-red-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                          onClick={() => handleOpenDeleteModal(user)}
                        >
                          <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-red-500" />
                          </svg>
                        </button>
                        <button
                          className="hidden xl:flex text-d-red hover:text-red-500 items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                          onClick={() => handleOpenDeleteModal(user)}
                        >
                          <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-red-500" />
                          </svg>
                          Eliminar Usuario
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isRoleModalOpen && selectedUser && (
        <RoleModal
          user={selectedUser}
          onClose={handleCloseRoleModal}
          onSave={handleSaveRoles}
        />
      )}
      {isDeleteModalOpen && selectedUser && (
        <DeleteModal
          user={selectedUser}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}
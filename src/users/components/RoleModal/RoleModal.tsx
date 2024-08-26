import React, { useState } from 'react';
import RoleCard from '../RoleCard/RoleCard';
import { ButtonComponent } from '@/src/forms/components/Button/Button';
import { useAlert } from '@/src/users/context/AlertContext';

export interface RoleModalProps {
  user: {
    name: string;
    email: string;
    image: string;
    roles: string[];
  };
  onClose: () => void;
  onSave: (roles: string[]) => Promise<boolean>;
}

const RoleModal: React.FC<RoleModalProps> = ({ user, onClose, onSave }) => {
  const [isEditorEnabled, setIsEditorEnabled] = useState(user.roles.includes('editor'));
  const [isReviewerEnabled, setIsReviewerEnabled] = useState(user.roles.includes('reviewer'));
  const [isAdminEnabled, setIsAdminEnabled] = useState(user.roles.includes('admin'));

  const { showAlert } = useAlert();

  const handleSave = async () => {
    const updatedRoles: string[] = [];
    if (isEditorEnabled) updatedRoles.push('editor');
    if (isReviewerEnabled) updatedRoles.push('reviewer');
    if (isAdminEnabled) updatedRoles.push('admin');

    const success = await onSave(updatedRoles);
    if (success) {
      showAlert("Roles guardados con éxito!!!", "success");
    } else {
      showAlert("Error al guardar roles", "error");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
      <div className="bg-white p-6 rounded-md max-w-lg w-full">
        <div className='flex flex-row justify-between mb-9'>
            <h2 className="text-xl font-medium self-center text-d-gray">Gestionar Roles</h2>
            <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="flex items-center mb-9">
        {
            user.image !== '' ?
            (<img
            src={user.image}
            alt={user.name}
            className="h-12 w-12 rounded-full mr-4"
            />)
            :
            (<span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mr-4">
            <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            </span>)
        }
          <div>
            <div className="font-semibold text-[#111827]">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="space-y-4 mb-8">
          <RoleCard
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8898 2.11019L16.5969 1.40309L16.5969 1.40309L15.8898 2.11019ZM4.41667 16.5296V17.5296C4.68188 17.5296 4.93624 17.4242 5.12377 17.2367L4.41667 16.5296ZM1.5 16.5296H0.5C0.5 17.0819 0.947715 17.5296 1.5 17.5296L1.5 16.5296ZM1.5 13.5537L0.792893 12.8466C0.605357 13.0341 0.5 13.2885 0.5 13.5537H1.5ZM13.6506 2.8173C14.0737 2.39423 14.7596 2.39423 15.1827 2.8173L16.5969 1.40309C15.3928 0.198971 13.4405 0.198971 12.2364 1.40309L13.6506 2.8173ZM15.1827 2.8173C15.6057 3.24037 15.6057 3.9263 15.1827 4.34937L16.5969 5.76358C17.801 4.55946 17.801 2.6072 16.5969 1.40309L15.1827 2.8173ZM15.1827 4.34937L3.70956 15.8225L5.12377 17.2367L16.5969 5.76358L15.1827 4.34937ZM4.41667 15.5296H1.5V17.5296H4.41667V15.5296ZM12.2364 1.40309L0.792893 12.8466L2.20711 14.2608L13.6506 2.8173L12.2364 1.40309ZM0.5 13.5537V16.5296H2.5V13.5537H0.5ZM10.9864 4.0673L13.9327 7.01358L15.3469 5.59937L12.4006 2.65309L10.9864 4.0673Z" fill="#003366"/>
              </svg>
            }
            role="Editor"
            description="El editor tiene la responsabilidad de modificar y completar las fichas que se le asignen, utilizando formularios específicos."
            color="#003366"
            enabled={isEditorEnabled}
            onToggle={() => setIsEditorEnabled(!isEditorEnabled)}
          />
          <RoleCard
            icon={
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#DAA520" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }
            role="Revisor"
            description="El revisor se encarga de evaluar y aprobar las fichas finalizadas por los editores."
            color="#DAA520"
            enabled={isReviewerEnabled}
            onToggle={() => setIsReviewerEnabled(!isReviewerEnabled)}
          />
          <RoleCard
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 4.83333C12.4205 4.83333 13.1667 5.57953 13.1667 6.5M16.5 6.5C16.5 9.26142 14.2614 11.5 11.5 11.5C10.9949 11.5 10.5072 11.4251 10.0476 11.2858L8.16667 13.1667H6.5V14.8333H4.83333V16.5H2.33333C1.8731 16.5 1.5 16.1269 1.5 15.6667V13.5118C1.5 13.2908 1.5878 13.0789 1.74408 12.9226L6.71423 7.95244C6.57491 7.49279 6.5 7.00514 6.5 6.5C6.5 3.73858 8.73858 1.5 11.5 1.5C14.2614 1.5 16.5 3.73858 16.5 6.5Z" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }
            role="Administrador"
            description="El administrador es responsable de crear fichas y asignarlas a los editores y revisores, además de gestionar los usuarios y definir sus roles."
            color="#F97316"
            enabled={isAdminEnabled}
            onToggle={() => setIsAdminEnabled(!isAdminEnabled)}
          />
        </div>
        <div className="flex justify-end mt-4 gap-5">
            <ButtonComponent
                bgColor="bg-d-red"
                text="Cancelar"
                width="w-[100px]"
                fontSize="text-sm"
                type='button'
                isDisabled={false}
                onClick={onClose}
                hoverColor="#a51c30"
            />
            <ButtonComponent
                bgColor="bg-d-blue"
                text="Guardar"
                width="w-[100px]"
                fontSize="text-sm"
                type='button'
                isDisabled={false}
                onClick={handleSave}
                hoverColor="#0c2aa6"
            />
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
import React from 'react';
import { useAlert } from '../../context/AlertContext';

interface DeleteModalProps {
  user: {
    name: string;
    email: string;
  };
  onClose: () => void;
  onDelete: () => Promise<boolean>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ user, onClose, onDelete }) => {
  
  const { showAlert } = useAlert();

  const handleDelete = async () => {
    const success = await onDelete();
    if (success) {
      showAlert("Usuario eliminado con éxito!!!", "success");
    } else {
      showAlert("Error al eliminar el usuario", "error");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
      <div className="bg-white p-6 rounded-md max-w-xl w-full">
        <div className="flex items-center mb-4 justify-between">
            <div className='flex flex-row items-center'>
                <svg className='mr-2' width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="40" height="40" rx="20" fill="#FEE2E2"/>
                    <path d="M19.9995 17.5V19.5M19.9995 23.5H20.0095M13.0713 27.5H26.9277C28.4673 27.5 29.4296 25.8333 28.6598 24.5L21.7316 12.5C20.9618 11.1667 19.0373 11.1667 18.2675 12.5L11.3393 24.5C10.5695 25.8333 11.5317 27.5 13.0713 27.5Z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 ml-2">Eliminar Usuario</h2>
            </div>
            <svg onClick={onClose} className='cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <p className="text-gray-600 mb-4">
            ¿Estás seguro de que deseas eliminar este usuario? Este será eliminado permanentemente de nuestros servidores para siempre. Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-sm bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
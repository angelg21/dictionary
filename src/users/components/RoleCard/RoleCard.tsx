import React from 'react';
import { Switch } from '@headlessui/react';

interface RoleCardProps {
  icon: React.ReactNode;
  role: string;
  description: string;
  color: string;
  enabled: boolean;
  onToggle: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, role, description, color, enabled, onToggle }) => {
  return (
    <div className={`border-2 rounded-lg p-3 flex items-center space-x-4`} style={{ borderColor: color }}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <span className="text-sm min-[1300px]:text-base font-medium">
            {role}
          </span>
        </div>
        <div className="text-gray-600 text-xs min-[1300px]:text-sm">
          {description}
        </div>
      </div>
      <Switch
        checked={enabled}
        onChange={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{ backgroundColor: enabled ? color : '#E5E7EB' }} // #E5E7EB es gris claro
      >
        <span className="sr-only">Toggle role</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </Switch>
    </div>
  );
};

export default RoleCard;
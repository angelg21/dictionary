import React from 'react';
import { XCircleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { AlertProps } from '../../interface/AlertProps';

/**
 * ErrorAlert is a customizable alert component built with React.
 * This component supports different types of alerts including error, success, and info.
 * 
 * @param {ErrorAlertProps} props - The properties for customizing the alert.
 * @returns {JSX.Element} A JSX element representing a customizable alert.
 */
export const Alert: React.FC<AlertProps> = ({ type, text }) => {
  let bgColor, textColor, Icon;

  switch (type) {
    case "error":
      bgColor = "bg-red-50";
      textColor = "text-red-800";
      Icon = XCircleIcon;
      break;
    case "success":
      bgColor = "bg-green-50";
      textColor = "text-green-800";
      Icon = CheckCircleIcon;
      break;
    case "info":
      bgColor = "bg-blue-50";
      textColor = "text-blue-800";
      Icon = InformationCircleIcon;
      break;
    default:
      bgColor = "bg-red-50";
      textColor = "text-red-800";
      Icon = XCircleIcon;
      break;
  }

  return (
    <div className={`rounded-md ${bgColor} p-2`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon aria-hidden="true" className={`h-5 w-5 ${textColor}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${textColor}`}>{text}</h3>
        </div>
      </div>
    </div>
  );
};
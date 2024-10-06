'use client'
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="bg-gray-200 dark:bg-[#4A4A4A] p-3 rounded-2xl">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 dark:bg-[#6E6E6E] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 dark:bg-[#6E6E6E] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 dark:bg-[#6E6E6E] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;

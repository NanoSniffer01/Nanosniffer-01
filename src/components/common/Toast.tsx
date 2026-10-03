import { useEffect, useState } from 'react';
import { X, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center bg-gray-900 text-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300">
      <Info className="h-5 w-5 text-blue-400 mr-3" />
      <span className="text-sm font-medium mr-6">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo semitransparente que cierra el modal al hacer click */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* Contenedor del modal */}
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-xl w-full relative">
        {/* Botón de cerrar (opcional) */}
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

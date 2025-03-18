// /webapps/infoEmplo-venv/infoEmplo/frontend/src/context/CRMContext.tsx
import React, { useState, Dispatch, SetStateAction } from 'react';

// Define el estado de autenticación
interface AuthState {
  token: string;
  auth: boolean;
  esReclutador: boolean; // <-- Agregamos la propiedad
  correo:string;
}

// Define el tipo del contexto
type CRMContextType = [AuthState, Dispatch<SetStateAction<AuthState>>];

// Crea el contexto con un tipo inicial opcional
const CRMContext = React.createContext<CRMContextType | undefined>(undefined);

// Define las propiedades del proveedor
const CRMProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Definir el estado inicial
  const [auth, guardarAuth] = useState<AuthState>({
    token: '',
    auth: false,
    esReclutador: false, // <-- Valor inicial
    correo:'',
  });

  return (
    <CRMContext.Provider value={[auth, guardarAuth]}>
      {children}
    </CRMContext.Provider>
  );
};

export { CRMContext, CRMProvider };



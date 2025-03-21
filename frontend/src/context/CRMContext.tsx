// /webapps/infoEmplo-venv/infoEmplo/frontend/src/context/CRMContext.tsx
import React, { useState, Dispatch, SetStateAction } from 'react';

// (Opcional) Si quieres tipar el usuario más a detalle, puedes definirlo aquí
interface Usuario {
  _id?: string;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  correo?: string;
  telefono?: string;
  esReclutador?: boolean;
  hojaVida?: string;
  fotoPerfil?: string;
  // etc...
}



// Define el estado de autenticación con la propiedad "user"
export interface AuthState {
  token: string;
  auth: boolean;
  esReclutador: boolean;
  correo: string;
  user?: Usuario;  // <-- se agrega esta propiedad
}

// Define el tipo del contexto (array con [state, setState])
export type CRMContextType = [AuthState, React.Dispatch<React.SetStateAction<AuthState>>];


// Crea el contexto con un valor inicial opcional
const CRMContext = React.createContext<CRMContextType | undefined>(undefined);


// Define las propiedades del proveedor
const CRMProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Definir el estado inicial
  const [auth, guardarAuth] = useState<AuthState>({
    token: '',
    auth: false,
    esReclutador: false,
    correo: '',
    user: undefined, // Valor inicial de user
  });

  return (
    <CRMContext.Provider value={[auth, guardarAuth]}>
      {children}
    </CRMContext.Provider>
  );
};

export { CRMContext, CRMProvider };



// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/NOAsideright.tsx
import { Component } from 'react';
import clienteAxios from '../../config/axios';

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

interface NOAsiderightState {
  usuarios: Usuario[];
}

export class NOAsideright extends Component<{}, NOAsiderightState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      usuarios: [],
    };
  }

  componentDidMount() {
    // Se asume que el endpoint /usuarios devuelve un arreglo de usuarios (empresas)
    clienteAxios.get('/usuarios')
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          this.setState({ usuarios: res.data });
        }
      })
      .catch(err => console.error("Error al obtener usuarios:", err));
  }

  render() {
    const { usuarios } = this.state;

    return (
      <aside className="sticky top-8 hidden w-44 shrink-0 xl:block border-4 border-gray-400 mt-[70px]">
        <ul className="">
          {usuarios.map(usuario => {
            const imageUrl = usuario.fotoPerfil
              ? `http://localhost:5000/uploads/${usuario.fotoPerfil}`
              : "https://via.placeholder.com/256";
            return (
              <li key={usuario._id} className="flex  items-center text-gray-900 text-sm my-2 border-b border-gray-200 pb-2">
                <div className="shrink-0">
                  <img
                    alt="Imagen de la empresa"
                    src={imageUrl}
                    className="size-8 mx-1"
                  />
                </div>
                <span className="ml-2 font-bold text-sm">{usuario.nombre}</span>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
}

export default NOAsideright;
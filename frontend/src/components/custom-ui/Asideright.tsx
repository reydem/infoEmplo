// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/custom-ui/Asideright.tsx
import { Component } from 'react';
import clienteAxios from '../../config/axios';

interface Vacante {
  _id: string;
  titulo: string;
  imagen_empresa: string;
}

interface AsiderightState {
  vacantes: Vacante[];
}

export class Asideright extends Component<{}, AsiderightState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      vacantes: [],
    };
  }

  componentDidMount() {
    // Se asume que el endpoint /vacantes devuelve un arreglo de vacantes (empresas)
    clienteAxios.get('/vacantes')
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          this.setState({ vacantes: res.data });
        }
      })
      .catch(err => console.error("Error al obtener vacantes:", err));
  }

  render() {
    const { vacantes } = this.state;

    return (
      <aside className="sticky top-8 hidden w-44 shrink-0 xl:block border-4 border-gray-400 mt-[70px]">
        <ul className="">
          {vacantes.map(vacante => {
            const imageUrl = vacante.imagen_empresa
              ? `http://localhost:5000/uploads/${vacante.imagen_empresa}`
              : "https://via.placeholder.com/256";
            return (
              <li key={vacante._id} className="flex  items-center text-gray-900 text-sm my-2 border-b border-gray-200 pb-2">
                <div className="shrink-0">
                  <img
                    alt="Imagen de la empresa"
                    src={imageUrl}
                    className="size-8 mx-1"
                  />
                </div>
                <span className="ml-2 font-bold text-sm">{vacante.titulo}</span>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
}

export default Asideright;
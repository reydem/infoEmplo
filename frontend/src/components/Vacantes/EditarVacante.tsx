// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/EditarVacante.tsx
import { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

function EditarVacante() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacante, guardarVacante] = useState<{
    titulo: string;
    salario_ofrecido: string;
    imagen_empresa: string;
  } | null>(null);
  const [archivo, guardarArchivo] = useState<File | null>(null);
  const [error, setError] = useState(false);

  const consultarAPI = async () => {
    try {
      const vacanteConsulta = await clienteAxios.get(`/vacantes/${id}`);
      guardarVacante(vacanteConsulta.data);
      setError(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setError(true);
      } else {
        console.error('Error desconocido:', error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const editarVacante = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', vacante!.titulo);
    formData.append('salario_ofrecido', vacante!.salario_ofrecido);
    if (archivo) {
      formData.append('imagen_empresa', archivo);
    }

    // Depuración: Ver los datos enviados
    console.log('Datos enviados:', Array.from(formData.entries()));

    try {
      const res = await clienteAxios.put(`/vacantes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        Swal.fire('Editado Correctamente', res.data.mensaje, 'success');
        navigate('/vacantes');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo',
      });
    }
  };

  const leerInformacionVacante = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (vacante) {
      guardarVacante({
        ...vacante,
        [e.target.name]: e.target.value,
      });
    }
  };

  const leerArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      guardarArchivo(e.target.files[0]);
    }
  };

  if (vacante === null && !error) return <Spinner />;

  if (error) {
    return <h2>No se pudo cargar la información de la vacante. Verifica el ID.</h2>;
  }

  const { titulo, salario_ofrecido, imagen_empresa } = vacante!;

  return (
    <Fragment>
      <h2>Editar Vacante</h2>
      <form onSubmit={editarVacante}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Título:</label>
          <input
            type="text"
            placeholder="Título de la vacante"
            name="titulo"
            onChange={leerInformacionVacante}
            defaultValue={titulo}
          />
        </div>
        <div className="campo">
          <label>Salario Ofrecido:</label>
          <input
            type="number"
            name="salario_ofrecido"
            min="0.00"
            step="0.01"
            placeholder="Salario Ofrecido"
            onChange={leerInformacionVacante}
            defaultValue={salario_ofrecido}
          />
        </div>
        <div className="campo">
          <label>Imagen Empresa:</label>
          {imagen_empresa ? (
            <img
              src={`http://localhost:5000/uploads/${imagen_empresa}`}
              alt="Imagen Empresa"
              width="300"
            />
          ) : null}
          <input type="file" name="imagen_empresa" onChange={leerArchivo} />
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Editar Vacante" />
        </div>
      </form>
    </Fragment>
  );
}

export default EditarVacante;




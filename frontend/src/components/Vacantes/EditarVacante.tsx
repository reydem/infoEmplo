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
  const [producto, guardarProducto] = useState<{
    nombre: string;
    precio: string;
    imagen: string;
  } | null>(null); // Estado inicial como null para diferenciar entre "cargando" y datos vacíos
  const [archivo, guardarArchivo] = useState<File | null>(null);
  const [error, setError] = useState(false); // Nuevo estado para manejar errores

  const consultarAPI = async () => {
    try {
      const productoConsulta = await clienteAxios.get(`/vacantes/${id}`);
      guardarProducto(productoConsulta.data);
      setError(false); // Si hay datos, no hay error
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setError(true); // Si es 404, activa el estado de error
      } else {
        console.error('Error desconocido:', error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  const editarProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', producto!.nombre);
    formData.append('precio', producto!.precio);
    if (archivo) {
      formData.append('imagen', archivo);
    }
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

  const leerInformacionProducto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (producto) {
      guardarProducto({
        ...producto,
        [e.target.name]: e.target.value,
      });
    }
  };

  const leerArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      guardarArchivo(e.target.files[0]);
    }
  };

  // Si el producto es null, mostramos un spinner (cargando)
  if (producto === null && !error) return <Spinner />;

  // Si hay un error, mostramos un mensaje en lugar de la interfaz
  if (error) {
    return <h2>No se pudo cargar la información del producto. Verifica el ID.</h2>;
  }

  // Si tenemos datos válidos, desestructuramos y renderizamos la interfaz
  const { nombre, precio, imagen } = producto!;

  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={nombre}
          />
        </div>
        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInformacionProducto}
            defaultValue={precio}
          />
        </div>
        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300" />
          ) : null}
          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Editar Producto" />
        </div>
      </form>
    </Fragment>
  );
}

export default EditarVacante;



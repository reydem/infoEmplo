// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/NuevoVacante.tsx
import { useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

function NuevoVacante() {
  //producto = state, guardarProducto = setstate
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: ''
  });
  // archivo = state, guardarArchivo = setState
  const [archivo, guardarArchivo] = useState<File | null>(null);
  const navigate = useNavigate(); // Usar useNavigate en lugar de props.history

  const agregarProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    if (archivo) {
        formData.append('imagen', archivo);
    }
    try {
        const res = await clienteAxios.post('/vacantes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res);
        if (res.status === 200) {
            Swal.fire(
                'Agregado Correctamente',
                res.data.mensaje,
                'success'
            );
        }
        navigate('/vacantes');
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Vuelva a intentarlo'
        });
    }
};


  // leer los datos del formulario
  const leerInformacionProducto = (e: React.ChangeEvent<HTMLInputElement>) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
    console.log(producto);
  };
  // coloca la imagen en el state
  const leerArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      guardarArchivo(e.target.files[0]);
    }
  };



  return (
    <Fragment>
      <h2>Nuevo Producto</h2>
      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
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
          />
        </div>
        <div className="campo">
          <label>Imagen:</label>
          <input
            type="file"
            name="imagen"
            onChange={leerArchivo}
          />
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
}
export default NuevoVacante;

// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/EditarVacante.tsx
import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import { useParams } from 'react-router-dom';

function EditarVacante() {
  // obtener el ID
  const { id } = useParams();
  // producto = state, y funcion para actualizar
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });
  // consultar la api para traer el producto a editar
  const consultarAPI = async () => {
    try {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      console.log(productoConsulta);
      guardarProducto(productoConsulta.data);
    } catch (error) {
      console.error('Error al consultar el producto:', error);
    }
  };
  // cuando el componente carga
  useEffect(() => {
    consultarAPI();
  }, []);
  return (<h2>EditarProducto</h2>);
}

export default EditarVacante

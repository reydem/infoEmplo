// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Ofertas/NuevaOferta.tsx
import { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';


function NuevaOferta() {

  // Extraer el ID de cliente desde los parámetros de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState('');
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  useEffect(() => {
    // obtener el cliente
    const consultarAPI = async () => {
      try {
        // consultar el cliente actual
        const resultado = await clienteAxios.get(`/empleados/${id}`);
        // console.log(resultado);                
        guardarCliente(resultado.data);
      } catch (error) {
        console.error("Error al consultar el cliente:", error);
      }
    };

    // llamar a la api
    consultarAPI();
    // actualizar el total a pagar
    actualizarTotal();

  }, [productos]); // Asegúrate de incluir `id` como dependencia

  const buscarProducto = async e => {
    e.preventDefault();

    // obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(`/vacantes/busqueda/${busqueda}`);

    // si no hay resultados una alerta, contrario agregarlo al state
    if (resultadoBusqueda.data[0]) {

      // console.log(resultadoBusqueda.data[0]);

      let productoResultado = resultadoBusqueda.data[0];
      // agregar la llave "producto" (copia de id)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      //  console.log(productoResultado);

      // ponerlo en el state
      guardarProductos([...productos, productoResultado]);




    } else {
      // no hay resultados
      Swal.fire({
        icon: 'error',
        title: 'No Resultados',
        text: 'No hay resultados'
      })
    }
  }


  // almacenar una busqueda en el state
  const leerDatosBusqueda = e => {
    guardarBusqueda(e.target.value);
  }

  // actualizar la cantidad de productos
  const restarProductos = i => {
    // copiar el arreglo original de productos
    const todosProductos = [...productos];
    // validar si esta en 0 no puede ir mas alla
    if (todosProductos[i].cantidad === 0) return;

    // decremento
    todosProductos[i].cantidad--;

    // almacenarlo en el state
    guardarProductos(todosProductos);
  }

  const aumentarProductos = i => {
    // copiar el arreglo para no mutar el original
    const todosProductos = [...productos];
    // incremento
    todosProductos[i].cantidad++;
    // almacenarlo en el state
    guardarProductos(todosProductos);
  }

  // Actualizar el total a pagar
  const actualizarTotal = () => {
    // si el arreglo de productos es igual 0: el total es 0
    if (productos.length === 0) {
      guardarTotal(0);
      return;
    }
    // calcular el nuevo total
    let nuevoTotal = 0;

    // recorrer todos los productos, sus cantidades y precios
    productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

    // almacenar el Total
    guardarTotal(nuevoTotal);
  }
  // Almacena el pedido en la BD
  const realizarPedido = async e => {
    e.preventDefault();
    // extraer el ID
    const pedidoClienteId = id;
    // construir el objeto
    const pedido = {
        "cliente": pedidoClienteId,
        "pedido": productos,
        "total": total
    }
    // almacenarlo en la BD
    const resultado = await clienteAxios.post(`/ofertas/nuevo/${id}`, pedido);
    // leer resultado
    if (resultado.status === 200) {
        // alerta de todo bien
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: resultado.data.mensaje
        })
    } else {
        // alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Hubo un Error',
            text: 'Vuelva a intentarlo'
        })
    }
    navigate('/productos');
}


  return (
    <div>
      <Fragment>
                <h2>Nuevo Pedido</h2>

                <div className="ficha-cliente">
                    <h3>Datos de Cliente</h3>
                    <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                    <p>Teléfono: {cliente.telefono}</p>
                </div>

                <FormBuscarProducto
                    buscarProducto={buscarProducto}
                    leerDatosBusqueda={leerDatosBusqueda}
                />
                <ul className="resumen">
                    {productos.map((producto, index) => (
                        <FormCantidadProducto
                            key={producto.producto}
                            producto={producto}
                            restarProductos={restarProductos}
                            aumentarProductos={aumentarProductos}
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                        />
                    ))}


                </ul>
                <p className="total">Total a Pagar: <span>$ {total}</span> </p>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
                </div>
                {total > 0 ? (
                    <form
                        onSubmit={realizarPedido}
                    >
                        <input type="submit"
                            className="btn btn-verde btn-block"
                            value="Realizar Pedido" />
                    </form>
                ) : null}

            </Fragment>
    </div>
  );
}

export default NuevaOferta;


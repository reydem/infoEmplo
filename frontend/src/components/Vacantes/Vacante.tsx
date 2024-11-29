// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Vacantes/Vacantes.tsx
import { Link } from 'react-router-dom';
function Vacante({ producto }) {
  // elimina un producto
  const eliminarProducto = id => {
      console.log('Eliminado...', id);
      
  }
  const { _id, nombre, precio, imagen } = producto;
  return (
      <li className="producto">
          <div className="info-producto">
              <p className="nombre">{nombre}</p>
              <p className="precio">$ {precio}</p>
              {imagen ? (
                  <img src={`http://localhost:5000/${imagen}`} alt="imagen" />
              ) : null}
          </div>
          <div className="acciones">
              <Link to={`/vacantes/editar/${_id}`} className="btn btn-azul">
                  <i className="fas fa-pen-alt"></i>
                  Editar Producto
              </Link>
              <button 
                  type="button" 
                  className="btn btn-rojo btn-eliminar"
                  onClick={() => eliminarProducto(_id) }
              >
                  <i className="fas fa-times"></i>
                  Eliminar Cliente
              </button>
          </div>
      </li>
  );
}

export default Vacante;

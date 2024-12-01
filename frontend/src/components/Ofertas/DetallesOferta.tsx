

function DetallesOferta({ pedido }) {
    const { cliente } = pedido;

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: 0192019201291201</p>
                <p className="nombre">Cliente: {cliente?.nombre || 'N/A'} {cliente?.apellido || 'N/A'}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido?.pedido?.map((articulos, index) => (
                            <li key={articulos.producto?._id || index}>
                                <p>{articulos.producto?.nombre || 'Producto desconocido'}</p>
                                <p>Precio: ${articulos.producto?.precio || 'N/A'}</p>
                                <p>Cantidad: {articulos.cantidad || 'N/A'}</p>
                            </li>
                        )) || <p>No hay artículos en el pedido</p>}
                    </ul>
                </div>
                <p className="total">Total: ${pedido.total} </p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
}

export default DetallesOferta

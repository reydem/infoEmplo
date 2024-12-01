// /webapps/infoEmplo-venv/infoEmplo/frontend/src/components/Ofertas/Ofertas.tsx
import { useEffect, useState, Fragment, useContext } from 'react';
import clienteAxios from '../../config/axios';
import DetallesOferta from './DetallesOferta';
import { CRMContext } from '../../context/CRMContext';

// Define la estructura de las ofertas
interface Oferta {
    _id: string;
    titulo: string;
    descripcion: string;
    [key: string]: any; // Propiedades adicionales opcionales
}

function Ofertas() {
    const [ofertas, guardarOfertas] = useState<Oferta[]>([]);
    const crmContext = useContext(CRMContext);

    if (!crmContext) {
        throw new Error('CRMContext debe ser usado dentro de un CRMProvider');
    }

    const [auth] = crmContext;

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const resultado = await clienteAxios.get('/pedidos', {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });
                guardarOfertas(resultado.data);
            } catch (error: any) {
                console.error('Error al consultar la API:', error);
            }
        };

        consultarAPI();
    }, [auth.token]);

    return (
        <Fragment>
            <h2>Ofertas</h2>

            <ul className="listado-ofertas">
                {ofertas.map((oferta) => (
                    <DetallesOferta
                        key={oferta._id}
                        pedido={oferta}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Ofertas;



import React from 'react';

interface Vacante {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen_empresa?: string;
}

interface VacanteListProps {
    vacantes?: Vacante[];
}

const VacanteList: React.FC<VacanteListProps> = ({ vacantes = [] }) => {
    return (
        <div className="space-y-6">
            {vacantes.length > 0 ? (
                vacantes.map((vacante) => (
                    <figcaption key={vacante._id} className="flex items-center space-x-4 border p-4 rounded-lg shadow-md">
                        <img
                            alt={vacante.titulo}
                            src={vacante.imagen_empresa
                                ? `http://localhost:5000/uploads/${vacante.imagen_empresa}`
                                : "https://via.placeholder.com/150"
                            }
                            className="size-14 rounded-full bg-gray-50 mt-3"
                        />
                        <div className="text-base">
                            <div className="font-semibold text-gray-900">{vacante.titulo}</div>
                            <div className="mt-1 text-gray-500">{vacante.descripcion}</div>
                        </div>
                    </figcaption>
                ))
            ) : (
                <p className="text-gray-500">No hay vacantes disponibles.</p>
            )}
        </div>
    );
}

export default VacanteList;

// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/paginationController.js
import Vacantes from '../models/Vacantes.js';
import Usuarios from '../models/Usuarios.js'; // ✅ Importamos el modelo de Usuarios

export const getPaginatedData = async (req, res, entity = 'vacantes') => {
    try {
        let { page = 1, limit = 1 } = req.query;

        // Convertir valores a enteros
        page = parseInt(page);
        limit = parseInt(limit);

        // Evitar valores inválidos
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 1;

        // Calcular el salto (skip)
        const skip = (page - 1) * limit;

        // Seleccionar el modelo basado en el parámetro de la ruta
        let Model;
        if (entity === 'usuarios') {
            Model = Usuarios;
        } else {
            Model = Vacantes; // Por defecto, usa Vacantes
        }

        // Obtener datos paginados
        const results = await Model.find().skip(skip).limit(limit).exec();

        // Contar el total de registros
        const totalDocs = await Model.countDocuments();

        // Calcular páginas totales
        const totalPages = Math.ceil(totalDocs / limit);

        // Enviar respuesta JSON
        res.json({
            entity,
            page,
            limit,
            totalPages,
            totalDocs,
            data: results,
        });

    } catch (error) {
        console.error(`❌ Error en paginación de ${entity}:`, error);
        res.status(500).json({ mensaje: 'Error interno del servidor', error });
    }
};

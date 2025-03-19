// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/paginationController.js
// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/paginationController.js
import Vacantes from '../models/Vacantes.js';
import Usuarios from '../models/Usuarios.js';

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

    // Seleccionar el modelo y el filtro
    let Model;
    let query = {};

    if (entity === 'usuarios') {
      Model = Usuarios;
      // Filtrar solo postulantes (no reclutadores)
      query = { esReclutador: false };
    } else {
      Model = Vacantes; // Por defecto, usa Vacantes
    }

    // Obtener datos paginados con el filtro
    const results = await Model.find(query).skip(skip).limit(limit).exec();

    // Contar el total de registros (con el mismo filtro)
    const totalDocs = await Model.countDocuments(query);

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

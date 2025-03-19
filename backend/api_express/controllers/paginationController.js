import Vacantes from '../models/Vacantes.js'; // ✅ Importar con ES Modules

export const getPaginatedData = async (req, res) => {
    try {
        // Extraer los parámetros de la consulta (query params)
        let { page = 1, limit = 10 } = req.query;

        // Convertirlos a número
        page = parseInt(page);
        limit = parseInt(limit);

        // Calcular el número de documentos a omitir (skip)
        const skip = (page - 1) * limit;

        // Obtener datos paginados de la base de datos
        const results = await Vacantes.find()
            .skip(skip)
            .limit(limit)
            .exec();

        // Contar el total de documentos
        const totalDocs = await Vacantes.countDocuments();

        // Calcular el total de páginas
        const totalPages = Math.ceil(totalDocs / limit);

        // Enviar respuesta
        res.json({
            page,
            limit,
            totalPages,
            totalDocs,
            data: results,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos paginados', error });
    }
};

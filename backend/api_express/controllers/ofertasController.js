// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/ofertasController.js
const Ofertas = require('../models/Ofertas');

exports.nuevaOferta = async (req, res, next) => {
    const oferta = new Ofertas(req.body);
    try {
        await oferta.save();
        res.json({mensaje : 'Se agregó una nueva oferta'});
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.mostrarOferta = async (req, res, next) => {
    try {
        const oferta = await Ofertas.findById(req.params.idOferta)
            .populate('empleado')
            .populate('vacante.vacante'); // Cambiar a vacante.vacante para referenciar correctamente el path

        if (!oferta) {
            res.json({ mensaje: 'Esta oferta no existe' });
            return next();
        }

        res.json(oferta);
    } catch (error) {
        console.log(error);
        next();
    }
};
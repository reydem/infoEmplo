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
// Muestra todos los pedidos
exports.mostrarOfertas = async (req, res, next) => {
    try {
        const ofertas = await Ofertas.find({}).populate('empleado').populate({
            path: 'oferta.vacante',
            model: 'Vacantes'
        });
        res.json(ofertas);
    } catch (error) {
        console.log(error);
        next();
    }
}

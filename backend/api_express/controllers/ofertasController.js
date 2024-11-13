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
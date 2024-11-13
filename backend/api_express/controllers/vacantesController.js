// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/vacantesController.js
const Vacantes = require('../models/Vacantes');

exports.nuevoVacante = async (req, res, next) => {
  const vacante = new Vacantes(req.body);
  try {
    await vacante.save();
    res.json({ mensaje: 'Se agregó un nuevo vacante' });
  } catch (error) {
    console.log(error);
    next();
  }
};
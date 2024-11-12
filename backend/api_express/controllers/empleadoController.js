// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/empleadoController.js
const Empleados = require('../models/Empleado');
exports.nuevoEmpleado = async (req, res, next) => {
    console.log(req.body);
    const empleado = new Empleados(req.body);
    try {
        await empleado.save();
        res.json({ mensaje: 'Se agregó un nuevo Empleado' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
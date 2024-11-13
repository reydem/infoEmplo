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
// Muestra todos los Empleados
exports.mostrarEmpleados = async (req, res, next) => {
  try {
    const empleados = await Empleados.find({});
    res.json(empleados);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Muestra un empleado en espefifico por su (ID)
exports.mostrarEmpleado = async (req, res, next) => {
  try {
    const empleado = await Empleados.findById(req.params.idEmpleado);
    if (!empleado) {
      return res.json({ mensaje: 'Ese empleado no existe' });
    }
    res.json(empleado);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.actualizarEmpleado = async (req, res, next) => {
  try {
    const empleado = await Empleados.findOneAndUpdate(
      { _id: req.params.idEmpleado },
      req.body,
      { new: true }
    );
    res.json(empleado);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.eliminarEmpleado = async (req, res, next) => {
  try {
    await Empleados.findOneAndDelete({ _id: req.params.idEmpleado });
    res.json({ mensaje: 'El empleado se ha eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};
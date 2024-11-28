// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/controllers/empleadoController.js
import Empleados from '../models/Empleado.js';
export const nuevoEmpleado = async (req, res, next) => {
  console.log(req.body);
  const empleado = new Empleados(req.body);
  try {
    await empleado.save();
    res.json({ mensaje: 'Se agregó un nuevo Empleado' });
  } catch (error) {
    if (error.code === 11000) {
      // Error de clave duplicada
      res.status(400).json({
        mensaje: 'Ese cliente ya está registrado',
        code: 11000
      });
    } else {
      console.log(error);
      next(error); // Manejamos otros tipos de errores
    }
  }
};
// Muestra todos los Empleados
export const mostrarEmpleados = async (req, res, next) => {
  try {
    const empleados = await Empleados.find({});
    res.json(empleados);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Muestra un empleado en espefifico por su (ID)
export const mostrarEmpleado = async (req, res, next) => {
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

export const actualizarEmpleado = async (req, res, next) => {
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
export const eliminarEmpleado = async (req, res, next) => {
  try {
    await Empleados.findOneAndDelete({ _id: req.params.idEmpleado });
    res.json({ mensaje: 'El empleado se ha eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};
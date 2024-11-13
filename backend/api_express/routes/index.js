// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/routes/index.js
const express = require("express");
const router = express.Router();
const empleadoController = require('../controllers/empleadoController'); // Asegúrate de tener la ruta correcta
const vacantesController = require('../controllers/vacantesController');


module.exports = function() {
    // Agregar nuevo empleado 
    router.post('/empleados', empleadoController.nuevoEmpleado); 
    // Obtener todos los empleados 
    router.get('/empleados', empleadoController.mostrarEmpleados);
    // Muestra un empleado en espefifico por su (ID)
    router.get('/empleados/:idEmpleado', empleadoController.mostrarEmpleado);
    // Actualiza empleado 
    router.put('/empleados/:idEmpleado', empleadoController.actualizarEmpleado);
    // Eliminar cliente 
    router.delete('/empleados/:idEmpleado', empleadoController.eliminarEmpleado);
    /** vacantes */
    // nuevos vacantes
    router.post('/vacantes', vacantesController.nuevoVacante );

    return router;
};

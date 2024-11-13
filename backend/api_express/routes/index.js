// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/routes/index.js
const express = require("express");
const router = express.Router();
const empleadoController = require('../controllers/empleadoController'); // Asegúrate de tener la ruta correcta

module.exports = function() {
    // Agregar nuevo empleado 
    router.post('/empleados', empleadoController.nuevoEmpleado); 
    // Obtener todos los empleados 
    router.get('/empleados', empleadoController.mostrarEmpleados);

    return router;
};

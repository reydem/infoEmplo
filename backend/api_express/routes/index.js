// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/routes/index.js
import express from "express";
import * as empleadoController from "../controllers/empleadoController.js"; 
import * as vacantesController from "../controllers/vacantesController.js";
import * as ofertasController from "../controllers/ofertasController.js";
import * as usuariosController from '../controllers/usuariosController.js';

// Middleware para proteger rutas
import auth from '../middleware/auth.js';

const router = express.Router();

const routes = () => {
    /** EMPLEADOS */
    router.post('/empleados', empleadoController.nuevoEmpleado);
    router.get('/empleados', empleadoController.mostrarEmpleados);
    router.get('/empleados/:idEmpleado', empleadoController.mostrarEmpleado);
    router.put('/empleados/:idEmpleado', empleadoController.actualizarEmpleado);
    router.delete('/empleados/:idEmpleado', empleadoController.eliminarEmpleado);

    /** VACANTES */
    router.post('/vacantes', 
        auth, // Solo usuarios autenticados
        vacantesController.subirArchivo, 
        vacantesController.nuevoVacante
    );
    router.get('/vacantes', vacantesController.mostrarVacantes);
    router.get('/vacantes/:idVacante', vacantesController.mostrarVacante);
    router.put('/vacantes/:idVacante', 
        auth, // Solo usuarios autenticados
        vacantesController.subirArchivo, 
        vacantesController.actualizarVacante
    );
    router.delete('/vacantes/:idVacante', auth, vacantesController.eliminarVacante);
    
    // Postulación a una vacante
    router.post('/vacantes/:idVacante/postular', auth, vacantesController.postularVacante);

    /** OFERTAS */
    router.post('/ofertas/nuevo/:idUsuario', ofertasController.nuevaOferta);
    router.get('/ofertas', ofertasController.mostrarOfertas);
    router.get('/ofertas/:idOferta', ofertasController.mostrarOferta);
    router.put('/ofertas/:idOferta', ofertasController.actualizarOferta);
    router.delete('/ofertas/:idOferta', ofertasController.eliminarOferta);
    router.post('/ofertas/busqueda/:query', ofertasController.buscarOferta);

    /** USUARIOS */
    router.post('/crear-cuenta', vacantesController.subirArchivo, usuariosController.registrarUsuario);
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);
    router.get('/usuarios', usuariosController.obtenerUsuarios);

    return router;
};

export default routes;

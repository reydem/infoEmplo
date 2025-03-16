// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/routes/index.js
import express from "express";
import * as empleadoController from "../controllers/empleadoController.js"; // Asegúrate de tener la ruta correcta
import * as vacantesController from "../controllers/vacantesController.js";
import * as ofertasController from "../controllers/ofertasController.js";
import * as usuariosController from '../controllers/usuariosController.js';


// middle para proteger las rutas
import auth from '../middleware/auth.js';

const router = express.Router();



const routes = () => {
    // Agregar nuevo empleado 
    router.post('/empleados', empleadoController.nuevoEmpleado);
    // Obtener todos los empleados 
    router.get('/empleados',  empleadoController.mostrarEmpleados);
    // Muestra un empleado en espefifico por su (ID)
    router.get('/empleados/:idEmpleado',  empleadoController.mostrarEmpleado);
    // Actualiza empleado 
    router.put('/empleados/:idEmpleado',  empleadoController.actualizarEmpleado);
    // Eliminar cliente 
    router.delete('/empleados/:idEmpleado',  empleadoController.eliminarEmpleado);
    /** vacantes */
    // nuevos vacantes
    router.post('/vacantes',  vacantesController.subirArchivo, vacantesController.nuevoVacante);
    // Muestra todas las vacantes
    router.get('/vacantes',  vacantesController.mostrarVacantes);
    // muestra un vacante en especifico por su ID
    router.get('/vacantes/:idVacante',  vacantesController.mostrarVacante);
    // Actualizar Productos
    router.put('/vacantes/:idVacante',  vacantesController.subirArchivo, vacantesController.actualizarVacante);
    // Eliminar Productos
    router.delete('/vacantes/:idVacante',  vacantesController.eliminarVacante);
    /*** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/ofertas/nuevo/:idUsuario',  ofertasController.nuevaOferta);
    // Mostrar todas las ofertas
    router.get('/ofertas',  ofertasController.mostrarOfertas);
    // Mostrar un oferta por su ID
    router.get('/ofertas/:idOferta',  ofertasController.mostrarOferta);
    // Actualizar oferta
    router.put('/ofertas/:idOferta',  ofertasController.actualizarOferta);
    // Elimina una oferta
    router.delete('/ofertas/:idOferta',  ofertasController.eliminarOferta);
    // Busqueda de Ofertas
    router.post('/ofertas/busqueda/:query',  ofertasController.buscarOferta);
    // Usuarios
    router.post('/crear-cuenta', vacantesController.subirArchivo, usuariosController.registrarUsuario);
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    router.get('/usuarios', usuariosController.obtenerUsuarios); // Aquí se conecta con el controlador



    return router;
};

export default routes;

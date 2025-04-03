// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/routes/index.js
import express from "express";
import * as empleadoController from "../controllers/empleadoController.js";
import * as vacantesController from "../controllers/vacantesController.js";
import * as ofertasController from "../controllers/ofertasController.js";
import * as usuariosController from '../controllers/usuariosController.js';
import { getPaginatedData } from '../controllers/paginationController.js';

// Middleware para proteger rutas
import auth from '../middleware/auth.js';

const router = express.Router();

const routes = () => {
    /** EMPLEADOS ✅ */
    /**
  * @swagger
  * tags:
  *   name: Empleados
  *   description: Gestión de empleados
  */

    /**
     * @swagger
     * /empleados:
     *   post:
     *     summary: Crear un nuevo empleado
     *     tags: [Empleados]
     *     requestBody:
     *       required: true
     *       description: Objeto empleado a crear
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Empleado'
     *     responses:
     *       201:
     *         description: Empleado creado exitosamente.
     */
    router.post('/empleados', empleadoController.nuevoEmpleado);

    /**
     * @swagger
     * /empleados:
     *   get:
     *     summary: Obtener todos los empleados
     *     tags: [Empleados]
     *     responses:
     *       200:
     *         description: Lista de empleados.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Empleado'
     */
    router.get('/empleados', empleadoController.mostrarEmpleados);

    /**
     * @swagger
     * /empleados/{idEmpleado}:
     *   get:
     *     summary: Obtener un empleado por ID
     *     tags: [Empleados]
     *     parameters:
     *       - in: path
     *         name: idEmpleado
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del empleado a obtener
     *     responses:
     *       200:
     *         description: Empleado encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Empleado'
     */
    router.get('/empleados/:idEmpleado', empleadoController.mostrarEmpleado);

    /**
     * @swagger
     * /empleados/{idEmpleado}:
     *   put:
     *     summary: Actualizar un empleado existente
     *     tags: [Empleados]
     *     parameters:
     *       - in: path
     *         name: idEmpleado
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del empleado a actualizar
     *     requestBody:
     *       required: true
     *       description: Datos a actualizar del empleado
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Empleado'
     *     responses:
     *       200:
     *         description: Empleado actualizado correctamente.
     */
    router.put('/empleados/:idEmpleado', empleadoController.actualizarEmpleado);

    /**
     * @swagger
     * /empleados/{idEmpleado}:
     *   delete:
     *     summary: Eliminar un empleado
     *     tags: [Empleados]
     *     parameters:
     *       - in: path
     *         name: idEmpleado
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del empleado a eliminar
     *     responses:
     *       200:
     *         description: Empleado eliminado.
     */
    router.delete('/empleados/:idEmpleado', empleadoController.eliminarEmpleado);

    /** PAGINACIÓN ✅ */
    router.get('/vacantes/pagination', getPaginatedData);
    router.get('/usuarios/pagination', (req, res) => getPaginatedData(req, res, 'usuarios'));

    /** VACANTES ✅ */
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

    /* Postulación a una vacante  ✅ */
    router.post('/vacantes/:idVacante/postular', auth, vacantesController.postularVacante);
    router.delete('/vacantes/:idVacante/postular', auth, vacantesController.eliminarPostulacion);



    /** OFERTAS ✅ */
    router.post('/ofertas/nuevo/:idUsuario', ofertasController.nuevaOferta);
    router.get('/ofertas', ofertasController.mostrarOfertas);
    router.get('/ofertas/:idOferta', ofertasController.mostrarOferta);
    router.put('/ofertas/:idOferta', ofertasController.actualizarOferta);
    router.delete('/ofertas/:idOferta', ofertasController.eliminarOferta);
    router.post('/ofertas/busqueda/:query', ofertasController.buscarOferta);

    /** USUARIOS ✅ */
    router.post('/crear-cuenta', vacantesController.subirArchivo, usuariosController.registrarUsuario);
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);
    router.get('/usuarios', usuariosController.obtenerUsuarios);
    router.get('/usuario/me', auth, usuariosController.obtenerUsuarioAutenticado);
    router.put('/usuario/update', auth, vacantesController.subirArchivo, usuariosController.actualizarPerfil);

    return router;
};

export default routes;

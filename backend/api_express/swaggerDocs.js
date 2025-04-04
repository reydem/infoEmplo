// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/swaggerDocs.js
/**
 * @swagger
 * tags:
 *   - name: Empleados
 *     description: Gestión de empleados
 */

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       description: Datos del empleado a crear
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       '201':
 *         description: Empleado creado exitosamente.
 *       '400':
 *         description: Error de validación o clave duplicada.
 *       '500':
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       '200':
 *         description: Lista de empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 */

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
     *         description: Empleado encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Empleado'
     *       404:
     *         description: El empleado no existe
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 mensaje:
     *                   type: string
     *                   example: "Ese empleado no existe"
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Error interno del servidor"
     */

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
 *       '200':
 *         description: Empleado actualizado correctamente.
 */

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
 *       '200':
 *         description: Empleado eliminado.
 */



/**
 * @swagger
 * /crear-cuenta:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       description: Datos para registrar un usuario.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               primerApellido:
 *                 type: string
 *               segundoApellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               password:
 *                 type: string
 *               esReclutador:
 *                 type: boolean
 *           example:
 *             nombre: "Juan"
 *             primerApellido: "Pérez"
 *             segundoApellido: "García"
 *             correo: "juan@example.com"
 *             telefono: "3001234567"
 *             password: "123456"
 *             esReclutador: false
 *     responses:
 *       '200':
 *         description: Usuario creado correctamente.
 *       '400':
 *         description: Error de validación.
 *       '500':
 *         description: Error interno del servidor.
 */

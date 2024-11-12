// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/index.js
const express = require("express");
const routes = require('./routes');
const mongoose = require("mongoose");

// Conectar con mongoose 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/infoempleo');
 
// Crear el servidor
const app = express();

// Rutas de la app
app.use('/', routes());
// Puerto
app.listen(5000);
// mongoose.connect('mongodb://127.0.0.1:27017/restapis')
//     .then(() => {
//         console.log('Conexión a la base de datos restapis correcta !!!');
//     })
//     .catch(err => {
//         console.error('Error conectando a la base de datos', err);
//     });
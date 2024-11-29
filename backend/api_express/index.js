// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/index.js
import getPort from "get-port";
import express from "express";
import routes from './routes/index.js';
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
import cors from "cors";

// Conectar con mongoose 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/infoempleo');

// Crear el servidor
const app = express();

// Hablititar body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// Puerto predeterminado
const defaultPort = 5000;
getPort({ port: [...Array(101).keys()].map(i => defaultPort + i) })
  .then(port => {
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al iniciar el servidor:', err);
  });


// mongoose.connect('mongodb://127.0.0.1:27017/restapis')
//     .then(() => {
//         console.log('Conexión a la base de datos restapis correcta !!!');
//     })
//     .catch(err => {
//         console.error('Error conectando a la base de datos', err);
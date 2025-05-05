// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/index.js
import getPort from "get-port";
import express from "express";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Importar dependencias de Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
// Importar la configuración de Swagger
import swaggerOptions from "./swaggerConfig.js";

// ----------------------
// Conexión a MongoDB
// ----------------------
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/infoempleo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// ----------------------
// Crear instancia de Express
// ----------------------
const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Servir archivos estáticos
let __dirname = '';
try {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch (err) {
  // En entorno de prueba con Jest puede fallar, así que usamos cwd como fallback
  __dirname = process.cwd();
}
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ----------------------
// Swagger
// ----------------------
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ----------------------
// Rutas de la API
// ----------------------
app.use("/", routes());

// ----------------------
// Exportar app para tests
// ----------------------
export default app;

// ----------------------
// Levantar servidor sólo fuera de test
// ----------------------
if (process.env.NODE_ENV !== "test") {
  const defaultPort = 5000;
  getPort({ port: Array.from({ length: 101 }, (_, i) => defaultPort + i) })
    .then((port) => {
      app.listen(port, () => {
        console.log(`🚀 Servidor ejecutándose en el puerto ${port}`);
        console.log(
          `📂 Archivos subidos disponibles en: http://localhost:${port}/uploads/`
        );
        console.log(
          `📄 Documentación API disponible en: http://localhost:${port}/api-docs`
        );
      });
    })
    .catch((err) => {
      console.error("❌ Error al iniciar el servidor:", err);
    });
}



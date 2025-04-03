// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/swaggerConfig.js
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname para construir rutas relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "InfoEmplo API",
      version: "1.0.0",
      description: "Documentación de la API de InfoEmplo"
    },
    servers: [
      {
        url: "http://localhost:5000" // URL base, ajústala según necesites
      }
    ],
    components: {
      schemas: {
        Empleado: {
          type: "object",
          required: ["nombre"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del empleado"
            },
            apellido: {
              type: "string",
              description: "Apellido del empleado"
            }
            // Agrega otros campos según tu modelo
          }
        }
        // Puedes agregar otros esquemas (Vacante, Oferta, etc.) aquí
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  // Aquí incluimos la ruta del archivo swaggerDocs.js, además de rutas de tus controladores y rutas
  apis: [
    path.join(__dirname, "swaggerDocs.js"),
    path.join(__dirname, "routes/*.js"),
    path.join(__dirname, "controllers/*.js")
  ]
};

export default swaggerOptions;

// /webapps/infoEmplo-venv/infoEmplo/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"Nanum Gothic Coding"', 'monospace'], // Configuración de la fuente personalizada
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Agregar el plugin de formularios
  ],
};
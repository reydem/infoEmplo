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
      boxShadow: {
        custom: '0px 5px 4px 2px rgba(0,0,0,0.37)', // Valor personalizado
      },
      colors: {
        purpleCustom: '#a5a5c4', // Nuevo color personalizado
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Agregar el plugin de formularios
  ],
};
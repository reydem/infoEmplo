// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/routes/index.js
const express = require("express");
const router = express.Router();
module.exports = function() {
    router.get('/', (req, res) => {
        res.send('inicio')
    });
    router.get('/nosotros', (req, res) => {
    });
    
    return router;
}
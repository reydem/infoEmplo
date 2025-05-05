// /webapps/infoEmplo-venv/infoEmplo/backend/api_express/tests/usuarios.test.js
import request from 'supertest';
import app from '../index.js';

describe('Pruebas al módulo de usuarios', () => {
  it('Debe responder con código 200 al obtener todos los usuarios', async () => {
    const response = await request(app).get('/usuarios'); // 👈 ruta correcta
    console.log(response.body); // 👈 útil para depurar
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // opcional
  });

  it('Debe retornar un error 404 si la ruta no existe', async () => {
    const response = await request(app).get('/ruta-inexistente');
    expect(response.statusCode).toBe(404);
  });
});

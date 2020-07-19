import request from 'supertest';
import app from '../../src/app';

import connection from '../../src/database/connection';

afterAll(async () => {
  await connection('establishment').truncate();
});

it('should register a establishment', async () => {
  const { status, body } = await request(app).post('/register').send({
    name: 'Hebreus',
    username: 'Hebreus2020',
    password: '12345',
  });

  expect(status).toBe(201);

  const establishment = await connection('establishment')
    .select('*')
    .where({
      id: body.id,
    })
    .first();

  expect(establishment).toBeDefined();
  expect(body.token).toBeDefined();
});

it('cannot register two establishment with the same username', async () => {
  const { status } = await request(app).post('/register').send({
    name: 'Hebreus',
    username: 'Hebreus2020',
    password: '12345',
  });

  expect(status).toBe(400);
});

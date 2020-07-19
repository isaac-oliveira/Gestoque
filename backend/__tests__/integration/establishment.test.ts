import request from 'supertest';
import bcrypt from 'bcrypt';

import app from '../../src/app';
import connection from '../../src/database/connection';
import { register } from '../utils/auth';

let token: string;

beforeAll(async () => {
  token = await register();
});

afterAll(async () => {
  await connection('establishment').truncate();
});

it('should return a establishment', async () => {
  const { status, body } = await request(app)
    .get('/establishment')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('name');
});

it('should update a establishment', async () => {
  const updateData = {
    name: 'Isaac Santos',
    username: 'Isaac98',
    password: 'isaac123',
  };

  const { status } = await request(app)
    .put('/establishment')
    .send(updateData)
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(204);

  const establishment = await connection('establishment')
    .select('*')
    .where({
      username: updateData.username,
    })
    .first();

  const checkPassword = await bcrypt.compare(
    updateData.password,
    establishment.password
  );
  expect(establishment.name).toBe(updateData.name);
  expect(establishment.username).toBe(updateData.username);
  expect(checkPassword).toBeTruthy();
});

it('cannot update two establishment with the same username', async () => {
  const updateData = {
    name: 'Isaac Santos',
    username: 'Isaac98',
    password: 'isaac123',
  };

  const { status } = await request(app)
    .put('/establishment')
    .send(updateData)
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(400);
});

import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';
import { register } from '../utils/auth';

let token: string;

beforeAll(async () => {
  token = await register();
});

afterAll(async () => {
  await connection('establishment').truncate();
  await connection('client').truncate();
});

it('should create a client', async () => {
  const { status, body } = await request(app)
    .post('/clients')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Isaac',
      debt_value: 54.65,
    });

  expect(status).toBe(201);
  expect(body).toHaveProperty('id');

  const client = await connection('client')
    .select('*')
    .where({
      id: body.id,
    })
    .first();

  expect(client).toBeDefined();
});

it('cannot create two client with the same name', async () => {
  const { status } = await request(app)
    .post('/clients')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Isaac',
      debt_value: 54.65,
    });

  expect(status).toBe(400);
});

it('should list the clients', async () => {
  const { status, body } = await request(app)
    .get('/clients')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body).toHaveLength(1);
});

it('should update the name of client', async () => {
  const { status } = await request(app)
    .put('/clients/1')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'João',
    });

  expect(status).toBe(204);

  const client = await connection('client')
    .select('*')
    .where({
      name: 'João',
    })
    .first();

  expect(client).toBeDefined();
});

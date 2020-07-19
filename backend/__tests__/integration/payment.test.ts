import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';
import { createClient } from '../../src/app/logic/client';
import { register } from '../utils/auth';

let token: string;

beforeAll(async () => {
  token = await register();
});

beforeEach(async () => {
  await createClient({
    id_establishment: 1,
    name: 'Isaac',
    debt_value: 54.65,
  });
});

afterEach(async () => {
  await connection('client').truncate();
});

afterAll(async () => {
  await connection('establishment').truncate();
});

it('should pay the entire account', async () => {
  const { status, body } = await request(app)
    .put('/clients/1/payment')
    .set('Authorization', `Bearer ${token}`)
    .send({
      payment: 54.65,
    });

  expect(status).toBe(200);
  expect(body.current_debt).toBe(0);

  const client = await connection('client')
    .select('*')
    .where({
      id: 1,
    })
    .first();

  expect(client.debt_value).toBe(0);
});

it('should pay off part of the account', async () => {
  const { status, body } = await request(app)
    .put('/clients/1/payment')
    .set('Authorization', `Bearer ${token}`)
    .send({
      payment: 14.55,
    });

  expect(status).toBe(200);
  expect(body.current_debt).toBe(54.65 - 14.55);

  const client = await connection('client')
    .select('*')
    .where({
      id: 1,
    })
    .first();

  expect(client.debt_value).toBe(54.65 - 14.55);
});
it('cannot overpay', async () => {
  const { status } = await request(app)
    .put('/clients/1/payment')
    .set('Authorization', `Bearer ${token}`)
    .send({
      payment: 55.65,
    });

  expect(status).toBe(400);

  const client = await connection('client')
    .select('*')
    .where({
      id: 1,
    })
    .first();

  expect(client.debt_value).toBe(54.65);
});

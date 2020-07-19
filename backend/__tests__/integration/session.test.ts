import request from 'supertest';
import app from '../../src/app';

import connection from '../../src/database/connection';
import { register } from '../utils/auth';

beforeAll(async () => {
  await register();
});

afterAll(async () => {
  await connection('establishment').truncate();
});

it('should receive JWT token when authenticated with valid credentials', async () => {
  const { status, body } = await request(app).post('/session').send({
    username: 'Hebreus2020',
    password: '12345',
  });

  expect(status).toBe(200);
  expect(body.id).toBeDefined();
  expect(body.token).toBeDefined();
});

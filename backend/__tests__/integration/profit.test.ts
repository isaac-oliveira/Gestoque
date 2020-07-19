import request from 'supertest';
import app from '../../src/app';

import connection from '../../src/database/connection';
import { register } from '../utils/auth';
import { createProduct } from '../../src/app/logic/product';

let token: string;

const getPad = (value) => (value > 9 ? String(value) : `0${value}`);

beforeAll(async () => {
  token = await register();

  const product = {
    id_establishment: 1,
    name: 'Arroz',
    type: 'Comida',
    purchase_value: 3.0,
    sale_value: 3.2,
    amount: 15,
  };

  await createProduct(product);

  await createProduct({
    ...product,
    sale_value: 3.5,
    name: 'Feijão',
    amount: 35,
  });

  for (let i: number = 0; i < 2; i++) {
    const now = new Date();
    now.setDate(now.getDate() - i);
    now.setMonth(now.getMonth() + 1 - i);

    const dia = now.getDate();
    const mes = now.getMonth();

    await request(app)
      .post('/sales')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: `2020-${getPad(mes)}-${getPad(dia)}T22:11:44.747Z`,
        sale_items: [
          { id_product: 1, amount: 5 },
          { id_product: 2, amount: 10 },
        ],
      });
  }
});

afterAll(async () => {
  await connection('establishment').truncate();
  await connection('sale').truncate();
  await connection('product').truncate();
  await connection('sale_item').truncate();
});

it('should return the profit of the day', async () => {
  const { status, body } = await request(app)
    .get('/dashboard/profits/day')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body.totalSold).toBe(51);
  expect(body.profit).toBe(6);
});

it('should return the profit of the month', async () => {
  const { status, body } = await request(app)
    .get('/dashboard/profits/month')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body.totalSold).toBe(51);
  expect(body.profit).toBe(6);
});

it('should return the profit of the all', async () => {
  const { status, body } = await request(app)
    .get('/dashboard/profits/all')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body.totalSold).toBe(102);
  expect(body.profit).toBe(12);
});

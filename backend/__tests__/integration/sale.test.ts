import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';

import { getSale } from '../../src/app/logic/sale';
import { getSaleItems } from '../../src/app/logic/saleItem';
import { getProduct, createProduct } from '../../src/app/logic/product';
import { createClient, getClient } from '../../src/app/logic/client';

import { register } from '../utils/auth';

let token: string;

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
    name: 'Feijão',
  });
});

afterAll(async () => {
  await connection('establishment').truncate();
  await connection('sale').truncate();
  await connection('client').truncate();
  await connection('product').truncate();
  await connection('sale_item').truncate();
});

it('should create a sale without client', async () => {
  const { status, body } = await request(app)
    .post('/sales')
    .set('Authorization', `Bearer ${token}`)
    .send({
      date: '2020-06-21T22:11:44.747Z',
      sale_items: [
        { id_product: 1, amount: 5 },
        { id_product: 2, amount: 5 },
      ],
    });

  expect(status).toBe(201);
  expect(body).toHaveProperty('id');

  const sale = await getSale(body.id);
  expect(sale).toBeDefined();

  const saleItems = await getSaleItems(sale.id);
  expect(saleItems).toBeDefined();

  await Promise.all(
    saleItems.map(async (saleItem) => {
      const product = await getProduct(saleItem.id_product);
      expect(product.amount).toBe(10);
    })
  );
});

it('should create a sale with a client', async () => {
  const id_client = await createClient({
    id_establishment: 1,
    name: 'Isaac',
    debt_value: 10,
  });

  await request(app)
    .post('/sales')
    .set('Authorization', `Bearer ${token}`)
    .send({
      id_client,
      date: '2020-06-21T22:11:44.747Z',
      sale_items: [
        { id_product: 1, amount: 5 },
        { id_product: 2, amount: 5 },
      ],
    });

  const client = await getClient(id_client);

  expect(client.debt_value).toBe(42);
});

import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';
import { getProduct } from '../../src/app/logic/product';
import { register } from '../utils/auth';

let token: string;

beforeAll(async () => {
  token = await register();
});

afterAll(async () => {
  await connection('establishment').truncate();
  await connection('product').truncate();
});

it('should create a product', async () => {
  const { status, body } = await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      id_establishment: 1,
      name: 'Arroz',
      type: 'Comida',
      purchase_value: 3.0,
      sale_value: 3.2,
      amount: 15,
    });

  expect(status).toBe(201);

  const product = await getProduct(body.id);

  expect(product).toBeDefined();
});

it('cannot create two product with the same name', async () => {
  const { status } = await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      id_establishment: 1,
      name: 'Arroz',
      type: 'Comida',
      purchase_value: 3.0,
      sale_value: 3.2,
      amount: 15,
    });

  expect(status).toBe(400);
});

it('should list the products', async () => {
  const { status, body } = await request(app)
    .get('/products')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body).toHaveLength(1);
});

it('should show a products', async () => {
  const { status, body } = await request(app)
    .get('/products/1')
    .set('Authorization', `Bearer ${token}`);

  expect(status).toBe(200);
  expect(body).toHaveProperty('id');
});

it('should update a product', async () => {
  const updateData = {
    name: 'Cerveja',
    type: 'Bebida',
    purchase_value: 2.0,
    sale_value: 2.5,
    amount: 20,
  };
  const { status } = await request(app)
    .put('/products/1')
    .set('Authorization', `Bearer ${token}`)
    .send(updateData);

  const { id, id_establishment, ...updated } = await connection('product')
    .select('*')
    .where({
      name: updateData.name,
    })
    .first();

  expect(status).toBe(204);
  expect(updated).toStrictEqual(updateData);
});

it('should delete a product', async () => {
  const { status } = await request(app)
    .delete('/products/1')
    .set('Authorization', `Bearer ${token}`);

  const result = await connection('product')
    .select('*')
    .where({
      id: 1,
    })
    .first();

  expect(status).toBe(204);
  expect(result).toBeUndefined();
});

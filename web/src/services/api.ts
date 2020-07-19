import { create } from 'apisauce';

import { Session, Establishment, Product } from '../@types/models';

const api = create({
  baseURL: 'https://api-gestoque.herokuapp.com',
});

api.addRequestTransform(async (request) => {
  const token = localStorage.getItem('@gestoque/token');
  if (token) request.headers.authorization = `Bearer ${token}`;
});

export async function login(
  username: string,
  password: string
): Promise<Session> {
  const { data } = await api.post('/session', {
    username,
    password,
  });

  return data as Session;
}

export async function getEstablishment(): Promise<Establishment> {
  const { data } = await api.get(`/establishment`);

  return data as Establishment;
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get(`/products`);

  return data as Product[];
}

export async function createProduct(product: Product): Promise<boolean> {
  const { ok } = await api.post(`/products`, product);

  return ok;
}

export async function findProduct(query: string): Promise<Product[]> {
  const { data } = await api.get(`/filter/products?search=${query}`);

  return data as Product[];
}

export async function updateProduct({
  id,
  ...product
}: Product): Promise<boolean> {
  const { ok } = await api.put(`/products/${id}`, product);

  return ok;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const { ok } = await api.delete(`/products/${id}`);

  return ok;
}

export default api;

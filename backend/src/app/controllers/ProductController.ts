import { Request, Response } from 'express';
import { exists, update } from '../logic';

import { ProductRequest } from '../../@types/request';

import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from '../logic/product';

export default {
  store: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);

    const {
      name,
      type,
      purchase_value,
      sale_value,
      amount,
    } = request.body as ProductRequest;

    try {
      const checkProduct = await exists('product', { name });
      if (checkProduct)
        return response
          .status(400)
          .json({ error: 'Produto com o mesmo nome encontrado.' });

      const id = await createProduct({
        id_establishment,
        name,
        type,
        purchase_value,
        sale_value,
        amount,
      });

      return response.status(201).json({ id });
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
  index: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    try {
      const products = await getProducts(id_establishment);
      return response.status(200).json(products);
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
  show: async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    try {
      const product = await getProduct(id);
      if (!product)
        return response.status(404).json({ error: 'Produto não encontrado.' });
      return response.status(200).json(product);
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
  update: async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const {
      name,
      type,
      purchase_value,
      sale_value,
      amount,
    } = request.body as ProductRequest;
    try {
      const checkProduct = await exists('product', { id });
      if (!checkProduct)
        return response.status(404).json({ error: 'Produto não encontrado.' });

      await update(
        'product',
        { id },
        {
          name,
          type,
          purchase_value,
          sale_value,
          amount,
        }
      );

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
  destroy: async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    try {
      const result = await deleteProduct(id);
      if (!result)
        return response.status(404).json({ error: 'Produto não encontrado.' });
      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
};

import { Request, Response, request } from 'express';
import { getSales, filterSalesByDate } from '../logic/sale';
import { getBestSellingProduct, findProducts } from '../logic/product';

export default {
  show: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    const filter = request.params.filter;
    try {
      const sales = await getSales(id_establishment);
      const filteredSales = filterSalesByDate(sales, filter);

      const product = await getBestSellingProduct(filteredSales);

      return response.status(200).json(product);
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servido.' });
    }
  },
  index: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    const { query } = request;
    const search = query.search as string;

    try {
      const productFilter = await findProducts(id_establishment, search);

      return response.status(200).json(productFilter);
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servido.' });
    }
  },
};

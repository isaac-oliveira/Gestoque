import { Request, Response } from 'express';
import { getSales, filterSalesByDate } from '../logic/sale';
import { getSaleItemTotal } from '../logic/saleItem';

export default {
  index: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    const filter = request.params.filter;
    try {
      let total = 0;

      const sales = await getSales(id_establishment);
      const filteredSales = filterSalesByDate(sales, filter);

      const serializedSales = await Promise.all(
        filteredSales.map(async (sale) => {
          const saleItemTotal = await getSaleItemTotal(sale.id);

          total += saleItemTotal;

          return { ...sale, total: saleItemTotal };
        })
      );

      return response.status(200).json({ sales: serializedSales, total });
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servido.' });
    }
  },
};

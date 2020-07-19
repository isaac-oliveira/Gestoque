import { Request, Response } from 'express';
import { getSales, filterSalesByDate } from '../logic/sale';
import { getProfit } from '../logic/profit';

export default {
  show: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    const filter = request.params.filter;
    try {
      const sales = await getSales(id_establishment);
      const filteredSales = filterSalesByDate(sales, filter);

      const profit = await getProfit(filteredSales);

      return response.status(200).json(profit);
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servido.' });
    }
  },
};

import { Request, Response } from 'express';
import { SaleRequest } from '../../@types/request';
import { getClient, updateDebt } from '../logic/client';
import { createSale } from '../logic/sale';
import { createSaleItems } from '../logic/saleItem';
import { getProduct, updateAmount } from '../logic/product';
import { Client } from '../../@types/models';

export default {
  store: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    const { id_client, date, sale_items } = request.body as SaleRequest;
    try {
      let client: Client = undefined;
      if (!!id_client) client = await getClient(id_client);

      if (!client && !!id_client)
        return response
          .status(400)
          .json({ error: 'Cliente não foi encontrado.' });

      const id_sale = await createSale({ id_establishment, id_client, date });

      await createSaleItems(id_sale, sale_items);

      let saleTotal = 0;

      await Promise.all(
        sale_items.map(async (saleItem) => {
          const product = await getProduct(saleItem.id_product);
          const current_amount = product.amount - saleItem.amount;

          saleTotal += saleItem.amount * product.sale_value;

          await updateAmount(product.id, current_amount);
        })
      );

      if (client) await updateDebt(client.id, client.debt_value + saleTotal);

      return response.status(201).json({ id: 1, saleTotal });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

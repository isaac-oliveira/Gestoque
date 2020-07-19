import { Request, Response } from 'express';
import { PaymentRequest } from '../../@types/request';
import connection from '../../database/connection';
import { getClient, updateDebt } from '../logic/client';

export default {
  update: async (request: Request, response: Response) => {
    const id_client = Number(request.params.id_client);
    const { payment } = request.body as PaymentRequest;
    try {
      const client = await getClient(id_client);
      if (!client)
        return response
          .status(404)
          .json({ error: 'Cliente não foi encontrado.' });

      if (client.debt_value < payment)
        return response
          .status(400)
          .json({ error: 'O valor recebido é maior do que a dívida.' });

      const current_debt = client.debt_value - payment;

      await updateDebt(id_client, current_debt);

      return response.status(200).json({ current_debt });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

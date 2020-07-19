import { Request, Response } from 'express';
import { ClientRequest } from '../../@types/request';
import { exists, update } from '../logic';
import { createClient, getClients } from '../logic/client';

export default {
  store: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    const { name, debt_value = 0 } = request.body as ClientRequest;
    try {
      const checkClient = await exists('client', { name });
      if (checkClient)
        return response
          .status(400)
          .json({ error: 'Cliente com o mesmo nome encontrado.' });

      const id = await createClient({
        id_establishment,
        name,
        debt_value,
      });

      return response.status(201).json({ id });
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
  index: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    try {
      const clients = await getClients(id_establishment);

      return response.status(200).json(clients);
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
  update: async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name } = request.body as ClientRequest;
    try {
      const checkClient = await exists('client', { id });
      if (!checkClient)
        return response
          .status(404)
          .json({ error: 'Cliente não foi encontrado.' });

      await update('client', { id }, { name });

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

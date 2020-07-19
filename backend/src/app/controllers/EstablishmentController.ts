import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import connection from '../../database/connection';
import { exists, update } from '../logic';
import { getEstablishment } from '../logic/establishment';

export default {
  show: async (request: Request, response: Response) => {
    const id_establishment = Number(request.headers.id_establishment);
    try {
      const { id, name } = await getEstablishment(id_establishment);

      return response.json({ id, name });
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
  update: async (request: Request, response: Response) => {
    const { id_establishment } = request.headers;
    const { name, username, password } = request.body;

    try {
      const checkEstablishment = await exists('establishment', { username });
      if (checkEstablishment)
        return response
          .status(400)
          .json({ error: 'Este estabelecimento já existe.' });

      const hash = password ? await bcrypt.hash(password, 16) : password;

      await update(
        'establishment',
        {
          id: id_establishment,
        },
        { name, username, password: hash }
      );

      return response.status(204).json();
    } catch (err) {
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
};

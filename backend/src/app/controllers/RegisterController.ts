import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../logic/auth';
import { exists } from '../logic';

import { EstablishmentRequest } from '../../@types/request';
import { createEstablishment } from '../logic/establishment';

export default {
  store: async (request: Request, response: Response) => {
    const { name, username, password } = request.body as EstablishmentRequest;
    try {
      const checkEstablishment = await exists('establishment', { username });
      if (checkEstablishment)
        return response
          .status(400)
          .json({ error: 'Este estabelecimento já existe.' });

      const hash = await bcrypt.hash(password, 16);

      const id = await createEstablishment({
        name,
        username,
        password: hash,
      });

      const token = generateToken(id);

      return response.status(201).json({ id, token });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: 'Error interno no servidor.' });
    }
  },
};

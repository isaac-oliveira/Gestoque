import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../../database/connection';
import { generateToken } from '../logic/auth';

import { Establishment } from '../../@types/models';
import { LoginRequest } from '../../@types/request';
import { getEstablishmentByUsername } from '../logic/establishment';

export default {
  store: async (request: Request, response: Response) => {
    const { username, password } = request.body as LoginRequest;
    try {
      const establishment = await getEstablishmentByUsername(username);

      if (!establishment)
        return response
          .status(404)
          .json({ error: 'Estabelecimento não encontrado.' });

      const checkPassword = await bcrypt.compare(
        password,
        establishment.password
      );
      if (!checkPassword)
        return response.status(400).json({ error: 'Senha inválida.' });

      const { id } = establishment;
      const token = generateToken(id);

      return response.status(200).json({ id, token });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};

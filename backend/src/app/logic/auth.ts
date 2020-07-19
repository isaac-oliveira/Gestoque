import jwt from 'jsonwebtoken';
import { ResultValidate, Token } from '../../@types/auth';

export const generateToken = (id: number) => {
  const secret = process.env.SECRET || '';

  const token = jwt.sign({ id }, secret, {
    expiresIn: 7200,
  });

  return token;
};

export const validateToken = (token: string): ResultValidate => {
  const secret = process.env.SECRET || '';
  let result: ResultValidate = { logged: false };

  jwt.verify(token, secret, (error, decode) => {
    const tokenDecode = decode as Token;
    if (!error) result = { logged: true, id_establishment: tokenDecode.id };
  });

  return result;
};

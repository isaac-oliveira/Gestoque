import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../logic/auth';

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers['authorization'];
  if (!authorization)
    return response.status(401).json({ error: 'Token não enviado.' });

  const [bearer, token] = authorization?.split(' ');
  if (bearer !== 'Bearer' && !token)
    return response.status(401).json({ error: 'Token mal formatado.' });

  const result = validateToken(token);

  if (!result.logged)
    return response.status(401).json({ error: 'Token inválido.' });

  request.headers['id_establishment'] = String(result.id_establishment);

  next();
};

export default authMiddleware;

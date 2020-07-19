import bcrypt from 'bcrypt';

import { createEstablishment } from '../../src/app/logic/establishment';
import { generateToken } from '../../src/app/logic/auth';

export async function register(): Promise<string> {
  const hash = await bcrypt.hash('12345', 16);

  const id = await createEstablishment({
    name: 'Hebreus',
    username: 'Hebreus2020',
    password: hash,
  });

  const token = generateToken(id);

  return token;
}

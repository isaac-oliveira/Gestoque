import connection from '../../database/connection';
import { Establishment } from '../../@types/models';

export async function createEstablishment(
  establishment: Establishment
): Promise<number> {
  const { username, name, password } = establishment;

  const result = await connection('establishment').insert({
    username,
    name,
    password,
  });

  return result[0];
}

export async function getEstablishment(id: number): Promise<Establishment> {
  return await connection('establishment').select('*').where({ id }).first();
}

export async function getEstablishmentByUsername(
  username: string
): Promise<Establishment> {
  return await connection('establishment')
    .select('*')
    .where({ username })
    .first();
}

export async function getEstablishments(): Promise<Establishment[]> {
  return await connection('establishment').select('*');
}

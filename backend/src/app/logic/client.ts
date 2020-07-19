import connection from '../../database/connection';
import { Client } from '../../@types/models';

export async function createClient(client: Client): Promise<number> {
  const { id_establishment, name, debt_value } = client;
  const result = await connection('client').insert({
    id_establishment,
    name,
    debt_value,
  });

  return result[0];
}

export async function updateDebt(id_client: number, value: number) {
  return await connection('client')
    .update({ debt_value: value })
    .where({ id: id_client });
}

export async function getClient(id: number): Promise<Client> {
  return await connection('client').select('*').where({ id }).first();
}

export async function getClients(id_establishment: number): Promise<Client[]> {
  return await connection('client').select('*').where({ id_establishment });
}

import connection from '../../database/connection';
import { Count } from '../../@types/models';

function removesObjectEmptyProperties(object: object) {
  const keys = Object.keys(object);
  let objectAux: object | undefined = undefined;

  keys.forEach((key: string) => {
    const value = (object as any)[key];
    if (value) objectAux = { ...objectAux, [key]: value };
  });

  return objectAux;
}

export async function exists(table: string, fields: object): Promise<boolean> {
  const whereData = removesObjectEmptyProperties(fields);

  if (!whereData) return false;

  const result = await connection(table)
    .select()
    .where(whereData)
    .count()
    .first();

  const count = (result as unknown) as Count;

  return count['count(*)'] > 0;
}

export function update(table: string, where: object, fields: object) {
  const updateData = removesObjectEmptyProperties(fields);

  if (!updateData) return;

  return connection(table).update(updateData).where(where);
}

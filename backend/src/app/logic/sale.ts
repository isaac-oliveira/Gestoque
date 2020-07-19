import connection from '../../database/connection';
import { Sale } from '../../@types/models';
import formatDate from '../../utils/formatDate';

export async function createSale(sale: Sale): Promise<number> {
  const { id_establishment, id_client, date } = sale;

  const result = await connection('sale').insert({
    id_establishment,
    id_client,
    date,
  });

  return result[0];
}

export async function getSale(id: number): Promise<Sale> {
  return await connection('sale').select('*').where({ id }).first();
}

export async function getSales(id_establishment: number): Promise<Sale[]> {
  return await connection('sale').select('*').where({ id_establishment });
}

const acceptedFilters = {
  day: (now: Date, date: Date) => {
    const fields = ['day', 'month', 'year'];

    return formatDate(now, fields) === formatDate(date, fields);
  },
  month: (now: Date, date: Date) => {
    const fields = ['month', 'year'];

    return formatDate(now, fields) === formatDate(date, fields);
  },
  all: () => true,
};

export function filterSalesByDate(sales: Sale[], filter: string): Sale[] {
  const filterFunction = acceptedFilters[filter];
  const filteredSales = filterFunction
    ? sales.filter(({ date }) => filterFunction(new Date(), new Date(date)))
    : [];

  return filteredSales;
}

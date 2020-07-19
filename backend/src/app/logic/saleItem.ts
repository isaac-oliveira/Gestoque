import connection from '../../database/connection';
import { SaleItem } from '../../@types/models';
import { getProduct } from './product';

export async function createSaleItems(
  id_sale: number,
  saleItems: SaleItem[]
): Promise<number[]> {
  const ids = await Promise.all(
    saleItems.map(async (saleItem) => {
      const { id_product, amount } = saleItem;
      const result = await connection('sale_item').insert({
        id_sale,
        id_product,
        amount,
      });

      return result[0];
    })
  );

  return ids;
}

export async function getSaleItem(id: number): Promise<SaleItem> {
  return await connection('sale_item').select('*').where({ id }).first();
}

export async function getSaleItems(id_sale: number): Promise<SaleItem[]> {
  return await connection('sale_item').select('*').where({ id_sale });
}

export async function getSaleItemTotal(id_sale): Promise<number> {
  let total = 0;
  const saleItems = await getSaleItems(id_sale);
  await Promise.all(
    saleItems.map(async (saleItem) => {
      const product = await getProduct(saleItem.id_product);

      total += product.sale_value * saleItem.amount;
    })
  );

  return total;
}

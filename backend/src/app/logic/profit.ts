import { Sale } from '../../@types/models';
import { getSaleItems } from './saleItem';
import { getProduct } from './product';

interface Profit {
  totalSold: Number;
  profit: Number;
}
export async function getProfit(sales: Sale[]): Promise<Profit> {
  let totalPurchase = 0;
  let totalSold = 0;

  await Promise.all(
    sales.map(async (sale) => {
      const saleItems = await getSaleItems(sale.id);
      await Promise.all(
        saleItems.map(async (saleItem) => {
          const product = await getProduct(saleItem.id_product);
          totalPurchase += product.purchase_value * saleItem.amount;
          totalSold += product.sale_value * saleItem.amount;
        })
      );
    })
  );

  const profit = totalSold - totalPurchase;

  return {
    totalSold,
    profit,
  } as Profit;
}

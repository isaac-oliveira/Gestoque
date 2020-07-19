import connection from '../../database/connection';
import { Product, Sale } from '../../@types/models';
import { BestSellingProduct } from '../../@types/response';
import { getSaleItems } from './saleItem';

export async function createProduct(product: Product): Promise<number> {
  const {
    id_establishment,
    name,
    type,
    purchase_value,
    sale_value,
    amount,
  } = product;

  const result = await connection('product').insert({
    id_establishment,
    name,
    type,
    purchase_value,
    sale_value,
    amount,
  });

  return result[0];
}

export async function updateAmount(id_product: number, value: number) {
  return await connection('product')
    .update({ amount: value })
    .where({ id: id_product });
}

export async function getProduct(id: number): Promise<Product> {
  return await connection('product').select('*').where({ id }).first();
}

export async function getProducts(
  id_establishment: number
): Promise<Product[]> {
  return await connection('product').select('*').where({ id_establishment });
}

export async function deleteProduct(id: number): Promise<number> {
  return await connection('product').delete().where({ id });
}

export async function findProducts(
  id_establishment: number,
  query: string
): Promise<Product[]> {
  const products = await getProducts(id_establishment);
  const filteredProducts = products.filter((product) => {
    const name = product.name as string;
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return filteredProducts;
}

export async function getBestSellingProduct(
  sales: Sale[]
): Promise<BestSellingProduct> {
  let products = {};

  await Promise.all(
    sales.map(async (sale) => {
      const saleItems = await getSaleItems(sale.id);
      saleItems.map((saleItem) => {
        const product = products[`${saleItem.id_product}`];
        if (product) {
          products[`${saleItem.id_product}`] = {
            ...product,
            amount: product.amount + saleItem.amount,
          };
        } else {
          products = {
            ...products,
            [`${saleItem.id_product}`]: {
              amount: saleItem.amount,
            },
          };
        }
      });
    })
  );

  const keys = Object.keys(products);
  let id_product = -1;
  let amountMax = 0;

  keys.map((key) => {
    const { amount } = products[key];
    if (amountMax < amount) {
      id_product = Number(key);
      amountMax = amount;
    }
  });

  if (id_product === -1) return {} as BestSellingProduct;

  const product = await getProduct(id_product);

  const bestSellingProduct = {
    name: product.name,
    type: product.type,
    amount: amountMax,
  } as BestSellingProduct;

  return bestSellingProduct;
}

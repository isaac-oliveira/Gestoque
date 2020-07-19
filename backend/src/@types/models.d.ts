export interface Establishment {
  id?: number;
  name: string;
  username: string;
  password: string;
}

export interface Product {
  id?: number;
  id_establishment: number;
  name: strig;
  type: strig;
  purchase_value: number;
  sale_value: number;
  amount: number;
}

export interface Sale {
  id?: number;
  id_establishment: number;
  id_client: number;
  date: strig;
}

export interface SaleItem {
  id?: number;
  id_product: number;
  id_sale: number;
  amount: number;
}

export interface Client {
  id?: number;
  id_establishment: number;
  name: string;
  debt_value: number;
}

export interface Count {
  ['count(*)']: number;
}

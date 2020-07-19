export interface Session {
  id: number;
  token: string;
}

export interface Establishment {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  id_establishment: number;
  name: string;
  type: string;
  purchase_value: number;
  sale_value: number;
  amount: number;
}

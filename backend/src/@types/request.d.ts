import { SaleItem } from './models';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface EstablishmentRequest {
  name: string;
  username: string;
  password: string;
}

export interface ProductRequest {
  name: strig;
  type: strig;
  purchase_value: number;
  sale_value: number;
  amount: number;
}

export interface SaleRequest {
  id_client?: number;
  date: string;
  sale_items: SaleItem[];
}

export interface ClientRequest {
  name: string;
  debt_value: number;
}

export interface PaymentRequest {
  payment: number;
}

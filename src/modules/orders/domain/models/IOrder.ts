import { ICustomer } from '../../../../modules/customers/domain/models/ICustomer';
import { ICreateOrderProdcuts } from './ICreateOrderProducts';

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: ICreateOrderProdcuts[];
  created_at: Date;
  updated_at: Date;
}

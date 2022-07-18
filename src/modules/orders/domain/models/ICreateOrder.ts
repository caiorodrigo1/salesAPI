import { ICustomer } from 'src/modules/customers/domain/models/ICustomer';
import { ICreateOrderProdcuts } from './ICreateOrderProducts';

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProdcuts[];
}

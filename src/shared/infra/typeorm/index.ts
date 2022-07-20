import { DataSource } from 'typeorm';

import User from '../../../modules/users/infra/typeorm/entities/UserToken';
import UserToken from '../../../modules/users/infra/typeorm/entities/UserToken';
import Customer from '../../../modules/customers/infra/typeorm/entities/Customer';
import Order from '../../../modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '../../../modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '../../../modules/products/infra/typeorm/entities/Product';

import { CreateProducts1656528660403 } from './migrations/1656528660403-CreateProducts';
import { CreateUsers1656674955810 } from './migrations/1656674955810-CreateUsers';
import { CreateUserTokens1656938542724 } from './migrations/1656938542724-CreateUserTokens';
import { CreateCustomers1656962188204 } from './migrations/1656962188204-CreateCustomers';
import { CreateOrders1657041878329 } from './migrations/1657041878329-CreateOrders';
import { AddCustomerIdToOrders1657042472942 } from './migrations/1657042472942-AddCustomerIdToOrders';
import { CreateOrdersProducts1657043369672 } from './migrations/1657043369672-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1657045964287 } from './migrations/1657045964287-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1657047075044 } from './migrations/1657047075044-AddProductIdToOrdersProducts';
// import { AddOrderFieldtoOrders1619889809717 } from './migrations/1619889809717-AddOrderFieldtoOrders';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1656528660403,
    CreateUsers1656674955810,
    CreateUserTokens1656938542724,
    CreateCustomers1656962188204,
    CreateOrders1657041878329,
    AddCustomerIdToOrders1657042472942,
    CreateOrdersProducts1657043369672,
    AddOrderIdToOrdersProducts1657045964287,
    AddProductIdToOrdersProducts1657047075044,
    //AddOrderFieldtoOrders1619889809717,
  ],
});

import 'reflect-metadata';
import CreateCustomersService from './CreateCustomerService';
import FakeCustomersRepository from '../../../modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomersService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomersService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Caio Rodrigo',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Caio Rodrigo',
      email: 'teste@teste.com',
    });

    expect(
      createCustomer.execute({
        name: 'Caio Rodrigo',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

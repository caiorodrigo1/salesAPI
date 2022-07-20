import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Caio Rodrigo',
      email: 'teste@teste.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Caio Rodrigo',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '45632',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

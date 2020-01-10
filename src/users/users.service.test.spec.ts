import { UsersService } from './users.service';
import { RolRepository } from '../auth/repositories/roles.repository';
import { UserRepository } from './repositories/users.repository';
import { Test } from '@nestjs/testing';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mockUserRepository = () => ({
  saveUser: jest.fn(),
  getUserByParam: jest.fn(),
  softDeleteUser: jest.fn(),
  changeRol: jest.fn(),
  changeUserPassword: jest.fn(),
  updateUser: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  changeUserRol: jest.fn(),
});

const mockUser = {
  id: 1,
  name: 'Francisco',
  lastname: 'Rivas',
  username: 'frank',
  password: 'kguiuyuwkjheuyiudyiuyd',
  email: 'frank@gmail.com',
  isActive: true,
  lastLogin: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  rol: 1,
  token: [],
  movieToUser: [],
  movieToUserOrder: [],
};

const mockRol = {
  id: 1,
  name: 'client',
  description: 'WIP',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const saveUserMock = {
  name: 'Samuel',
  lastname: 'Torres',
  username: 'sam',
  password: 'admin123',
  email: 'sam@gmail.com',
  rol: 'client',
};

const mockRolRepository = () => ({
  getRolByParam: jest.fn(),
});

describe('UserService', () => {
  let userService: UsersService;
  let rolRepository: RolRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: RolRepository, useFactory: mockRolRepository },
      ],
    }).compile();

    userService = await module.get<UsersService>(UsersService);
    rolRepository = await module.get<RolRepository>(RolRepository);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(rolRepository).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('softdelete user', () => {
    beforeEach(() => {
      userRepository.softDeleteUser = jest.fn().mockResolvedValue(mockUser);
    });
    it('softdelete user', async () => {
      expect(userRepository.softDeleteUser).not.toBeCalled();
      expect(userRepository.findOne).not.toBeCalled();
      const result = await userService.softDeleteUser(1);
      expect(userRepository.softDeleteUser).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('change user rol', () => {
    beforeEach(() => {
      rolRepository.getRolByParam = jest.fn().mockResolvedValue(mockRol);
    });
    it('change user rol', async () => {
      expect(userRepository.findOne).not.toHaveBeenCalled();
      await userService.changeUserRol(1, 'admin');
      expect(rolRepository.getRolByParam).toHaveBeenCalled();
      expect(userRepository.changeUserRol).toHaveBeenCalled();
    });
  });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { RolRepository } from 'src/auth/repositories/roles.repository';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository, private readonly rolRepository: RolRepository) {}
  async saveUser(user: CreateUserDto): Promise<User> {
    const rol = await this.rolRepository.getRolByParam('name', user.rol);
    if (!rol) {
      throw new NotFoundException('Rol does not exist');
    }
    const userToSave = {
      ...user,
      rol,
    };
    return this.userRepository.saveUser(userToSave);
  }
  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['name', 'lastname', 'username', 'email', 'isActive', 'lastLogin'],
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.getUserByParam('id', id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async softDeleteUser(id: number): Promise<User> {
    return this.userRepository.softDeleteUser(id);
  }

  async changeUserRol(id: number, rol: string): Promise<User> {
    const newRol = await this.rolRepository.getRolByParam('name', rol);
    if (!newRol) {
      throw new NotFoundException('Rol does not exist');
    }
    return this.userRepository.changeUserRol(id, newRol);
  }

  changeUserPassword(id: number, password: string): Promise<User> {
    return this.userRepository.changeUserPassword(id, password);
  }

  updateUser(id: number, user: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, user);
  }
}

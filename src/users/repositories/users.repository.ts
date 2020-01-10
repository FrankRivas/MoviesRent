import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUser } from '../interfaces/user';
import { UnprocessableEntityException, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/auth/entities/roles.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(user: CreateUser): Promise<User> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.getUserByParam('username', user.username);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (userFromDB) {
      throw new ConflictException('User with that username already exist');
    }
    let userEmail: User | undefined;
    try {
      userEmail = await this.getUserByParam('email', user.email);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (userEmail) {
      throw new ConflictException('User with that email already exist');
    }
    let encyptPass: string;
    try {
      encyptPass = await bcrypt.hash(user.password, 10);
    } catch {
      throw new UnprocessableEntityException();
    }
    user.password = encyptPass;
    return this.save(user);
  }

  async getUserByParam(param: string, value: string | number): Promise<User | undefined> {
    let user: User | undefined;
    try {
      user = await this.findOne({
        where: [{ [param]: value }],
        select: ['name', 'lastname', 'username', 'email', 'isActive', 'lastLogin'],
      });
    } catch {
      throw new UnprocessableEntityException();
    }
    return user;
  }

  async softDeleteUser(id: number): Promise<User> {
    let userFromDB;
    try {
      userFromDB = await this.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    userFromDB.isActive = false;
    return this.save(userFromDB);
  }

  async changeUserRol(id: number, rol: Rol): Promise<User> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    userFromDB.rol = rol;
    return this.save(userFromDB);
  }

  async changeUserPassword(id: number, password: string): Promise<User> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    let newPassword: string;
    try {
      newPassword = await bcrypt.hash(password, 10);
    } catch {
      throw new UnprocessableEntityException();
    }
    userFromDB.password = newPassword;
    return this.save(userFromDB);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    let usernameFromDB: User | undefined;
    try {
      usernameFromDB = await this.getUserByParam('username', user.username);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (usernameFromDB && userFromDB.id !== id) {
      throw new ConflictException('User with that username already exist');
    }
    let emailFromDB: User | undefined;
    try {
      emailFromDB = await this.getUserByParam('email', user.email);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (emailFromDB && userFromDB.id !== id) {
      throw new ConflictException('User with that email already exist');
    }
    const password = userFromDB.password;
    const rol = userFromDB.rol;
    const userToSave = {
      ...userFromDB,
      ...user,
      password,
      rol,
    };
    return this.save(userToSave);
  }
}

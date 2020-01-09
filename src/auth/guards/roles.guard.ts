import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userFromDB = await this.userRepository.findOne({
      relations: ['rol'],
      where: { id: user.userId },
    });
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    const hasRole = roles.includes(userFromDB.rol.name);
    return user && hasRole;
  }
}

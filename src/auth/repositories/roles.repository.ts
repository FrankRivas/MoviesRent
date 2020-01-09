import { EntityRepository, Repository } from 'typeorm';
import { Rol } from '../entities/roles.entity';
import { UnprocessableEntityException } from '@nestjs/common';

@EntityRepository(Rol)
export class RolRepository extends Repository<Rol> {
  async getRolByParam(param: string, value: string | number): Promise<Rol | undefined> {
    let rol: Rol | undefined;
    try {
      rol = await this.findOne({ where: [{ [param]: value }] });
    } catch {
      throw new UnprocessableEntityException();
    }
    return rol;
  }
}

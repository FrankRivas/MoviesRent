import { Rol } from '../../auth/entities/roles.entity';

export interface CreateUser {
  name?: string;
  lastname?: string;
  username: string;
  password: string;
  email: string;
  rol: Rol;
}

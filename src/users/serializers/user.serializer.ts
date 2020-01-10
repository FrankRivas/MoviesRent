import { Rol } from '../../auth/entities/roles.entity';
import { Token } from '../../auth/entities/token.entity';
import { Exclude } from 'class-transformer';

export class UserSerializer {
  @Exclude()
  id: number;
  name: string;
  lastname: string;
  username: string;
  @Exclude()
  password: string;
  email: string;
  isActive: boolean;
  lastLogin: Date;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  rol: Rol;
  @Exclude()
  token: Token[];

  constructor(partial: Partial<UserSerializer>) {
    Object.assign(this, partial);
  }
}

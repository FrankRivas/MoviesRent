/* istanbul ignore file */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Rol } from '../../auth/entities/roles.entity';
import { Token } from '../../auth/entities/token.entity';
import { MovieToUser } from '../../rent/entities/rent.entity';
import { MovieToUserOrder } from '../../order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50, unique: true, nullable: false })
  @Unique('Duplicate username', ['username'])
  username: string;

  @Column({ length: 128, nullable: false })
  password: string;

  @Column({ length: 50, unique: true, nullable: false })
  @Unique('Duplicate email', ['email'])
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: new Date() })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Rol,
    rol => rol.user,
  )
  rol: Rol;

  @OneToMany(
    () => Token,
    token => token.user,
  )
  token: Token[];

  @OneToMany(
    () => MovieToUser,
    movieToUser => movieToUser.user,
  )
  public movieToUser: MovieToUser[];

  @OneToMany(
    () => MovieToUserOrder,
    movieToUserOrder => movieToUserOrder.user,
  )
  public movieToUserOrder: MovieToUserOrder[];
}

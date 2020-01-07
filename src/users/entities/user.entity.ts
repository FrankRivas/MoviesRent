import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Rol } from 'src/auth/entities/roles.entity';

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

  @Column({ length: 50, nullable: false })
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
    type => Rol,
    rol => rol.user,
  )
  rol: Rol;
}

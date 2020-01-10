/* istanbul ignore file */

import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true, nullable: false })
  @Unique('Duplicated token', ['token_duplicated'])
  token: string;

  @ManyToOne(
    () => User,
    user => user.token,
  )
  user: User;
}

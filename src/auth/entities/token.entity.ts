import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true, nullable: false })
  @Unique('Duplicated token', ['token_duplicated'])
  token: string;

  @ManyToOne(
    type => User,
    user => user.token,
  )
  user: User;
}

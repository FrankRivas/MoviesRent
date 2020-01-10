/* istanbul ignore file */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class MovieToUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  devolutionDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  total: number;

  @Column({ default: false })
  isReturned: boolean;

  @CreateDateColumn()
  rentDate: Date;

  @ManyToOne(
    () => User,
    user => user.movieToUser,
  )
  public user: User;

  @ManyToOne(
    () => Movie,
    movie => movie.movieToUser,
  )
  public movie: Movie;
}

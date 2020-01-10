/* istanbul ignore file */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class MovieToUserOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  total: number;

  @CreateDateColumn()
  orderDate: Date;

  @ManyToOne(
    () => User,
    user => user.movieToUserOrder,
  )
  public user: User;

  @ManyToOne(
    () => Movie,
    movie => movie.movieToUserOrder,
  )
  public movie: Movie;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

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
    type => User,
    user => user.movieToUserOrder,
  )
  public user: User;

  @ManyToOne(
    type => Movie,
    movie => movie.movieToUserOrder,
  )
  public movie: Movie;
}

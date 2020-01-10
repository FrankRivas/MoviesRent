import { Injectable, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieToUserOrder } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/users/repositories/users.repository';
import { MovieRepository } from 'src/movies/repositories/movies.repository';
import { OrderMovieDto } from './dto/order.dto';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(MovieToUserOrder) private readonly orderRepository: Repository<MovieToUserOrder>,
    private readonly usersRepository: UserRepository,
    private readonly moviesRepository: MovieRepository,
  ) {}

  async orderMovie(movieToOrder: OrderMovieDto): Promise<{}> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.usersRepository.findOne(movieToOrder.userId);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new BadRequestException('User does not exist');
    }
    let movieFromDB: Movie | undefined;
    try {
      movieFromDB = await this.moviesRepository.findOne(movieToOrder.movieId);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!movieFromDB) {
      throw new BadRequestException('Movie does not exist');
    }
    if (movieFromDB.stock < movieToOrder.quantity) {
      throw new BadRequestException(`There are only ${movieFromDB.stock} available elements`);
    }
    movieFromDB.stock = movieFromDB.stock - movieToOrder.quantity;
    const total = movieToOrder.quantity * movieToOrder.price;
    const movieOrdered = {
      ...movieToOrder,
      user: userFromDB,
      movie: movieFromDB,
      total,
    };
    this.moviesRepository.save(movieFromDB);
    this.orderRepository.save(movieOrdered);
    return { ...movieToOrder, total };
  }

  async getOrderMovies(id: number): Promise<{}> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.usersRepository.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    let orderedMovies: MovieToUserOrder[] | undefined;
    try {
      orderedMovies = await this.orderRepository.find({ relations: ['movie'], where: { user: userFromDB } });
    } catch {
      throw new UnprocessableEntityException();
    }
    return orderedMovies.map(order => ({
      id: order.id,
      orderDate: order.orderDate,
      movie: order.movie.title,
      quantity: order.quantity,
      total: order.total,
    }));
  }
}

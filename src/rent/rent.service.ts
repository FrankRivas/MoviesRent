import { Injectable, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieToUser } from './entities/rent.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../users/repositories/users.repository';
import { MovieRepository } from '../movies/repositories/movies.repository';
import { RentMovieDto } from './dto/rent.dto';
import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/entities/movie.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(MovieToUser) private readonly rentRepository: Repository<MovieToUser>,
    private readonly usersRepository: UserRepository,
    private readonly moviesRepository: MovieRepository,
  ) {}
  async rentMovie(movieToRent: RentMovieDto): Promise<RentMovieDto> {
    const currentDate = new Date();
    if (currentDate >= new Date(movieToRent.devolutionDate)) {
      throw new BadRequestException('Invalid devolution date');
    }
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.usersRepository.findOne(movieToRent.userId);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new BadRequestException('User does not exist');
    }
    let movieFromDB: Movie | undefined;
    try {
      movieFromDB = await this.moviesRepository.findOne(movieToRent.movieId);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!movieFromDB) {
      throw new BadRequestException('Movie does not exist');
    }
    if (movieFromDB.stock < movieToRent.quantity) {
      throw new BadRequestException(`There are only ${movieFromDB.stock} available elements`);
    }
    movieFromDB.stock = movieFromDB.stock - movieToRent.quantity;
    const total = movieToRent.quantity * movieToRent.price;
    const movieRented = {
      ...movieToRent,
      user: userFromDB,
      movie: movieFromDB,
      total,
    };
    this.moviesRepository.save(movieFromDB);
    this.rentRepository.save(movieRented);
    return { ...movieToRent };
  }

  async returnMovie(id: number): Promise<{}> {
    let rentTransaction: MovieToUser | undefined;
    try {
      rentTransaction = await this.rentRepository.findOne({ relations: ['movie'], where: { id } });
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!rentTransaction) {
      throw new NotFoundException('Rent transaction does not exist');
    }
    if (rentTransaction.isReturned) {
      throw new BadRequestException('Movie was already returned');
    }
    let movieRentedFromDB: Movie | undefined;
    try {
      movieRentedFromDB = await this.moviesRepository.findOne(rentTransaction.movie.id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (movieRentedFromDB) {
      movieRentedFromDB.stock = movieRentedFromDB.stock + rentTransaction.quantity;
      this.moviesRepository.save(movieRentedFromDB);
      rentTransaction.isReturned = true;
      this.rentRepository.save(rentTransaction);
    }
    return rentTransaction;
  }

  async getRentedMovies(id: number): Promise<{}> {
    let userFromDB: User | undefined;
    try {
      userFromDB = await this.usersRepository.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!userFromDB) {
      throw new NotFoundException('User does not exist');
    }
    let rentedMovies: MovieToUser[] | undefined;
    try {
      rentedMovies = await this.rentRepository.find({ relations: ['movie'], where: { user: userFromDB } });
    } catch {
      throw new UnprocessableEntityException();
    }
    return rentedMovies.map(rent => ({
      id: rent.id,
      rentDate: rent.rentDate,
      devolutionDate: rent.devolutionDate,
      movie: rent.movie.title,
      quantity: rent.quantity,
      total: rent.total,
      isReturned: rent.isReturned,
    }));
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/movie.dto';
import { ConflictException, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/tags/entities/tag.entity';
import { CreateMovie } from '../interfaces/movie';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async saveMovie(movie: CreateMovie): Promise<Movie> {
    let movieFromDB;
    try {
      movieFromDB = await this.getMovieByParam('title', movie.title);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (movieFromDB) {
      throw new ConflictException('Movie already exists');
    }
    return this.save(movie);
  }

  async getMovieByParam(param: string, value: string | number): Promise<Movie | undefined> {
    let movie: Movie | undefined;
    try {
      movie = await this.findOne({ where: [{ [param]: value }] });
    } catch {
      throw new UnprocessableEntityException();
    }
    return movie;
  }

  async softDeleteMovie(id: number): Promise<Movie> {
    let movieFromDB;
    try {
      movieFromDB = await this.getMovieByParam('id', id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!movieFromDB) {
      throw new NotFoundException('Movie does not exist');
    }
    movieFromDB.isActive = false;
    return this.save(movieFromDB);
  }
}

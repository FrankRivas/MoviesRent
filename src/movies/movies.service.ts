import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { MovieRepository } from './repositories/movies.repository';
import { CreateMovieDto } from './dto/movie.dto';
import { TagRepository } from '../tags/repository/tags.repository';
import { Tag } from '../tags/entities/tag.entity';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly tagsRepository: TagRepository, private readonly moviesRepository: MovieRepository) {}

  async saveMovie(movie: CreateMovieDto): Promise<Movie> {
    let tags: Tag[] = [];
    if (movie.tags && movie.tags.length) {
      try {
        tags = await this.tagsRepository.findOrCreateTag(movie.tags);
      } catch {
        throw new UnprocessableEntityException();
      }
    }
    const movieToSave = {
      ...movie,
      tags,
    };
    return this.moviesRepository.saveMovie(movieToSave);
  }

  getMovies(): Promise<Movie[]> {
    return this.moviesRepository.find({ order: { title: 'ASC' }, where: { isActive: true } });
  }

  async getMovie(id: number): Promise<Movie> {
    let movie: Movie | undefined;
    try {
      movie = await this.moviesRepository.findOne({
        relations: ['tags'],
        where: { id },
      });
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!movie) {
      throw new NotFoundException('Movie does not exist');
    }
    return movie;
  }

  async deleteMovie(id: number): Promise<Movie> {
    return this.moviesRepository.softDeleteMovie(id);
  }

  async giveLike(id: number): Promise<Movie> {
    let movie: Movie | undefined;
    try {
      movie = await this.moviesRepository.getMovieByParam('id', id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!movie) {
      throw new NotFoundException('Movie does not exist');
    }
    movie.like = movie.like + 1;
    return this.moviesRepository.save(movie);
  }

  async updateMovie(id: number, movie: UpdateMovieDto): Promise<Movie> {
    let movieFromDB: Movie | undefined;
    try {
      movieFromDB = await this.moviesRepository.getMovieByParam('id', id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!movieFromDB) {
      throw new NotFoundException('Movie does not exist');
    }
    let movieName: Movie | undefined;
    try {
      movieName = await this.moviesRepository.getMovieByParam('title', movie.title);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (movieName && movieName.id !== id) {
      throw new ConflictException('Movie already exist');
    }
    let tags: Tag[] = movieFromDB.tags;
    if (movie.tags && movie.tags.length) {
      try {
        tags = await this.tagsRepository.findOrCreateTag(movie.tags);
      } catch {
        throw new UnprocessableEntityException();
      }
    }
    const movieToSave = {
      ...movieFromDB,
      ...movie,
      tags,
    };
    return this.moviesRepository.save(movieToSave);
  }
}

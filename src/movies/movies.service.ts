import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { MovieRepository } from './repositories/movies.repository';
import { CreateMovieDto } from './dto/movie.dto';
import { TagRepository } from 'src/tags/repository/tags.repository';
import { Tag } from 'src/tags/entities/tag.entity';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly tagsRepository: TagRepository, private readonly moviesRepository: MovieRepository) {}

  async saveMovie(movie: CreateMovieDto): Promise<Movie> {
    let tags: Tag[] = [];
    if (movie.tags && movie.tags.length) {
      tags = await this.tagsRepository.findOrCreateTag(movie.tags);
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
    const movie = await this.moviesRepository.findOne({
      relations: ['tags'],
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Movie does not exist');
    }
    return movie;
  }

  async deleteMovie(id: number): Promise<Movie> {
    return this.moviesRepository.softDeleteMovie(id);
  }

  async giveLike(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.getMovieByParam('id', id);
    if (!movie) {
      throw new NotFoundException('Movie does not exist');
    }
    movie.like = movie.like + 1;
    return this.moviesRepository.save(movie);
  }

  async updateMovie(id: number, movie: UpdateMovieDto): Promise<Movie> {
    const movieFromDB = await this.moviesRepository.getMovieByParam('id', id);
    if (!movieFromDB) {
      throw new NotFoundException('Movie does not exist');
    }
    const movieName = await this.moviesRepository.getMovieByParam('title', movie.title);
    if (movieName && movieName.id !== id) {
      throw new ConflictException('Movie already exist');
    }
    let tags: Tag[] = movieFromDB.tags;
    if (movie.tags && movie.tags.length) {
      tags = await this.tagsRepository.findOrCreateTag(movie.tags);
    }
    const movieToSave = {
      ...movieFromDB,
      ...movie,
      tags,
    };
    return this.moviesRepository.save(movieToSave);
  }
}

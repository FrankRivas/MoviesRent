import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  saveMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
    return this.movieService.saveMovie(movie);
  }

  @Get()
  getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }

  @Get(':id')
  async getMovie(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return await this.movieService.getMovie(id);
  }

  @Put(':id')
  updateMovie(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() movie: CreateMovieDto,
  ): Promise<Movie> {
    return this.movieService.updateMovie(id, movie);
  }

  @Delete(':id')
  deleteMovie(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.movieService.deleteMovie(id);
  }

  @Post(':id/like')
  giveLike(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.movieService.giveLike(id);
  }
}

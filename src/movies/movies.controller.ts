import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  SetMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './entities/movie.entity';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from '../auth/guards/token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
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
    let movie: Movie | undefined;
    try {
      movie = await this.movieService.getMovie(id);
    } catch {
      throw new UnprocessableEntityException();
    }
    return movie;
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Put(':id')
  updateMovie(@Param('id', new ParseIntPipe()) id: number, @Body() movie: UpdateMovieDto): Promise<Movie> {
    return this.movieService.updateMovie(id, movie);
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Delete(':id')
  deleteMovie(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.movieService.deleteMovie(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  giveLike(@Param('id', new ParseIntPipe()) id: number): Promise<Movie> {
    return this.movieService.giveLike(id);
  }
}

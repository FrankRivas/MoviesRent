import { Controller, Post, Get, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  saveMovie() {
    console.log('saving a movie...');
  }

  @Get()
  getMovies() {
    console.log('obtaining saved movies...');
  }

  @Get(':id')
  getMovie() {
    console.log('obtainig specific saved movie...');
  }

  @Post(':id')
  updateMovie() {
    console.log('updating specific saved movie...');
  }

  @Delete(':id')
  deleteMovie() {
    console.log('deleting specific saved movie...');
  }

  @Post(':id/tags')
  addTag() {
    console.log('adding tag...');
  }

  @Post(':id/like')
  giveLike() {
    console.log('giving a like');
  }
}

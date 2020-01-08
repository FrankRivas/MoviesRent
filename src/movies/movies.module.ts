import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movies.repository';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository]), TagsModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}

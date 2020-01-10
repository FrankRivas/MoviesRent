import { Module, forwardRef } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movies.repository';
import { TagsModule } from 'src/tags/tags.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    forwardRef(() => TagsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [TypeOrmModule],
})
export class MoviesModule {}

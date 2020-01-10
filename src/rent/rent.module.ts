import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToUser } from './entities/rent.entity';
import { RentService } from './rent.service';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieToUser]), forwardRef(() => UsersModule), forwardRef(() => MoviesModule)],
  providers: [RentService],
  exports: [RentService],
})
export class RentModule {}

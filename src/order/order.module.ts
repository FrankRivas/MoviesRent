import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToUserOrder } from './entities/order.entity';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieToUserOrder]),
    forwardRef(() => UsersModule),
    forwardRef(() => MoviesModule),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}

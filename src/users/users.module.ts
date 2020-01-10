import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './repositories/users.repository';
import { RentModule } from 'src/rent/rent.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => RentModule),
    forwardRef(() => OrderModule),
  ],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

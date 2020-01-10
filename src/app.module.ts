import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TagsModule } from './tags/tags.module';
import { RentModule } from './rent/rent.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    MoviesModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    TagsModule,
    RentModule,
    OrderModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

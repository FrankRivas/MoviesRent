import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './repositories/roles.repository';

@Module({
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([RolRepository])],
  exports: [TypeOrmModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/roles.entity';

@Module({
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([Rol])],
  exports: [AuthModule],
})
export class AuthModule {}

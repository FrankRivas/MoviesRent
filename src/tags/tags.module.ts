import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repository/tags.repository';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository]), UsersModule, AuthModule],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TypeOrmModule],
})
export class TagsModule {}

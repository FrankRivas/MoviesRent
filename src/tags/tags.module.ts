import { Module, forwardRef } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repository/tags.repository';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository]), forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TypeOrmModule],
})
export class TagsModule {}

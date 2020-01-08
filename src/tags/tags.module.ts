import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repository/tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TypeOrmModule],
})
export class TagsModule {}

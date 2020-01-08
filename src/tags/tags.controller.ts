import { Controller, Get, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  getTags() {
    console.log('obtaining tags...');
  }

  @Delete()
  deleteTag() {
    console.log('deleting specific tag...');
  }
}

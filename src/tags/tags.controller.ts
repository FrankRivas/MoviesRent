import { Controller, Get, Delete, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  getTags() {
    console.log('obtaining tags...');
  }

  @Post()
  saveTag() {
    console.log('saving tags...');
  }

  @Delete(':id')
  deleteTag() {
    console.log('deleting specific tag...');
  }
}

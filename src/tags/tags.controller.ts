import { Controller, Get, Delete, Post, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @Post()
  saveTag(@Body() tag: CreateTagDto): Promise<Tag> {
    return this.tagService.saveTag(tag);
  }

  @Delete(':id')
  deleteTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagService.softDeleteTag(id);
  }

  @Get(':id')
  getTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagService.getTag(id);
  }

  @Put(':id')
  updateTag(@Param('id', new ParseIntPipe()) id: number, @Body() tag: CreateTagDto): Promise<Tag> {
    return this.tagService.updateTag(id, tag.name);
  }
}

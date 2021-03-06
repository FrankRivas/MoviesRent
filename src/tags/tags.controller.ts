import { Controller, Get, Delete, Post, Body, Param, ParseIntPipe, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from '../auth/guards/token.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Get()
  getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Post()
  saveTag(@Body() tag: CreateTagDto): Promise<Tag> {
    return this.tagService.saveTag(tag);
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Delete(':id')
  deleteTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagService.softDeleteTag(id);
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Get(':id')
  getTag(@Param('id', new ParseIntPipe()) id: number): Promise<Tag> {
    return this.tagService.getTag(id);
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrator'])
  @Put(':id')
  updateTag(@Param('id', new ParseIntPipe()) id: number, @Body() tag: CreateTagDto): Promise<Tag> {
    return this.tagService.updateTag(id, tag.name);
  }
}

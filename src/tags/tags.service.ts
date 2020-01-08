import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TagRepository } from './repository/tags.repository';
import { CreateTagDto } from './dto/tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagRepository) {}

  saveTag(tag: CreateTagDto): Promise<Tag> {
    return this.tagsRepository.saveTag(tag);
  }

  getTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  softDeleteTag(id: number): Promise<Tag> {
    return this.tagsRepository.softDeleteTag(id);
  }

  async getTag(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.getTagByParam('id', id);
    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }
    return tag;
  }

  async updateTag(id: number, newTagName: string): Promise<Tag> {
    const tag = await this.tagsRepository.getTagByParam('id', id);
    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }
    const tagName = await this.tagsRepository.getTagByParam('name', newTagName);
    if (tagName && tagName.id !== id) {
      throw new ConflictException('Tag name already exist');
    }
    tag.name = newTagName;
    return this.tagsRepository.save(tag);
  }
}

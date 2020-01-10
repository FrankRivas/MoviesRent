import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
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
    let tag: Tag | undefined;
    try {
      tag = await this.tagsRepository.getTagByParam('id', id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }
    return tag;
  }

  async updateTag(id: number, newTagName: string): Promise<Tag> {
    let tag: Tag | undefined;
    try {
      tag = await this.tagsRepository.getTagByParam('id', id);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }
    let tagName: Tag | undefined;
    try {
      tagName = await this.tagsRepository.getTagByParam('name', newTagName);
    } catch {
      throw new UnprocessableEntityException();
    }
    if (tagName && tagName.id !== id) {
      throw new ConflictException('Tag name already exist');
    }
    tag.name = newTagName;
    return this.tagsRepository.save(tag);
  }
}

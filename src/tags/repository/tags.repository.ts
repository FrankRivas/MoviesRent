import { EntityRepository, Repository, In } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { UnprocessableEntityException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from '../dto/tag.dto';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async findOrCreateTag(tags: string[]): Promise<Tag[]> {
    const tagsInDB = await this.getTagsInArray(tags);
    const tagstoSave = tags.filter(
      tag => !tagsInDB.map(ElementTag => ElementTag.name).includes(tag),
    );
    const tagsObjectToSave = tagstoSave.map(tag => ({
      name: tag,
    }));
    const newTags = await this.save(tagsObjectToSave);
    return [...newTags, ...tagsInDB];
  }
  async getTagByParam(param: string, value: string | number): Promise<Tag | undefined> {
    let movie: Tag | undefined;
    try {
      movie = await this.findOne({ where: [{ [param]: value }] });
    } catch {
      throw new UnprocessableEntityException();
    }
    return movie;
  }
  async getTagsInArray(tags: string[]): Promise<Tag[]> {
    let tagsFromDB;
    try {
      tagsFromDB = await this.find({ name: In(tags) });
    } catch {
      throw new UnprocessableEntityException();
    }
    return tagsFromDB;
  }
  async saveTag(tagToSave: CreateTagDto): Promise<Tag> {
    const tag = await this.getTagByParam('name', tagToSave.name);
    if (tag) {
      throw new ConflictException('Tag already exist');
    }
    return this.save(tagToSave);
  }

  async softDeleteTag(id: number): Promise<Tag> {
    const tag = await this.getTagByParam('id', id);
    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }
    tag.isActive = false;
    return this.save(tag);
  }
}

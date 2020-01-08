import { EntityRepository, Repository, In } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { UnprocessableEntityException } from '@nestjs/common';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async findOrCreateTag(tags: string[]): Promise<Tag[]> {
    const tagsInDB = await this.getTagsInArray(tags);
    const tagstoSave = tags.filter(tag => !tagsInDB.map(tags => tags.name).includes(tag));
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
}

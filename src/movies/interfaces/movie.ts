import { Tag } from 'src/tags/entities/tag.entity';

export interface CreateMovie {
  title: string;
  description: string;
  poster: string;
  stock: number;
  trailer: string;
  salePrice: number;
  rentPrice: number;
  tags: Tag[];
}

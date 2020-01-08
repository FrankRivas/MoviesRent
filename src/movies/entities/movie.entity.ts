import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, unique: true, nullable: false })
  @Unique('Duplicate movie title', ['movie_title'])
  title: string;

  @Column({ length: 50 })
  description: string;

  @Column({ length: 128 })
  poster: string;

  @Column({ nullable: false })
  stock: number;

  @Column({ length: 128 })
  trailer: string;

  @Column({ nullable: false })
  salePrice: number;

  @Column({ nullable: false })
  rentPrice: number;

  @Column({ default: 0 })
  like: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}

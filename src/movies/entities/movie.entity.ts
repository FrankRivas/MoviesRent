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

  @Column({ length: 50, nullable: false })
  description: string;

  @Column({ length: 128, nullable: true })
  poster: string;

  @Column({ nullable: false })
  stock: number;

  @Column({ length: 128, nullable: true })
  trailer: string;

  @Column({ nullable: false, type: 'decimal', precision: 6, scale: 2 })
  salePrice: number;

  @Column({ nullable: false, type: 'decimal', precision: 6, scale: 2 })
  rentPrice: number;

  @Column({ default: 0 })
  like: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}

import { Entity, Column, PrimaryGeneratedColumn, Unique, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, unique: true, nullable: false })
  @Unique('Duplicate tag name', ['tag_name'])
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

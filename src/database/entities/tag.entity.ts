import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  public name!: string;

  @ManyToMany(() => Article, article => article.tags)
  public articles?: Article[];
}
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

  @ManyToMany(() => Article, article => article.tags, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public articles?: Article[];

  constructor(props?: { name: string }) {
    if (props !== undefined) {
      this.name = props.name;
    }
  }
}
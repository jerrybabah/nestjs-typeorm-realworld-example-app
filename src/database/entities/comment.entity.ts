import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar')
  public body!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    // TODO: onUpdate 어떻게
  })
  public updatedAt!: Date;

  @ManyToOne(() => User, user => user.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public author?: User;

  @ManyToOne(() => Article, article => article.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public article?: Article;
}
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
    // TODO: new Date 확인, onUpdate 어떻게
  })
  public updatedAt!: Date;

  @ManyToOne(() => User, user => user.comments)
  public author?: User;

  @ManyToOne(() => Article, article => article.comments)
  public article?: Article;
}
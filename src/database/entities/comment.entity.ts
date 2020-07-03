import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
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
  })
  public createdAt!: Date;

  @Column({
    type: 'timestamp',
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

  @BeforeInsert()
  private beforeInsertHandler() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private beforeUpdateHandler() {
    this.updatedAt = new Date();
  }

  constructor(props?: { body: string, author: User, article: Article }) {
    if (props !== undefined) {
      this.body = props.body;
      this.author = props.author;
      this.article = props.article;
    }
  }
}
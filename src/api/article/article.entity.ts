import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../profile/user.entity';
import { Comment } from '../comment/comment.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text')
  body: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.articles)
  author: User

  @OneToMany(type => Comment, comment => comment.article)
  comments: Comment[];

  @ManyToMany(type => User, user => user.favorites)
  favoriters: User[];

  @ManyToMany(type => Tag, tag => tag.articles)
  @JoinTable({ name: 'tagging' })
  tags: Tag[];
}
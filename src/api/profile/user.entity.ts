import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Article } from '../article/article.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  image: string;

  @OneToMany(type => Article, article => article.author)
  articles: Article[];

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[];

  @ManyToMany(type => Article)
  @JoinTable({
    name: 'favorite',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'articleId',
      referencedColumnName: 'id',
    },
  })
  favorites: Article[];

  @ManyToMany(type => User)
  @JoinTable({
    name: 'follow',
    joinColumn: {
      name: 'followId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followedId',
      referencedColumnName: 'id',
    },
  })
  follows: User[];

  @ManyToMany(type => User)
  @JoinTable({
    name: 'follow',
    joinColumn: {
      name: 'followedId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followId',
      referencedColumnName: 'id',
    },
  })
  followed: User[];
}
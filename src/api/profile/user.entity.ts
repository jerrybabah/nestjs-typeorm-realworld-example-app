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

  @ManyToMany(type => Article, article => article.favoriters)
  @JoinTable({ name: 'favorite' })
  favorites: Article[];

  @ManyToMany(type => User, user => user.followers)
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
  followings: User[];

  @ManyToMany(type => User, user => user.followings)
  followers: User[];

  public addArticle(article: Article) {
    this.articles.push(article);
  }

  public removeArticle(article: Article | number) {
    this.articles = this.articles.filter((art) => {
      if (typeof article === 'number') {
        return art.id !== article;

      } else {
        return art.id !== article.id;
      }
    })
  }

  public addFavorite(article: Article) {
    this.favorites.push(article);
  }
  
  public follow(user: User) {
    this.followings.push(user);
  }
}
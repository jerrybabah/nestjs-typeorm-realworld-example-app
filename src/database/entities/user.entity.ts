import * as bcrypt from 'bcrypt';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeInsert } from 'typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  public email!: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  public username!: string;

  @Column('varchar')
  public password!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public bio!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public image!: string | null;

  @OneToMany(() => Article, article => article.author)
  public articles?: Article[];

  @OneToMany(() => Comment, comment => comment.author)
  public comments?: Comment[];

  @ManyToMany(() => Article, article => article.favoriters, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'favorite' })
  public favorites?: Article[];

  @ManyToMany(() => User, user => user.followers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
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
  public followings?: User[];

  @ManyToMany(() => User, user => user.followings, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public followers?: User[];

  constructor(props?: { email: string, username: string, password: string, bio?: string, image?: string }) {
    if (props !== undefined) {
      this.email = props.email;
      this.username = props.username;
      this.password = props.password;
      this.bio = props.bio || null;
      this.image = props.image || null;
    }
  }

  @BeforeInsert()
  private encryptPwd() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }

  public comparePwd(pwd: string) {
    return bcrypt.compareSync(pwd, this.password);
  }

  // public isPersisted() {
  //   return this.id !== undefined;
  // }

  // public addArticle(article: Article) {
  //   if (this.articles === undefined) {
  //     throw new Error();
  //   }
  //   this.articles.push(article);
  // }

  // public removeArticle(article: Article | number) {
  //   if (this.articles === undefined) {
  //     throw new Error();
  //   }

  //   this.articles = this.articles.filter((art) => {
  //     if (typeof article === 'number') {
  //       return art.id !== article;

  //     } else {
  //       return art.id !== article.id;
  //     }
  //   })
  // }

  // public setArticles(articles: Article[]) {
  //   this.articles = articles;
  // }

  public favorite(article: Article | Article[]) {

    if (this.favorites === undefined) {

      if (this.id !== undefined) {
        throw new Error('영속성을 갖는 user에 favorite을 추가하기 위해서는 쿼리 시, favorites를 정의해야 합니다.');

      } else {
        this.favorites = [];
      }
    }

    if (article instanceof Article) {
      this.favorites.push(article);
    }
    if (article instanceof Array) {
      this.favorites = [...this.favorites, ...article];
    }
  }
  
  public follow(user: User | User[]) {

    if (this.followings === undefined) {

      if (this.id !== undefined) {
        throw new Error('영속성을 갖는 user에 follow를 추가하기 위해서는 쿼리 시, followings를 정의해야 합니다.');

      } else {
        this.followings = [];
      }
    }

    if (user.constructor === Array) {
      this.followings = [...this.followings, ...user];
    } 
    if (user.constructor === User) {
      this.followings.push(user);
    }
  }
}
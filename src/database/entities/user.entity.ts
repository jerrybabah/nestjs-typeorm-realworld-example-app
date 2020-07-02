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

  public isPersisted() {
    return this.id !== undefined;
  }

  public writeArticle(article: Article) {

    if (!this.isPersisted()) {
      throw new Error('user의 article 추가는 영속성을 갖는 user에 한해서 가능합니다.');
    }

    if (this.articles === undefined) {
      throw new Error('영속성을 가는 user의 article 추가를 위해서는 쿼리 시, articles르 정의해야 합니다.');
    }

    this.articles.push(article);
  }

  public removeArticle(article: Article) {

    if (!this.isPersisted()) {
      throw new Error('user의 article 삭제는 영속성을 갖는 user에 한해서 가능합니다.');
    }

    if (this.articles === undefined) {
      throw new Error('영속성을 가는 user의 article 삭제를 위해서는 쿼리 시, articles르 정의해야 합니다.');
    }

    const index = this.articles.findIndex((art) => art.id === article.id);
    if (index >= 0) {
      this.articles.splice(index, 1);
    }
  }

  public favorite(article: Article | Article[]) {

    if (!this.isPersisted()) {
      throw new Error('favorite은 영속성을 갖는 user에 한해서 가능합니다.');
    }

    if (this.favorites === undefined) {
      throw new Error('영속성을 갖는 user에 favorite을 추가하기 위해서는 쿼리 시, favorites를 정의해야 합니다.');
    }

    if (article instanceof Article) {
      this.favorites.push(article);

    } else {
      this.favorites.splice(this.favorites.length, 0, ...article)
    }
  }

  public unfavorite(article: Article | Article[]) {

    if (!this.isPersisted()) {
      throw new Error('unfavorite은 영속성을 갖는 user에 한해서 가능합니다.');
    }

    if (this.favorites === undefined) {
      throw new Error('영속성을 갖는 user에 unfavorite을 하기 위해서는 쿼리 시, favorites를 정의해야 합니다.');
    }

    if (article instanceof Article) {
      const index = this.favorites.findIndex((favorite) => favorite.id === article.id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      }

    } else {
      const indexes: number[] = [];

      for (const a of article) {

        const index = this.favorites.findIndex((favorite) => favorite.id === a.id);
        if (index >= 0) {
          indexes.push(index);
        }
      }

      for (const i of indexes) {
        this.favorites.splice(i, 1);
      }
    }
  }
  
  public follow(user: User | User[]) {

    if (!this.isPersisted()) {
      throw new Error('follow는 영속성을 갖는 user에 한해서 가능합니다.');
    }

    if (this.followings === undefined) {
      throw new Error('영속성을 갖는 user에 follow를 추가하기 위해서는 쿼리 시, followings를 정의해야 합니다.');
    }

    if (user instanceof Array) {
      this.followings.splice(this.followings.length, 0, ...user);

    } else {
      this.followings.push(user);
    }
  }

  public unfollow(user: User | User[]) {

    if (!this.isPersisted()) {
      throw new Error('unfollow는 영속성을 갖는 user에 한해서 할 수 있습니다.');
    }

    if (this.followings === undefined) {
      throw new Error('영속성을 갖는 user가 unfollow를 하기 위해서는 쿼리 시, followings를 정의해야 합니다.');
    }

    if (user instanceof User) {
      const index = this.followings.findIndex((following) => following.id === user.id);
      if (index >= 0) {
        this.followings.splice(index, 1);
      }

    } else {
      const indexes: number[] = [];

      for (const u of user) {

        const index = this.followings.findIndex((following) => following.id === u.id);
        if (index >= 0) {
          indexes.push(index);
        }
      }

      for (const i of indexes) {
        this.followings.splice(i, 1);
      }
    }
  }

  public isFollowing(user: User) {

    if (!this.isPersisted()) {
      throw new Error('follow 여부는 영속성을 갖는 user에 한해서 확인할 수 있습니다.');
    }

    if (this.followings === undefined) {
      throw new Error('영속성을 갖는 user의 follow 여부를 확인하기 위해서는 쿼리 시, followings를 정의해야 합니다.');
    }

    return this.followings.some((following) => following.id === user.id);
  }
}
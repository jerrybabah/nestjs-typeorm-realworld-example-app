import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  public slug!: string;

  @Column('varchar')
  public title!: string;

  @Column('varchar')
  public description!: string;

  @Column('text')
  public body!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', // TODO: 이거 제대로 값이 들어가는지 확인
    // TODO: onUpdate 설정은 어떻게? 문자열로 뭘 어떡하라는거? (onUpdate?: string)
  })
  public updatedAt!: Date;

  @ManyToOne(() => User, user => user.articles)
  public author?: User

  @OneToMany(() => Comment, comment => comment.article)
  public comments?: Comment[];

  @ManyToMany(() => User, user => user.favorites)
  public favoriters?: User[];

  @ManyToMany(() => Tag, tag => tag.articles)
  @JoinTable({ name: 'tagging' })
  public tags?: Tag[];
}
import slugify from 'slugify';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
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
  })
  public createdAt!: Date;

  @Column({
    type: 'timestamp',
  })
  public updatedAt!: Date;

  @ManyToOne(() => User, user => user.articles, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public author?: User

  @OneToMany(() => Comment, comment => comment.article)
  public comments?: Comment[];

  @ManyToMany(() => User, user => user.favorites, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public favoriters?: User[];

  /**
   * ManyToMany에서의 onUpdate, onDelete 설정에서 아직 Open 상태인 Issue가 있다.
   * https://github.com/typeorm/typeorm/issues/4980
   * onUpdate를 코드 상에 적어줘도 DB에 적용되지 않는다.
   * 이 문제 뿐만 아니라, onDelete의 경우 한 쪽의 join column에서 설정하면 반대 join column에도 같은 조건으로 적용되버리는 문제가 있다.
   * 예시) 아래의 경우, tagging 테이블에서 articleId는 onDelete: 'CASCADE', tagId는 onDelete: 'NO ACTION'이라고 설정을 못한다. 
   * -> 한 쪽(joinTable 데코 있는 곳)에서 설정하면 나머지가 따라가니까
   * 
   * 해결 중이고 해결했을 시의 작동 방식으로 우선 코딩해두자. 이런거 해결하는게 오픈소스에 기여하는거겠구나
   * https://github.com/typeorm/typeorm/pull/5714
   */
  @ManyToMany(() => Tag, tag => tag.articles, {
    onUpdate: 'CASCADE', // TODO: 이거 적용 안되는거 해결됐는지 확인
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'tagging' })
  public tags?: Tag[];

  @BeforeInsert()
  private beforeInsertHandler() {
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.slug = `${slugify(this.title)}-${Date.now()}`;
  }

  @BeforeUpdate()
  private beforeUpdateHandler() {
    this.updatedAt = new Date();
  }

  constructor(props?: { title: string, description: string, body: string, author: User, tags?: Tag[] }) {
    if (props !== undefined) {
      this.title = props.title;
      this.description = props.description;
      this.body = props.body;
      this.author = props.author;
      this.tags = props.tags;
    }
  }
}
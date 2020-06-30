import { EntityManager } from 'typeorm';
import * as faker from 'faker';
import { ISeedOptions } from './index';
import { Comment } from '../entities/comment.entity';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';

export async function seedComments(transactionalEntityManager: EntityManager, options: ISeedOptions) {
  const commentRepository = transactionalEntityManager.getRepository(Comment);
  const articleRepository = transactionalEntityManager.getRepository(Article);
  const userRepository = transactionalEntityManager.getRepository(User);

  const articles = await articleRepository.find();
  const users = await userRepository.find();

  for await (const article of articles) {
    
    for (let i=0; i<options.article.commentCounts; i++) {
      const author = users[Math.floor(Math.random()*users.length)];

      const comment = new Comment({
        body: faker.lorem.sentence(),
        author,
        article,
      })

      await commentRepository.save(comment);
    }
  }
}
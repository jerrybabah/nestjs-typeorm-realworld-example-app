import { EntityManager } from 'typeorm';
import * as faker from 'faker';
import { ISeedOptions } from './index';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';

export async function seedArticles(transactionalEntityManager: EntityManager, options: ISeedOptions) {
  const articleRepository = transactionalEntityManager.getRepository(Article);
  const userRepository = transactionalEntityManager.getRepository(User);
  const tagRepository = transactionalEntityManager.getRepository(Tag);

  let insertedArticleCount = 0;

  while (insertedArticleCount < options.article.count) {
    const author = await userRepository.findOneOrFail(Math.floor(Math.random() * options.user.count) + 1)

    const article = new Article({
      title: faker.name.title(),
      description: faker.lorem.sentence(),
      body: faker.lorem.lines(),
      author,
    })

    const tags: Tag[] = [];

    while (tags.length < options.article.tagCounts) {
      const tagName = faker.lorem.word();

      if (tags.some((tag) => tag.name === tagName)) {
        continue;
      }

      let tag = await tagRepository.findOne({ name: tagName });

      if (!tag) {
        tag = await tagRepository.save(new Tag({ name: tagName }));
      }

      tags.push(tag);
    }

    article.tags = tags;

    try {
      await articleRepository.save(article);
      insertedArticleCount++;

    } catch(e) {
      continue;
    }
  }
}
import { EntityManager } from 'typeorm';
import { ISeedOptions } from './index';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';

export async function seedFavorites(transactionalEntityManager: EntityManager, options: ISeedOptions) {
  const userRepository = transactionalEntityManager.getRepository(User);
  const articleRepository = transactionalEntityManager.getRepository(Article);

  const users = await userRepository.find({ relations: ['favorites'] });
  const articles = await articleRepository.find();

  for await (const user of users) {

    const favorites: Article[] = [];

    while (favorites.length < options.user.favoriteCounts) {
      const favorite = articles[Math.floor(Math.random()*articles.length)];

      if (favorites.some((fav) => fav.id === favorite.id)) {
        continue;
      } else {
        favorites.push(favorite);
      }
    }

    user.favorite(favorites);
    await userRepository.save(user);
  }
}
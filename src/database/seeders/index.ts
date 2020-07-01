import { createConnection } from 'typeorm';
import { seedUsers } from './user.seed';
import { seedFollows  } from './follow.seed';
import { seedArticles } from './article.seed';
import { seedComments } from './comment.seed';
import { seedFavorites } from './favorite.seed';

export interface ISeedOptions {
  user: {
    count: number;
    favoriteCounts: number;
    followCounts: number;
  },
  article: {
    count: number;
    tagCounts: number;
    commentCounts: number;
  }
}

export const seedOptions: ISeedOptions = {
  user: {
    count: 10,
    favoriteCounts: 5,
    followCounts: 1,
  },
  article: {
    count: 50,
    tagCounts: 5,
    commentCounts: 3,
  }
}

export async function seed(options: ISeedOptions) {
  const connection = await createConnection('cli');

  try {
    await connection.transaction(async (transactionalEntityManager) => {
      await seedUsers(transactionalEntityManager, options);
      await seedFollows(transactionalEntityManager, options);
      await seedArticles(transactionalEntityManager, options);
      await seedComments(transactionalEntityManager, options);
      await seedFavorites(transactionalEntityManager, options);
    })

    console.log('seed success.');

  } catch(e) {
    console.error('seed fail.\n', e);
    await connection.close();
  }
}

seed(seedOptions)
.then(() => {
  process.exit();
})
.catch((reason) => console.error('db connection fail.\n', reason));

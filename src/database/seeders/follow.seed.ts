import { EntityManager } from 'typeorm';
import { ISeedOptions } from './index';
import { User } from '../entities/user.entity';

export async function seedFollows(transactionalEntityManager: EntityManager, options: ISeedOptions) {
  const userRepository = transactionalEntityManager.getRepository(User);

  const users = await userRepository.find({ relations: ['followings'] });

  for await (const user of users) {
    const anothers: User[] = [];

    while (anothers.length < options.user.followCounts) {
      const another = users[Math.floor(Math.random()*users.length)];

      if (anothers.some((ano) => ano.id === another.id)) {
        continue;
      } else {
        anothers.push(another);
      }
    }

    user.follow(anothers);
    await userRepository.save(user);
  }
}
import { EntityManager } from 'typeorm';
import * as faker from 'faker';
import { ISeedOptions } from './index';
import { User } from '../entities/user.entity';

export async function seedUsers(transactionalEntityManager: EntityManager, options: ISeedOptions) {
  const userRepository = transactionalEntityManager.getRepository(User);

  let insertedUserCount = 0;
  
  while (insertedUserCount < options.user.count) {
    const user = new User({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.lorem.words(),
      bio: faker.lorem.sentences(),
    })

    try {
      await userRepository.save(user);
      insertedUserCount++;

    } catch(e) {
      continue;
    }
  }
}

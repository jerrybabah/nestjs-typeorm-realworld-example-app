import { Injectable } from '@nestjs/common';
// import { Transaction, TransactionRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProfileDTO } from './profile.dto';
import { ProfileDataMapper } from './profile.mapper';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private profileDataMapper: ProfileDataMapper,
  ) {}

  public async getProfile(username: string): Promise<IProfileDTO> {
    const user = await this.userRepository.findOneOrFail({
      username,
    });

    return this.profileDataMapper.userToProfileDTO(user);
  }

  // @Transaction()
  // public async getProfile(username: string, @TransactionRepository(User) userRepository: Repository<User>): IProfileDTO {
  //   const user = await userRepository.findOneOrFail({ username })
  // }
}
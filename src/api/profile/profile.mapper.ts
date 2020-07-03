import { Injectable } from '@nestjs/common';
import { IProfileDTO } from './profile.dto';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class ProfileDataMapper {
  public userToProfileDTO(user: User): IProfileDTO {
    return {
      profile: {
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: false,
      }
    }
  }
}
import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { IProfileDTO } from './profile.dto';

@Controller('api/profiles')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
  ) {}

  @Get(':username')
  public async getProfile(@Param('username') username: string): Promise<IProfileDTO> {
    return this.profileService.getProfile(username);
  }
}
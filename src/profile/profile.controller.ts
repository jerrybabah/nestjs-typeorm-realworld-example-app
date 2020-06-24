import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('api/profiles')
export class ProfileController {

  @Get(':username')
  public getProfile() {
    return '프로필 정보를 반환한다.';
  }

  @Post(':username/follow')
  public follow() {
    return '팔로우한다.';
  }

  @Delete(':username/follow')
  public unfollow() {
    return '언팔로운한다.';
  }
}
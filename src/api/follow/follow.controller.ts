import { Controller, Post, Delete } from '@nestjs/common';

@Controller('api/profiles/:username/follow')
export class FollowController {

  @Post()
  public follow() {
    return '팔로우한다.';
  }

  @Delete()
  public unfollow() {
    return '언팔로우한다.';
  }
}
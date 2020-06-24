import { Controller, Get } from '@nestjs/common';

@Controller('api/profiles')
export class ProfileController {

  @Get(':username')
  public getProfile() {
    return '프로필 정보를 반환한다.';
  }
}
import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('api')
export class AuthController {

  @Post('users/login')
  public login() {
    return '로그인을 진행한다.';
  }

  @Post('users')
  public register() {
    return '회원가입 진행';
  }

  @Get('user')
  public getCurrentUser() {
    return '현재 토큰 사용자 정보를 반환한다.';
  }

  @Put('user')
  public updateUser() {
    return '사용자 정보를 갱신한다.';
  }
}
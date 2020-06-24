import { Controller, Get } from '@nestjs/common';

@Controller('api/tags')
export class TagController {

  @Get()
  public getTags() {
    return '태그 정보를 반환한다.';
  }
}
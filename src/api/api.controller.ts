import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {

  @Get()
  public getApiDoc() {
    return 'api document 반환';
  }
}
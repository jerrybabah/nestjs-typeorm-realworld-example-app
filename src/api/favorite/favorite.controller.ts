import { Controller, Post, Delete } from '@nestjs/common';

@Controller('api/articles/:slug/favorite')
export class FavoriteController {

  @Post()
  public favorite() {
    return '글 좋아요 표시';
  }

  @Delete()
  public unfavorite() {
    return '글 좋아요 표시 삭제';
  }
}
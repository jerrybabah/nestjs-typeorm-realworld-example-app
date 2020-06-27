import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('api/articles')
export class ArticleController {

  @Get()
  public getArticles() {
    return '글 리스트 반환';
  }

  @Post()
  public createArticle() {
    return '글 생성';
  }

  @Get('feed')
  public getFeed() {
    return '피드에 해당하는 글 리스트 반환';
  }

  @Get(':slug')
  public getArticle() {
    return '해당 글 반환';
  }

  @Put(':slug')
  public updateArticle() {
    return '글 업데이트';
  }

  @Delete(':slug')
  public deleteArticle() {
    return '해당 글 삭제';
  }
}
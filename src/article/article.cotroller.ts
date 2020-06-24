import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('api/articles')
export class ArticleController {

  @Get()
  public getArticles() {
    return '글 리스트 반환';
  }

  @Get('feed')
  public getFeed() {
    return '피드에 해당하는 글 리스트 반환';
  }

  @Get(':slug')
  public getArticle() {
    return '해당 글 반환';
  }

  @Post()
  public createArticle() {
    return '글 생성';
  }

  @Put(':slug')
  public updateArticle() {
    return '글 업데이트';
  }

  @Delete(':slug')
  public deleteArticle() {
    return '해당 글 삭제';
  }

  @Post(':slug/comments')
  public addCommentToArticle() {
    return '댓글 추가';
  }

  @Get(':slug/comments')
  public getCommentsFromArticle() {
    return '글의 댓글 반환';
  }

  @Delete(':slug/comments/:id')
  public deleteComment() {
    return '댓글 삭제';
  }

  @Post(':slug/favorite')
  public favorite() {
    return '글 좋아요 표시';
  }

  @Delete(':slug/favorite')
  public unfavorite() {
    return '글 좋아요 표시 삭제';
  }
}
import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('api/articles/:slug/comments')
export class CommentController {

  @Post()
  public addCommentToArticle() {
    return '댓글 추가';
  }

  @Get()
  public getCommentsFromArticle() {
    return '글의 댓글 반환';
  }

  @Delete(':id')
  public deleteComment() {
    return '댓글 삭제';
  }
}
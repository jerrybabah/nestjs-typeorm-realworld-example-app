import { Module } from '@nestjs/common';
import { ArticleController } from './article.cotroller';

@Module({
  controllers: [ArticleController],
})
export class ArticleModule {}
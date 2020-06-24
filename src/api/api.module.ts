import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comments.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FollowModule } from './follow/follow.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [ArticleModule, AuthModule, CommentModule, FavoriteModule, FollowModule, ProfileModule, TagModule],
  controllers: [ApiController],
})
export class ApiModule {}

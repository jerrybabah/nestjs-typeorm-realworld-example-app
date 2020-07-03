import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileDataMapper } from './profile.mapper';
import { ProfileService } from './profile.service';
import { User } from '../../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ProfileDataMapper, ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
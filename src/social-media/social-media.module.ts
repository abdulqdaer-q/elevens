import { Module } from '@nestjs/common';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './entity/social-media';

@Module({
  imports:[TypeOrmModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService]
})
export class SocialMediaModule {}

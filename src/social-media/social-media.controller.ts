
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto.ts/create-social-media.dto.ts';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Get()
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.socialMediaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.update(id, updateSocialMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.socialMediaService.remove(id);
  }
}

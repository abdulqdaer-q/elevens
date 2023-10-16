
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialMedia } from './entity/social-media';
import { CreateSocialMediaDto } from './dto/create-social-media.dto.ts/create-social-media.dto.ts';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectRepository(SocialMedia)
    private readonly socialMediaRepository: Repository<SocialMedia>,
  ) {}

  async create(createSocialMediaDto: CreateSocialMediaDto): Promise<SocialMedia> {
    const socialMedia = this.socialMediaRepository.create(createSocialMediaDto);
    return this.socialMediaRepository.save(socialMedia);
  }

  async findAll(): Promise<SocialMedia[]> {
    return this.socialMediaRepository.find();
  }

  async findOne(id: number): Promise<SocialMedia> {
    return this.socialMediaRepository.findOne({where:{id}});
  }

  async update(id: number, updateSocialMediaDto: CreateSocialMediaDto): Promise<SocialMedia> {
    await this.socialMediaRepository.update(id, updateSocialMediaDto);
    return this.findOne(id);
  }

  async remove(id: number){
    await this.socialMediaRepository.delete(id);
    return `Socail media table with ID ${id} has been deleted `
  }
}

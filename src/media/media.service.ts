// src/media/media.service.ts

import { Injectable, NotFoundException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Media } from './entity/media/media';
import { CreateMediaDto } from './dto/create-media.dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto/update-media.dto';
import { extname } from 'path';

@Injectable()
export class MediaService {

  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,

  ) {}

  async create(CreateMediaDto : CreateMediaDto, file: Express.Multer.File[],
    ){
      const res = []
      file.forEach(async file =>{
        //id validtion ?
        //send the type ?
      const type = extname(file.originalname)
      if(type =='.svg') var table = 'aminets'
      else table = 'apartment'
      const name  = table + '-' + file.filename
      const media = await this.mediaRepository.create({ ...CreateMediaDto,table:table,filePath:file.path,name : name ,type : type});
      await res.push(media)
      await this.mediaRepository.save(media)
     }) 
    return res
  }

  
  /*
  async getMediaForApartment(apartmentId: number) {
   /* return this.mediaRepository
      .createQueryBuilder('media')
      .innerJoin('media.apartment', 'apartment')
      .where('apartment.id = :apartmentId', { apartmentId })
      .getMany();*/
/*
      const query = `Select *
      FROM media
      LEFT JOIN apartments ON media.columnId = apartments.id
      where media.columnId = ${apartmentId}`;
      const result = await this.connection.query(query);
      return result
  }/*/
/*  async getMediaForAm(id:number){
    const res = this.mediaRepository.createQueryBuilder('media').innerJoinAndSelect
    ('amenities', 'amenities.id = media.columnID','media.table = :table', { table: 'aminets' })
    .getMany()
    return res
  }*/
  
  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({where : {id}});
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async findAll(){
    return this.mediaRepository.find();
  }

  async update(id: number, updateMediaDto: UpdateMediaDto,file: Express.Multer.File[]){
    
    const res = []
    file.forEach(async file =>{
    const type = extname(file.originalname)
    if(type =='.svg') var table = 'aminets'
     else table = 'apartment'
     const name  = table + '-' + file.filename
    const media = await this.findOne(id);
    await this.mediaRepository.save({ ...media, ...updateMediaDto,table:table,filePath:file.path,name : name ,type : type });
  })
}

  async remove(id: number): Promise<void> {
    const media = await this.findOne(id);
    await this.mediaRepository.remove(media);
  }


  async findMedia(id:number){
    return  await this.mediaRepository.find({where :{columnId:id}})
  }
}

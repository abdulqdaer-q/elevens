// src/media/media.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFiles, ValidationPipe } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto/update-media.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Media } from './entity/media/media';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
     
   @Post('create')
   @UseInterceptors(FilesInterceptor('media',40,{
    storage:diskStorage({
      destination: './uploads',
      
      filename: (req, file, callback) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const name = file.originalname.split('.')[0]
          const filename = name + '-' + `${uniqueSuffix}${ext}`;
          callback(null, filename);
       }, 
    })
  }))
   create(@Body (new ValidationPipe()) createMediaDto : CreateMediaDto,
   @UploadedFiles() files : Express.Multer.File[]){
    return this.mediaService.create(createMediaDto,files);
   }
  
 
    /*
   @Get('am/:id')
   getMedi(@Param('id') id: number){
    return this.mediaService.getMediaForAm(id)
   }*/
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mediaService.findOne(+id);
  }

  /*
  @Get('apartment/:id')
  findMedia(@Param('id') id: number) {
    return this.mediaService.getMediaForApartment(id);
  }*/

  @Get('')
  findAll() {
    return this.mediaService.findAll();
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('media',40,{
    storage:diskStorage({
      destination: './uploads',
      
      filename: (req, file, callback) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const name = file.originalname.split('.')[0]
          const filename = name + '-' + `${uniqueSuffix}${ext}`;
          callback(null, filename);
       }, 
    })
  }))
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto,
  @UploadedFiles() file : Express.Multer.File[]) {
    return this.mediaService.update(+id, updateMediaDto,file);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mediaService.remove(id)
  }
}

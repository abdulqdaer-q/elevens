import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Amenitie } from './entity/amenities/amenities';
import { Repository } from 'typeorm';
import { CreateAmenitiesDto } from './dto/create-amenities.dto.ts/create-amenities.dto.ts';
import { UpdateAmenitiesDto } from './dto/update-amenities.dto.ts/update-amenities.dto.ts';
import { Media } from 'src/media/entity/media/media';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenitie) private ameniteRepository: Repository<Amenitie>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly mediaService : MediaService,
    
  ) {}

  async findAll(){/*
    const res = []
    const media = await this.mediaRepository.find({where : {table : 'aminets'}})
     media.forEach(async e => {
      const am =await this.ameniteRepository.find()
      am.forEach(async element => {
        element.id = e.columnId
        console.log({media : e ,am:element})
       await res.push({media : e ,am:element})

      });
    });*/
    let s =[]
    const res = await 
    this.ameniteRepository 
     .createQueryBuilder('amenities').innerJoinAndSelect('media','media.columnId = amenities.id')
     .getMany()
     const media = await this.mediaRepository.find({where : {table : 'aminets'}})
     for (let index = 0; index < res.length ; index++) {
      s.push({amenities:res[index],media : media[index]})
     }

    return s;
    }

  async findOne(id: number){
    /*const res = 
    this.ameniteRepository 
     .createQueryBuilder('amenities').innerJoinAndSelect('media','media.columnId',)
    .where('media.table = :table', { table: 'aminets' })
     .getMany()*/
      const media = await this.mediaService.findMedia(id)
      const res =  await this.ameniteRepository.findOne({where : {id}})
      return {res : res,media : media}
  }

 async create(amenitie : CreateAmenitiesDto)   {
    return await this.ameniteRepository.save( 
        this.ameniteRepository.create({...amenitie}))
  }

 async update(id : number , amenitie : UpdateAmenitiesDto) {
    return await this.ameniteRepository.update(id,amenitie)
  }

  async remove(id : number) {
     await this.ameniteRepository.delete(id)
     return `Amenite with id ${id} has been deleted`
  }
}

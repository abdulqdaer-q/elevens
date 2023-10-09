// src/apartment/apartment.service.ts

import { Injectable } from '@nestjs/common';
import { Connection, DataSource, Repository, getManager, getRepository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Apartment } from './entity/apartment/apartment';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Media } from 'src/media/entity/media/media';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    @InjectConnection() private readonly connection: Connection,

  ) {}

  findAll(): Promise<Apartment[]> {
    return this.apartmentRepository.find();
  }

  


  async findOne(id: number){
    //remove the join 
    const query = `Select name,filePath
    FROM media
    LEFT JOIN apartments ON media.columnId = apartments.id
    where media.columnId = ${id}`;
    const result = await this.connection.query(query);
    const apartment = await this.apartmentRepository.findOne({ where: { id } })
    return { apartment :apartment,media:result};
  }

  create(apartment: CreateApartmentDto) {
    return this.apartmentRepository.save(
      this.apartmentRepository.create({ ...apartment }),
    );
  }

  async update(id: number, apartment: UpdateApartmentDto) {
    await this.apartmentRepository.update(id, apartment);
    return this.apartmentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.apartmentRepository.delete(id);
  }
}

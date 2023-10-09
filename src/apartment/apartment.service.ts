// src/apartment/apartment.service.ts

import { Injectable } from '@nestjs/common';
import {
  Connection,
  DataSource,
  RelationId,
  Repository,
  getManager,
  getRepository,
} from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Apartment } from './entity/apartment/apartment';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Media } from 'src/media/entity/media/media';
import { ApartmentAmenity } from './entity/apartment/ApartmentAmenity ';
import { Amenitie } from 'src/amenities/entity/amenities/amenities';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Apartment)
    private apartmentRepository: Repository<Apartment>,
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(ApartmentAmenity)
    private readonly apartmentAmenityRepository: Repository<ApartmentAmenity>,
    @InjectRepository(Amenitie)
    private readonly amenitieRepository: Repository<Amenitie>,
  ) {}

  async findAll() {
    const apartments = await this.apartmentRepository.find();
    const promises = apartments.map(async (e) => {
      const query = `SELECT name, filePath
    FROM media
    LEFT JOIN apartments ON media.columnId = apartments.id
    WHERE media.table = 'apartment' AND media.columnId = ${e.id}`;
      const media = await this.connection.query(query);
      return { media: media, apartments: e };
    });
    const apartmentsMedia = await Promise.all(promises);

    return apartmentsMedia;
  }

  async addAmenityToApartment(apartmentId: number, amenityId: number) {
    // Find the apartment and amenity based on their IDs
    const apartment = await this.apartmentRepository.findOne({
      where: { id: apartmentId },
    });

    const amenity = await this.amenitieRepository.findOne({
      where: { id: amenityId },
    });
    if (!apartment || !amenity) {
      throw new Error('Apartment or amenity not found');
    }

    const apartmentAmenity = new ApartmentAmenity();
    apartmentAmenity.apartment = apartment;
    apartmentAmenity.amenitieId = amenity;

    await this.apartmentAmenityRepository.save(apartmentAmenity);
    const reloadedApartment = await this.apartmentRepository
      .createQueryBuilder('apartment')
      .leftJoinAndSelect('apartment.amenities', 'amenities')
      .where('apartment.id = :id', { id: apartmentId })
      .getMany();

    return reloadedApartment;
  }

  async findOne(id: number) {
    /*const reloadedApartment = await this.apartmentRepository
    .createQueryBuilder('apartment')
    .leftJoinAndSelect('apartment.amenities', 'amenities')
    .where('apartment.id = :id', { id: id })
    .getMany();
    relations: ['apartment' ,'amenitieId']
    //const apartment = await this.apartmentRepository.findOne({ where: { id } ,relations: ['amenitie']})
     // Query the junction table to get the associated amenity IDs
    /*
    const apartmentAmenities = await this.apartmentAmenityRepository.find({
      where: { apartment: { id: id } },
    });
    //console.log(apartmentAmenities)

    // Extract amenity IDs from the junction table results
    const amenityIds = await apartmentAmenities.map((association) =>{ association.amenitieId
  //     console.log(association.amenitieId)
      });
   // console.log(amenityIds)

    // Query the amenities based on their IDs
    let z = []
    const amenities = await apartmentAmenities.forEach(async e => {
      let x = await this.amenitieRepository.findOneBy(e.amenitieId);
      z.push(x)

    })
   // apartment.amenitie=z*/

    const query = `Select name,filePath
    FROM media
    LEFT JOIN apartments ON media.columnId = apartments.id
    where media.columnId = ${id}`;
    let amenities = [];
    const result = await this.connection.query(query);
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    const apartmentAmenities = await this.apartmentAmenityRepository.find({
      where: { apartment: { id: id } },
      relations: ['apartment', 'amenitieId'],
    });
    if (!apartment) {
      throw new Error('Apartment not found');
    }
    apartmentAmenities.map((e) => {
      amenities.push(e.amenitieId);
    });
    let amenitiesId = [];
    amenities.map((e) => {
      e.id;
      amenitiesId.push(e.id);
    });

    const promises = amenitiesId.map(async (e) => {
      const query = `SELECT name, filePath
    FROM media
    LEFT JOIN amenities ON media.columnId = amenities.id
    WHERE media.columnId = ${e}`;
      return await this.connection.query(query);
    });

    const amenitiesMedia = await Promise.all(promises);
    apartment.amenitie = amenities;
    return {
      apartment: apartment,
      media: result,
      amenitiesMedia: amenitiesMedia,
    };
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

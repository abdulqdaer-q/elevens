import { Injectable } from '@nestjs/common';
import {
  Connection,
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
    let amenities = [];
    let amenitiesId = [];
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    const query = `Select filePath  
    FROM media
    LEFT JOIN apartments ON media.columnId = apartments.id
    WHERE media.columnId = ${id} AND media.table = 'apartment'`;
    const apartmentAmenities = await this.apartmentAmenityRepository.find({
      where: { apartment: { id: id } },
      relations: ['apartment', 'amenitieId'],
    });
    apartmentAmenities.map((e) => {
      amenities.push(e.amenitieId);
    });
    amenities.map((e) => {
      e.id;
      amenitiesId.push(e.id);
    });

    const promises = amenitiesId.map(async (e) => {
      const query = `SELECT name, filePath, amenities.title
    FROM media 
    LEFT JOIN amenities ON media.columnId = amenities.id
    WHERE media.columnId = ${e} AND media.table = 'amenities'`;
      return await this.connection.query(query);
    });

    const result = await this.connection.query(query);
    const amenitiesMedia = await Promise.all(promises);

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

  async remove(id: number) {
    await this.apartmentRepository.delete(id);
    return `Property with ID ${id} has been deleted `;
  }
}

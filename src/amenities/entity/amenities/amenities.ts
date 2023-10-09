import {  ApiProperty } from '@nestjs/swagger';
import { ApartmentAmenity } from 'src/apartment/entity/apartment/ApartmentAmenity ';
import { Apartment } from 'src/apartment/entity/apartment/apartment';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name : 'amenities'})
export class Amenitie {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @OneToMany(
    () => ApartmentAmenity,
    (apartmentAmenity) => apartmentAmenity.amenitieId,
  )
  apartments: ApartmentAmenity[];

}

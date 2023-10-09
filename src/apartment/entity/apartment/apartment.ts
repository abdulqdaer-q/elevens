// src/apartment/entity/apartment.entity.ts

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Amenitie } from 'src/amenities/entity/amenities/amenities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ApartmentAmenity } from './ApartmentAmenity ';

@Entity({name : 'apartments'})
export class Apartment {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  desc: string;

  @ApiProperty()
  @Column({ type: 'decimal'})
  price: number;

  @ApiProperty()
  @Column({ type: 'decimal'})
  bedRooms: number;

  
  @ApiProperty()
  @Column({ type: 'decimal'})
  baths: number;

  
  @ApiProperty()s
  @Column()
  space: string;

  @ApiProperty()
  @Column()
  rented: boolean;

  @ApiProperty()
  @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D'] })
  category: string;

  @OneToMany(
    () => ApartmentAmenity,
    (apartmentAmenity) => apartmentAmenity.apartment,
  )
  amenities: ApartmentAmenity[];

  @ManyToMany(() => Amenitie)
  @JoinTable()
  amenitie: Amenitie[];

}

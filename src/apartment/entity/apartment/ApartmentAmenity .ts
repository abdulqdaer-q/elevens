// src/apartment/entity/apartment-amenity.entity.ts

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Apartment } from './apartment';
import { Amenitie } from 'src/amenities/entity/amenities/amenities';

@Entity({ name: 'apartment_amenity' }) // Name for the junction table
export class ApartmentAmenity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Apartment, (apartment) => apartment.amenities)
  apartment: Apartment;

  @ManyToOne(() => Amenitie, (amenitie) => amenitie.apartments)
  amenitieId: Amenitie;
}

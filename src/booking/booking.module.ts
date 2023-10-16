import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entity/booking';
import { Apartment } from 'src/apartment/entity/apartment/apartment';
import { GoogleCalendarService } from './calnedar.service';
import { ApartmentService } from 'src/apartment/apartment.service';
import { Media } from 'src/media/entity/media/media';
import { ApartmentAmenity } from 'src/apartment/entity/apartment/ApartmentAmenity ';
import { Amenitie } from 'src/amenities/entity/amenities/amenities';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Apartment,Media,ApartmentAmenity,Amenitie])],
  providers: [BookingService,GoogleCalendarService,ApartmentService],
  controllers: [BookingController]
})
export class BookingModule {}

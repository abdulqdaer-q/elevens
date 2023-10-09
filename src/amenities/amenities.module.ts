import { Module } from '@nestjs/common';
import { Amenitie } from './entity/amenities/amenities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';
import { Media } from 'src/media/entity/media/media';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Amenitie,Media])],
  controllers: [AmenitiesController],
  providers: [AmenitiesService,MediaService]
})
export class AmenitiesModule {}

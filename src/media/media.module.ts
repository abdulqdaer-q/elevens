import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entity/media/media';
//import { Apartment } from 'src/apartment/entity/apartment/apartment';
//import { ApartmentService } from 'src/apartment/apartment.service';
import { MediaController } from './media.controller';
//import { ApartmentController } from 'src/apartment/apartment.controller';
//import { ApartmentModule } from 'src/apartment/apartment.module';

@Module({
  imports : [TypeOrmModule.forFeature([Media])],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}

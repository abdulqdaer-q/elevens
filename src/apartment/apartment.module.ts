import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entity/apartment/apartment';
import { Media } from 'src/media/entity/media/media';
/*import { Media } from 'src/media/entity/media/media';
import { MediaService } from 'src/media/media.service';
import { MediaController } from 'src/media/media.controller';
import { MediaModule } from 'src/media/media.module';*/

@Module({
  imports: [TypeOrmModule.forFeature([Apartment,Media])],
  controllers: [ApartmentController],
  providers: [ApartmentService]
})
export class ApartmentModule {}

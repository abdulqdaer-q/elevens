import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentModule } from './apartment/apartment.module';
import { Apartment } from './apartment/entity/apartment/apartment';
import { MediaModule } from './media/media.module';
import { Media } from './media/entity/media/media';
import { MulterModule } from '@nestjs/platform-express';
import "reflect-metadata";
import { AmenitiesModule } from './amenities/amenities.module';
import { Amenitie } from './amenities/entity/amenities/amenities';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/entity/contact/contact';
import { ApartmentAmenity } from './apartment/entity/apartment/ApartmentAmenity ';
import { SocialMediaModule } from './social-media/social-media.module';
import { SocialMedia } from './social-media/entity/social-media';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entity/booking';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';





@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default', // Ensure the connection name matches
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'loca1234',
      database: 'elevens',
      entities: [Apartment,Media,Amenitie,Contact,ApartmentAmenity,SocialMedia,Booking],
      synchronize: true,
    }),
    AmenitiesModule,
    ContactModule,
    ApartmentModule,
    MediaModule,
    SocialMediaModule,
    BookingModule,

  
    MulterModule.register({dest:'./uplodas'}),
/* 
   ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','uploads'),
      serveStaticOptions: {

        index: false
      }
      
    }), */
  
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

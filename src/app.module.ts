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
      entities: [Apartment,Media,Amenitie,Contact],
      synchronize: true,
    }),
    AmenitiesModule,
    ContactModule,
    ApartmentModule,
    MediaModule,


    
    MulterModule.register({dest:'./uplodas'}),


    
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

// src/apartment/apartment.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './entity/apartment/apartment';
import { ValidationPipe} from '@nestjs/common';
import {UpdateApartmentDto} from './dto/update-apartment.dto'
import {CreateApartmentDto} from './dto/create-apartment.dto'
import { ApiCreatedResponse, ApiDefaultResponse, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('apartments')
export class ApartmentController {
  constructor(
  private readonly apartmentService: ApartmentService) {}


  @Get('')
  findAll(){
    return this.apartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.apartmentService.findOne(id);
  }

  

  @Post('')
  create(@Body(new ValidationPipe()) createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.create({...createApartmentDto});
  }
  @Post('addAmenities')
  async addAmenities(@Body(new ValidationPipe()) amenities) {
    if (!Array.isArray(amenities)) {
      throw new Error('Amenities should be an array'); // Handle error appropriately
    }

    // Process each amenity in the array
    const results = [];
    for (const amenity of amenities) {
      const { apartmentId, amenityId } = amenity;
      const result = await this.apartmentService.addAmenityToApartment(apartmentId, amenityId);
      await results.push(result);
      console.log(results)
    }
    

    return results;
  }


  
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateApartmentDto: UpdateApartmentDto,
  ): Promise<Apartment> {
    return this.apartmentService.update(id, updateApartmentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<void> {
    return this.apartmentService.remove(id);
  }
}

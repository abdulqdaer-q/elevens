import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { Amenitie } from './entity/amenities/amenities';
import { CreateAmenitiesDto } from './dto/create-amenities.dto.ts/create-amenities.dto.ts';
import { UpdateAmenitiesDto } from './dto/update-amenities.dto.ts/update-amenities.dto.ts';

@Controller('amenities')
export class AmenitiesController {
    constructor(
        private readonly ameniteService : AmenitiesService
    ){}

    @Get('')
    findAll(){
        return this.ameniteService.findAll()
    }

    @Get(':id')
    findOnd(@Param('id') id : number){
        return this.ameniteService.findOne(id)
    }


    @Post('')
    create(@Body(new ValidationPipe()) createAmenitiesDto : CreateAmenitiesDto){
        return this.ameniteService.create({...createAmenitiesDto})
    }

    @Put(':id')
    update(@Param('id') id : number , 
     @Body(new ValidationPipe()) updateAmenitiesDto : UpdateAmenitiesDto){
        return this.ameniteService.update(id,updateAmenitiesDto)
    }

    @Delete(':id')
    remove(@Param('id') id : number){
        return this.ameniteService.remove(id)
    }
}

// src/apartment/dto/create-apartment.dto.ts
// src/apartment/dto/create-apartment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsEnum, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  desc: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  bedRooms: number;

  @IsNumber()
  @ApiProperty()
  baths: number;

  @IsString()
  @ApiProperty()
  space: string;


  @IsBoolean()
  @ApiProperty()
  rented: boolean;

  @IsEnum(['One Bedroom', 'Studio', 'Penta House', 'Loft'])
  @ApiProperty({enum:  ['One Bedroom', 'Studio', 'Penta House', 'Loft']})
  category: string;
}



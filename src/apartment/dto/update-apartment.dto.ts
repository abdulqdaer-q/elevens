// src/apartment/dto/update-apartment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsEnum, IsOptional, IsNumber, IsBoolean } from 'class-validator';
export class UpdateApartmentDto {
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

  @IsEnum(['A','B'])
  @ApiProperty({enum: ['A', 'B']})
  category: string;
}

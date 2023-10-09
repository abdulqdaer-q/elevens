// src/media/dto/create-media.dto.ts

import { IsString, IsEnum, IsNumber } from 'class-validator';
import { Apartment } from 'src/apartment/entity/apartment/apartment';

export class CreateMediaDto {
  @IsNumber()
  columnId: number;
}

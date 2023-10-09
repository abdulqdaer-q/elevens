// src/media/dto/update-media.dto.ts

import { IsNumber } from 'class-validator';

export class UpdateMediaDto {
  @IsNumber()
  columnId: number;
}

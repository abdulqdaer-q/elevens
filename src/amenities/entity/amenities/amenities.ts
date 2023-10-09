import {  ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name : 'amenities'})
export class Amenitie {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

}

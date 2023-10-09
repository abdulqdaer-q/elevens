// src/media/media.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Apartment } from '../../../apartment/entity/apartment/apartment';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; 

  
  @Column()
  filePath: string; 

  @Column()
  table:string

  
  @Column()
  columnId:number

}

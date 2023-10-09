// src/contact/contact.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contacts') 
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ name: 'phone', length: 15 })
  phone: string;

  @Column()
  message: string;
}

import { Apartment } from 'src/apartment/entity/apartment/apartment';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Apartment)
  apartment: Apartment;

  @Column()
  renterName: string;

  @Column()
  eventId: string;

  @Column()
  renterEmail: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  // Other booking details
}

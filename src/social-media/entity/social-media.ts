import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('social_media')
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  linkedIn: string;
}

// booking.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entity/booking';
import { CreateBookingDto } from './dto/create-booking.dto.ts/create-booking.dto.ts';
import {UpdateBookingDto} from './dto/update-booking.dto.ts/update-booking.dto.ts'
import { GoogleCalendarService } from './calnedar.service';
import { ApartmentService } from 'src/apartment/apartment.service';


@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly calendarService: GoogleCalendarService,
    private readonly apartmentService: ApartmentService,


  ) {}

  async createBooking(bookingDto: any) {
    const { apartmentId, renterName, renterEmail, startDate, endDate } = bookingDto;

    // You should add validation and error handling here

    // Check apartment availability and other business logic
    const apartment = await this.apartmentService.findOne(apartmentId)
    if(!apartment) throw new NotFoundException('Apartment not found');

    // Create a new booking
    const booking = {
      apartment: { id: apartmentId }, // Assuming you have an Apartment entity
      renterName,
      renterEmail,
      startDate,
      endDate,
    };

    
const eventDetails = {
  summary: `Booking for ${booking.renterName}`,
  description: `Price: $${apartment.apartment.price}`, // Include the price in the event description
  start: {
    dateTime: booking.startDate,
    timeZone: 'Africa/Cairo',
  },
  end: {
    dateTime: booking.endDate,
    timeZone: 'Africa/Cairo',
  },
};


const event = await this.calendarService.createGoogleCalendarEvent('mahmoud.ziad.alsaeid@gmail.com',eventDetails)
await this.bookingRepository.create({...booking , eventId:event})
return  await this.bookingRepository.save({...booking , eventId:event});

  }

  async findBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({where :{id}});
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async updateBooking(id: number, bookingDto: UpdateBookingDto): Promise<Booking> {
    const existingBooking = await this.findBookingById(id);

    // Update booking properties as needed
    existingBooking.renterName = bookingDto.renterName;
    existingBooking.renterEmail = bookingDto.renterEmail;
    existingBooking.startDate = bookingDto.startDate;
    existingBooking.endDate = bookingDto.endDate;

    return this.bookingRepository.save(existingBooking);
  }

  async deleteBooking(id: string): Promise<void> {
    const booking = await this.bookingRepository.find({where : {eventId : id}});
    await this.calendarService.deleteGoogleCalendarEvent(id)
    await this.bookingRepository.remove(booking);
  }
}

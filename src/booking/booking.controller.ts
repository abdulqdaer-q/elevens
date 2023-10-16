// booking.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, Redirect, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking';
import { CreateBookingDto } from './dto/create-booking.dto.ts/create-booking.dto.ts';
import {UpdateBookingDto} from './dto/update-booking.dto.ts/update-booking.dto.ts'
import { GoogleCalendarService } from './calnedar.service';
import { Response } from 'express';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly calendarService: GoogleCalendarService

    ) {}

  @Post()
  async createBooking(@Body() bookingDto: any){
    return await this.bookingService.createBooking(bookingDto);
    ;
  }

  @Get()
  async getBookings(): Promise<Booking[]> {
    const bookings = await this.bookingService.findBookings();
    return bookings;
  }

  @Get('events')
  async getEvents(){
    const events =  await this.calendarService.listGoogleCalendarEvents()
    return events
  }
  @Get(':id')
  async getBooking(@Param('id') id: number): Promise<Booking> {
    const booking = await this.bookingService.findBookingById(id);
    return booking;
  }

  @Put(':id')
  async updateBooking(
    @Param('id') id: number,
    @Body() bookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const updatedBooking = await this.bookingService.updateBooking(id, bookingDto);
    return updatedBooking;
  }
  @Delete('events/:id')
  async deleteEvent(@Param('id') id: string){
    await this.calendarService.deleteGoogleCalendarEvent(id)
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: number): Promise<void> {
    const booking = await this.bookingService.findBookingById(id)
    const eventId = booking.eventId
    await this.bookingService.deleteBooking(eventId);
  }


}

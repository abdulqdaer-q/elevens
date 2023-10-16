import { google } from 'googleapis';
import dotenv from "dotenv"
import { Booking } from './entity/booking';
import { NotFoundException, Redirect } from '@nestjs/common';
import { Response } from 'express';
import {JWT }  from 'google-auth-library';
const path = require('path');


const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const keyFile = 'src/config/credentials.json'; // Provide the path to your JSON key file

async function createGoogleCalendarClient() {
  const client = new JWT({
    keyFile,
    scopes: SCOPES,
  });
  await client.authorize();


  return google.calendar({ version: 'v3', auth: client });
  
}

export { createGoogleCalendarClient };


export class GoogleCalendarService {

  
async createGoogleCalendarEvent(calendarId, eventDetails) {
    try {
      const calendar = await createGoogleCalendarClient(); 
     const z =
      await calendar.events.insert({
        calendarId : calendarId,
        requestBody :eventDetails
      });
      console.log('Event added to Google Calendar');
      const id = z.data.id
      return id
      
    } catch (error) {
      console.error('Error adding event to Google Calendar:', error);
      throw new NotFoundException('Error adding event to Google Calendar')
    }
  }

  async listGoogleCalendarEvents() {
    const calendar = await createGoogleCalendarClient(); 
    const currentTime = new Date().toISOString(); 

    try {
      const response = await calendar.events.list({
        calendarId: 'mahmoud.ziad.alsaeid@gmail.com',
        timeMin: currentTime,

      });
  
      const events =  await response.data.items;
      return events;
    } catch (error) {
      console.error('Error listing events from Google Calendar:', error);
      throw error; 
    }
  }

  
async  deleteGoogleCalendarEvent(eventId : string) {
    const calendar = await createGoogleCalendarClient();

    try {
      await calendar.events.delete({
        eventId: eventId,
        calendarId: 'mahmoud.ziad.alsaeid@gmail.com',
      });
      console.log('Event deleted from Google Calendar');
      return "Event deleted"
    } catch (error) {
      console.error('Error deleting event from Google Calendar:', error);
      throw error; // You can choose to handle the error as needed
    }
  }
 
  

  
}

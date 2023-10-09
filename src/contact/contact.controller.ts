// src/contact/contact.controller.ts

import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './entity/contact/contact';
import {CreateContactDto} from './dto/create-contact.dto.ts/create-contact.dto.ts'
import {UpdateContactDto} from './dto/update-contact.dto.ts/update-contact.dto.ts'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() contactData: CreateContactDto): Promise<Contact> {
    return this.contactService.createContact(contactData);
  }

  @Get()
  async getAllContacts(): Promise<Contact[]> {
    return this.contactService.getAllContacts();
  }

  @Get(':id')
  async getContactById(@Param('id') id: number): Promise<Contact | undefined> {
    return this.contactService.getContactById(id);
  }

  @Put(':id')
  async updateContact(
    @Param('id') id: number,
    @Body() contactData: UpdateContactDto,
  ): Promise<Contact | undefined> {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: number){
    return this.contactService.deleteContact(id);
  }
}

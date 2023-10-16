// src/contact/contact.service.ts

import { Injectable } from '@nestjs/common';
import { Contact } from './entity/contact/contact';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateContactDto} from './dto/create-contact.dto.ts/create-contact.dto.ts'
import {UpdateContactDto} from './dto/update-contact.dto.ts/update-contact.dto.ts'

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>) {}

  async createContact(contactData: CreateContactDto){
    const contact = this.contactRepository.create(contactData);
    return this.contactRepository.save(contact);
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contactRepository.findOne({where:{id}});
  }

  async updateContact(id: number, contactData: UpdateContactDto): Promise<Contact | undefined> {
    await this.contactRepository.update(id, contactData);
    return this.getContactById(id);
  }

  async deleteContact(id: number) {
    await this.contactRepository.delete(id);
    return `Contact request with id ${id} has been deleted`
  }
}

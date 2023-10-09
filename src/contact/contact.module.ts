import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entity/contact/contact';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({

    imports:[TypeOrmModule.forFeature([Contact])],
    providers:[ContactService],
    controllers:[ContactController],

})
export class ContactModule {}

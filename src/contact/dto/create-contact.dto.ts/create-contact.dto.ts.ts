import { IsEmail, IsString } from "class-validator";

export class CreateContactDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    message: string;
}

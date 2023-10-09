import { IsEmail, IsString } from "class-validator";

export class UpdateContactDto {
    
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

import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";


export class UpdateBookingDto {
    @IsNumber()
    apartmentId: number;

    @IsString()
    renterName: string;


    @IsString()
    @IsEmail()
    renterEmail: string;

    @IsDate()
    startDate: Date;

    @IsDate()

    endDate: Date;
    // Other booking details
  }
  
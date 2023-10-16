import { IsNumber, IsString } from "class-validator";

export class CreateAmenitiesDto {

    @IsString()
    title:string

    
    @IsNumber()
    apartment:number


}

import { IsString } from "class-validator";

export class CreateAmenitiesDto {

    @IsString()
    title:string
}

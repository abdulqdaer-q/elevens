import { IsString } from "class-validator";

export class UpdateAmenitiesDto {

    @IsString()
    title:string
}

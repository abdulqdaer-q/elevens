
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSocialMediaDtoTs {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsUrl()
  facebook?: string;

  @IsOptional()
  @IsString()
  desc?: string;


  @IsOptional()
  @IsUrl()
  twitter?: string;

  @IsOptional()
  @IsUrl()
  instagram?: string;

  @IsOptional()
  @IsUrl()
  linkedIn?: string;
}


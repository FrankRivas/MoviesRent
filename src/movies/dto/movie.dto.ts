import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray, IsNumber, MinLength, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  poster: string;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsUrl()
  @IsOptional()
  trailer: string;

  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @IsNumber()
  @IsNotEmpty()
  rentPrice: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  tags: string[];
}

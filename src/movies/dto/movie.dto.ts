import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsArray,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  poster: string;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString()
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

import { IsString, IsInt, IsOptional, IsArray, IsNumber, MinLength, IsUrl } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  poster: string;

  @IsInt()
  @IsOptional()
  stock: number;

  @IsUrl()
  @IsOptional()
  trailer: string;

  @IsNumber()
  @IsOptional()
  salePrice: number;

  @IsNumber()
  @IsOptional()
  rentPrice: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  tags: string[];
}

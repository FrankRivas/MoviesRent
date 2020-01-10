import { IsNumber, IsNotEmpty, IsDateString, IsPositive, IsInt } from 'class-validator';

export class RentMovieDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  movieId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsDateString()
  @IsNotEmpty()
  devolutionDate: Date;
}

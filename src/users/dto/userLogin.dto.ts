import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UserLoginDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

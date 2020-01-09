import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { CreateRolDto } from 'src/auth/dto/rol.dto';
import { ChangePasswordDto } from 'src/movies/dto/password.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  saveUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.saveUser(user);
  }

  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  softDeleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.softDeleteUser(id);
  }

  @Post(':id/changeRol')
  updateUserRol(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() rol: CreateRolDto,
  ): Promise<User> {
    return this.userService.changeUserRol(id, rol.rol);
  }

  @Post(':id/changePassword')
  updateUserPassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() password: ChangePasswordDto,
  ): Promise<User> {
    return this.userService.changeUserPassword(id, password.password);
  }
}

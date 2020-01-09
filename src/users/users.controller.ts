import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { CreateRolDto } from 'src/auth/dto/rol.dto';
import { ChangePasswordDto } from 'src/movies/dto/password.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserSerializer } from './serializers/user.serializer';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrador'])
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async saveUser(@Body() user: CreateUserDto): Promise<UserSerializer> {
    return new UserSerializer(await this.userService.saveUser(user));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(@Param('id', new ParseIntPipe()) id: number, @Body() user: UpdateUserDto): Promise<UserSerializer> {
    return new UserSerializer(await this.userService.updateUser(id, user));
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async softDeleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<UserSerializer> {
    return new UserSerializer(await this.userService.softDeleteUser(id));
  }

  @UseGuards(AuthGuard('jwt'), TokenGuard, RolesGuard)
  @SetMetadata('roles', ['administrador'])
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':id/changeRol')
  async updateUserRol(@Param('id', new ParseIntPipe()) id: number, @Body() rol: CreateRolDto): Promise<UserSerializer> {
    return new UserSerializer(await this.userService.changeUserRol(id, rol.rol));
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':id/changePassword')
  async updateUserPassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() password: ChangePasswordDto,
  ): Promise<UserSerializer> {
    return new UserSerializer(await this.userService.changeUserPassword(id, password.password));
  }
}

import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from './decorators/token.decorator';
import { UserLoginDto } from 'src/users/dto/userLogin.dto';
import { User } from 'src/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@User() user: UserLoginDto): {} {
    return this.authService.login(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Token() token: string): string {
    this.authService.deleteToken(token);
    return 'Loggedout successfully';
  }
}

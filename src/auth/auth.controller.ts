import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Token() token: string) {
    this.authService.deleteToken(token);
  }
}

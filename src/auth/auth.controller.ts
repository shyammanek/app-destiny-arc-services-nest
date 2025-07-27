import { Controller, Post, Body, Headers, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const token = this.authService.validateUser(body.username, body.password);
    return { token };
  }

  @Get('protected')
  protectedRoute(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    if (!token || !this.authService.verifyToken(token)) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    return { message: 'This is a protected route' };
  }
}

import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: Prisma.UserCreateInput) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: { phone: string }) {
    return this.authService.login(loginDto.phone);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.sub);
  }
}

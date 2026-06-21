import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: Prisma.UserCreateInput & { password?: string }) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ phone: data.phone }, { email: data.email || undefined }] }
    });
    
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    // In a real app, hash password and store it. Our schema doesn't have password yet.
    // We'll skip password hashing since MVP schema lacks it, just register user.
    const user = await this.prisma.user.create({ data });
    
    return {
      access_token: this.jwtService.sign({ sub: user.id, role: user.role }),
      user,
    };
  }

  async login(phone: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    return {
      access_token: this.jwtService.sign({ sub: user.id, role: user.role }),
      user,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { merchant: true } // Return merchant details if exists
    });
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    return user;
  }
}

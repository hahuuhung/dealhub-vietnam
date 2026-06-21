import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('vouchers')
export class VouchersController {
  constructor(
    private readonly vouchersService: VouchersService,
    private readonly prisma: PrismaService
  ) {}

  @UseGuards(AuthGuard)
  @Get('my')
  getMyVouchers(@Request() req: any) {
    return this.vouchersService.getMyVouchers(req.user.sub);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('merchant')
  @Get('scan/:qrCode')
  async scanVoucher(@Request() req: any, @Param('qrCode') qrCode: string) {
    const merchant = await this.prisma.merchant.findUnique({ where: { userId: req.user.sub } });
    if (!merchant) throw new Error("Merchant not found");
    return this.vouchersService.scanVoucher(qrCode, merchant.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('merchant')
  @Post('redeem/:qrCode')
  async redeemVoucher(@Request() req: any, @Param('qrCode') qrCode: string) {
    const merchant = await this.prisma.merchant.findUnique({ where: { userId: req.user.sub } });
    if (!merchant) throw new Error("Merchant not found");
    return this.vouchersService.redeemVoucher(qrCode, merchant.id);
  }
}

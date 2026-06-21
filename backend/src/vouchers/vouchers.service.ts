import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VouchersService {
  constructor(private prisma: PrismaService) {}

  async getMyVouchers(userId: string) {
    return this.prisma.voucher.findMany({
      where: { userId },
      include: { deal: true }
    });
  }

  async scanVoucher(qrCode: string, merchantId: string) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { qrCode },
      include: { deal: true, user: true }
    });

    if (!voucher) {
      throw new NotFoundException('Voucher không tồn tại');
    }

    if (voucher.deal.merchantId !== merchantId) {
      throw new BadRequestException('Voucher này không thuộc cửa hàng của bạn');
    }

    return voucher;
  }

  async redeemVoucher(qrCode: string, merchantId: string) {
    const voucher = await this.scanVoucher(qrCode, merchantId);

    if (voucher.status !== 'active') {
      throw new BadRequestException(`Voucher không hợp lệ (Trạng thái: ${voucher.status})`);
    }

    if (voucher.expiresAt < new Date()) {
      throw new BadRequestException('Voucher đã hết hạn');
    }

    return this.prisma.voucher.update({
      where: { qrCode },
      data: { status: 'redeemed', redeemedAt: new Date() }
    });
  }
}

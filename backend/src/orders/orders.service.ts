import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
    });
  }

  async checkout(userId: string, items: { dealId: string, qty: number, price: number }[]) {
    return this.prisma.$transaction(async (tx) => {
      let total = 0;
      const vouchersToCreate = [];

      // 1. Validate deals and calculate total
      for (const item of items) {
        const deal = await tx.deal.findUnique({ where: { id: item.dealId } });
        if (!deal || deal.remainingQty < item.qty) {
          throw new Error(`Deal ${item.dealId} is out of stock`);
        }

        total += item.price * item.qty;

        // Decrease stock
        await tx.deal.update({
          where: { id: item.dealId },
          data: {
            remainingQty: { decrement: item.qty },
            soldQty: { increment: item.qty }
          }
        });

        // Prepare vouchers
        for (let i = 0; i < item.qty; i++) {
          vouchersToCreate.push({
            dealId: item.dealId,
            userId,
            qrCode: `V-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${Date.now()}`,
            expiresAt: deal.expiresAt,
          });
        }
      }

      // 2. Create Order
      const order = await tx.order.create({
        data: {
          userId,
          subtotal: total,
          total: total,
          paymentMethod: 'vnpay',
          paymentStatus: 'paid', // Simulate successful payment
          paidAt: new Date(),
        }
      });

      // 3. Create Vouchers
      const vouchers = vouchersToCreate.map(v => ({ ...v, orderId: order.id }));
      await tx.voucher.createMany({ data: vouchers });

      return order;
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { vouchers: true }
    });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { vouchers: true }
    });
  }

  async update(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }
}

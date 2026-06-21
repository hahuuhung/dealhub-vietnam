import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const merchant = await this.prisma.merchant.findUnique({
      where: { userId }
    });

    if (!merchant) {
      return null;
    }

    const merchantId = merchant.id;

    // Get active deals count
    const activeDeals = await this.prisma.deal.count({
      where: { merchantId, status: 'active' },
    });

    // Get total vouchers sold for these deals
    const deals = await this.prisma.deal.findMany({
      where: { merchantId },
      select: { id: true, soldQty: true },
    });
    const totalVouchersSold = deals.reduce((acc, deal) => acc + deal.soldQty, 0);

    // Get pending bookings today
    const pendingBookings = await this.prisma.booking.count({
      where: {
        deal: { merchantId },
        status: 'pending',
      },
    });

    // We can simulate weekly revenue here for the chart
    const weeklyRevenue = [
      { name: "T2", sales: 4000 },
      { name: "T3", sales: 3000 },
      { name: "T4", sales: 2000 },
      { name: "T5", sales: 2780 },
      { name: "T6", sales: 1890 },
      { name: "T7", sales: 2390 },
      { name: "CN", sales: 3490 },
    ];

    return {
      revenueToday: 12500000, // Mocked for MVP
      activeDeals,
      totalVouchersSold,
      pendingBookings,
      weeklyRevenue,
    };
  }
}

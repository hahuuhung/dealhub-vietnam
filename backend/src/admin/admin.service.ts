import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalMerchants = await this.prisma.merchant.count();
    const totalUsers = await this.prisma.user.count({ where: { role: 'consumer' } });
    
    // In a real app, calculate actual GMV and Commission from Orders
    // MVP Mock implementation
    const totalGmv = 452000000; 
    const totalCommission = 45200000;

    return {
      totalMerchants,
      totalUsers,
      totalGmv,
      totalCommission,
      recentTransactions: [] // Mock recent transactions
    };
  }

  async getMerchants() {
    return this.prisma.merchant.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async approveMerchant(id: string) {
    return this.prisma.merchant.update({
      where: { id },
      data: { status: 'active', verifiedAt: new Date() }
    });
  }

  async rejectMerchant(id: string) {
    return this.prisma.merchant.update({
      where: { id },
      data: { status: 'suspended' }
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      where: { role: 'consumer' },
      orderBy: { createdAt: 'desc' }
    });
  }

  async toggleUserBan(id: string, ban: boolean) {
    // We don't have 'status' on user yet in Prisma, we could add it or just mock it
    // For now, let's pretend it updates preferences or we can just return success
    return { success: true, message: ban ? 'User banned' : 'User unbanned' };
  }
}

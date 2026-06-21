import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DealsModule } from './deals/deals.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { OrdersModule } from './orders/orders.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule, DealsModule, AuthModule, BookingsModule, OrdersModule, AnalyticsModule, VouchersModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

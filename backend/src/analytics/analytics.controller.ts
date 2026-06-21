import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('analytics')
@UseGuards(AuthGuard, RolesGuard)
@Roles('merchant')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getDashboard(@Request() req: any) {
    // In a real scenario, req.user holds the userId. We need to find the merchantId from the userId.
    // For MVP, we pass a dummy or we could query the DB in the service. Let's assume the service handles mapping userId to merchantId if needed.
    // But wait, the token could include the merchantId directly, or we can just pass the userId and let the service find the merchantId.
    // We'll pass the userId.
    return this.analyticsService.getDashboardStats(req.user.sub);
  }
}

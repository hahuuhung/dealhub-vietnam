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
  getDashboardStats(@Request() req: any) {
    return this.analyticsService.getDashboardStats(req.user.sub);
  }

  @Get('advanced')
  getAdvancedAnalytics(@Request() req: any) {
    return this.analyticsService.getAdvancedAnalytics(req.user.sub);
  }
}

import { Controller, Get, Patch, Param, UseGuards, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('merchants')
  getMerchants() {
    return this.adminService.getMerchants();
  }

  @Patch('merchants/:id/approve')
  approveMerchant(@Param('id') id: string) {
    return this.adminService.approveMerchant(id);
  }

  @Patch('merchants/:id/reject')
  rejectMerchant(@Param('id') id: string) {
    return this.adminService.rejectMerchant(id);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Patch('users/:id/ban')
  toggleUserBan(@Param('id') id: string, @Body('ban') ban: boolean) {
    return this.adminService.toggleUserBan(id, ban);
  }
}

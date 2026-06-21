import { Controller, Get, Post, Param, UseGuards, Request, Body } from '@nestjs/common';
import { LivestreamsService } from './livestreams.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('livestreams')
export class LivestreamsController {
  constructor(private readonly livestreamsService: LivestreamsService) {}

  @Get()
  getActiveStreams() {
    return this.livestreamsService.getActiveStreams();
  }

  @Get(':id')
  getStreamById(@Param('id') id: string) {
    return this.livestreamsService.getStreamById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('merchant')
  @Post('start')
  startStream(@Request() req, @Body('title') title: string) {
    // In a real app, we'd lookup the merchantId by req.user.sub
    // For MVP, we'll assume the client sends the merchant ID or we find it.
    // Let's find merchant ID here
    return this.livestreamsService.startStream(req.body.merchantId, title || 'Live Event');
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('merchant')
  @Post(':id/end')
  endStream(@Param('id') id: string) {
    return this.livestreamsService.endStream(id);
  }
}

import { Controller, Get, Post, Param, UseGuards, Request, Body } from '@nestjs/common';
import { VideosService } from './videos.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('feed')
  getFeed() {
    return this.videosService.getFeed();
  }

  @UseGuards(AuthGuard)
  @Post(':id/like')
  likeVideo(@Param('id') id: string, @Request() req: any) {
    return this.videosService.likeVideo(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post(':id/comments')
  addComment(@Param('id') id: string, @Request() req: any, @Body('content') content: string) {
    return this.videosService.addComment(id, req.user.sub, content);
  }
}

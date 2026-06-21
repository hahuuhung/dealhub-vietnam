import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async getFeed() {
    return this.prisma.video.findMany({
      include: {
        merchant: { select: { id: true, businessName: true, user: { select: { avatar_url: true } } } },
        deal: true,
        _count: { select: { likes: true, comments: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
  }

  async likeVideo(videoId: string, userId: string) {
    try {
      await this.prisma.like.create({
        data: { videoId, userId }
      });
      return { success: true };
    } catch {
      await this.prisma.like.delete({
        where: { userId_videoId: { userId, videoId } }
      });
      return { success: false, unliked: true };
    }
  }

  async addComment(videoId: string, userId: string, content: string) {
    return this.prisma.comment.create({
      data: { videoId, userId, content },
      include: { user: { select: { name: true, avatar_url: true } } }
    });
  }
}

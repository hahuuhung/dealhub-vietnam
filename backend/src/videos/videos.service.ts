import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async getFeed() {
    const videos = await this.prisma.video.findMany({
      include: {
        merchant: { select: { id: true, businessName: true, user: { select: { avatar_url: true } } } },
        deal: true,
        _count: { select: { likes: true, comments: true } }
      }
    });

    // AI Recommendation Weighted Score: ViewCount + (Likes * 2) + (Comments * 3)
    return videos.sort((a, b) => {
      const scoreA = a.viewCount + (a._count.likes * 2) + (a._count.comments * 3);
      const scoreB = b.viewCount + (b._count.likes * 2) + (b._count.comments * 3);
      return scoreB - scoreA;
    }).slice(0, 20);
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

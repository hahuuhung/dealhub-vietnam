import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LivestreamsService {
  constructor(private prisma: PrismaService) {}

  async getActiveStreams() {
    return this.prisma.livestream.findMany({
      where: { status: 'live' },
      include: { merchant: { select: { businessName: true, user: { select: { avatar_url: true } } } } }
    });
  }

  async getStreamById(id: string) {
    const stream = await this.prisma.livestream.findUnique({
      where: { id },
      include: { merchant: { select: { businessName: true } } }
    });
    if (!stream) throw new NotFoundException('Stream not found');
    return stream;
  }

  // MVP: Mock a start stream action
  async startStream(merchantId: string, title: string) {
    return this.prisma.livestream.create({
      data: {
        merchantId,
        title,
        streamKey: Math.random().toString(36).substring(7),
        status: 'live',
        startedAt: new Date()
      }
    });
  }

  async endStream(id: string) {
    return this.prisma.livestream.update({
      where: { id },
      data: { status: 'ended', endedAt: new Date() }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async smartSearch(query: string) {
    // MOCK AI LOGIC: In production, send `query` to OpenAI/Gemini
    // to extract intent (e.g. location, price range, category).
    
    // Simulating NLP by just doing a basic search for the MVP
    const deals = await this.prisma.deal.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ],
        status: 'active'
      },
      include: { merchant: { select: { businessName: true } } },
      take: 5
    });

    return {
      message: `Tôi đã phân tích yêu cầu "${query}" của bạn và gợi ý ${deals.length} Deal phù hợp nhất.`,
      deals
    };
  }
}

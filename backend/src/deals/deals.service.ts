import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Deal } from '@prisma/client';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DealUncheckedCreateInput): Promise<Deal> {
    return this.prisma.deal.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DealWhereUniqueInput;
    where?: Prisma.DealWhereInput;
    orderBy?: Prisma.DealOrderByWithRelationInput;
  }): Promise<Deal[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.deal.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        merchant: true,
      }
    });
  }

  async findOne(id: string): Promise<Deal | null> {
    return this.prisma.deal.findUnique({
      where: { id },
      include: {
        merchant: true,
      }
    });
  }

  async update(params: {
    where: Prisma.DealWhereUniqueInput;
    data: Prisma.DealUpdateInput;
  }): Promise<Deal> {
    const { where, data } = params;
    return this.prisma.deal.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.DealWhereUniqueInput): Promise<Deal> {
    return this.prisma.deal.delete({
      where,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Booking } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookingWhereUniqueInput;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput;
  }): Promise<Booking[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.booking.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { deal: true, user: true }
    });
  }

  async findOne(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { deal: true, user: true }
    });
  }

  async update(params: {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.BookingUpdateInput;
  }): Promise<Booking> {
    const { where, data } = params;
    return this.prisma.booking.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
    return this.prisma.booking.delete({
      where,
    });
  }
}

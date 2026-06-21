import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Prisma } from '@prisma/client';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: Prisma.BookingUncheckedCreateInput) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    const where = userId ? { userId } : {};
    return this.bookingsService.findAll({ where });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: Prisma.BookingUpdateInput) {
    return this.bookingsService.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove({ id });
  }
}

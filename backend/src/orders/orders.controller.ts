import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post('checkout')
  checkout(@Request() req: any, @Body() body: { items: { dealId: string, qty: number, price: number }[] }) {
    return this.ordersService.checkout(req.user.sub, body.items);
  }

  @Post()
  create(@Body() createOrderDto: Prisma.OrderUncheckedCreateInput) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    const where = userId ? { userId } : {};
    return this.ordersService.findAll({ where });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: Prisma.OrderUpdateInput) {
    return this.ordersService.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove({ id });
  }
}

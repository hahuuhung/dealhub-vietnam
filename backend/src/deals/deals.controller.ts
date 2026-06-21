import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DealsService } from './deals.service';
import { Prisma } from '@prisma/client';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  create(@Body() createDealDto: Prisma.DealUncheckedCreateInput) {
    return this.dealsService.create(createDealDto);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('limit') limit: string = '10',
    @Query('page') page: string = '1'
  ) {
    const where: Prisma.DealWhereInput = { status: 'active' };
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;

    return this.dealsService.findAll({ where, take, skip, orderBy: { createdAt: 'desc' } });
  }

  @Get('featured')
  getFeatured() {
    return this.dealsService.findAll({ take: 4, orderBy: { ratingAvg: 'desc' } });
  }

  @Get('nearby')
  getNearby() {
    return this.dealsService.findAll({ take: 8, orderBy: { createdAt: 'desc' } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealDto: Prisma.DealUpdateInput) {
    return this.dealsService.update({
      where: { id },
      data: updateDealDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealsService.remove({ id });
  }
}

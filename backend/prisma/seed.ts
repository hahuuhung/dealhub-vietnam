import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import "dotenv/config";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('Seeding database...');

  // 1. Create a Merchant User
  // In our MVP, we skip hashing for now as per auth.service.ts implementation, 
  // but for a robust seed, let's use plain or bcrypt. Since auth.service.ts MVP doesn't check hashed yet, we will just use it.
  const merchantUser = await prisma.user.upsert({
    where: { phone: '0901234567' },
    update: {},
    create: {
      phone: '0901234567',
      email: 'merchant@spa-vip.com',
      name: 'Nguyễn Văn Merchant',
      role: 'merchant',
    },
  });

  // 2. Create the Merchant Profile
  const merchant = await prisma.merchant.upsert({
    where: { userId: merchantUser.id },
    update: {},
    create: {
      userId: merchantUser.id,
      businessName: 'Spa VIP 5 Sao',
      category: 'spa',
      address: '123 Nguyễn Huệ, Quận 1',
      city: 'Hồ Chí Minh',
      status: 'active',
      verifiedAt: new Date(),
    },
  });

  // 3. Create a Consumer User
  const consumerUser = await prisma.user.upsert({
    where: { phone: '0987654321' },
    update: {},
    create: {
      phone: '0987654321',
      email: 'consumer@dealhub.com',
      name: 'Trần Thị Consumer',
      role: 'consumer',
    },
  });

  // 4. Create Deals for the Merchant
  const dealsData = [
    {
      merchantId: merchant.id,
      title: 'Combo Massage Cổ Vai Gáy 90 phút',
      description: 'Giảm đau mỏi, thư giãn tuyệt đối với đá nóng.',
      category: 'spa',
      originalPrice: 500000,
      dealPrice: 299000,
      totalQty: 100,
      remainingQty: 95,
      soldQty: 5,
      ratingAvg: 4.8,
      reviewCount: 12,
      status: 'active',
      startsAt: new Date(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    {
      merchantId: merchant.id,
      title: 'Buffet Hải Sản Tôm Hùm Tươi Sống',
      description: 'Thưởng thức không giới hạn hải sản cao cấp.',
      category: 'food',
      originalPrice: 1200000,
      dealPrice: 899000,
      totalQty: 50,
      remainingQty: 10,
      soldQty: 40,
      ratingAvg: 4.9,
      reviewCount: 34,
      status: 'active',
      startsAt: new Date(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  ];

  for (const deal of dealsData) {
    await prisma.deal.create({ data: deal });
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

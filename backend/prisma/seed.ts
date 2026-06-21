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

  // Create Mock Deals
  const deal1 = await prisma.deal.create({
    data: {
      merchantId: merchant.id,
      title: 'Combo Massage Body 90 phút',
      description: 'Massage đá nóng thảo dược giải độc cơ thể.',
      category: 'Spa & Làm đẹp',
      originalPrice: 500000,
      dealPrice: 199000,
      totalQty: 100,
      remainingQty: 100,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: 'active',
      images: JSON.stringify(['/images/spa.jpg'])
    }
  });

  const deal2 = await prisma.deal.create({
    data: {
      merchantId: merchant.id,
      title: 'Trị liệu Cổ Vai Gáy (60p)',
      description: 'Giảm đau mỏi tức thì với chuyên gia.',
      category: 'Spa & Làm đẹp',
      originalPrice: 400000,
      dealPrice: 150000,
      totalQty: 50,
      remainingQty: 50,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: 'active',
      images: JSON.stringify(['/images/massage.jpg'])
    }
  });

  // Create Mock Videos
  await prisma.video.create({
    data: {
      merchantId: merchant.id,
      dealId: deal1.id,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      caption: 'Trải nghiệm không gian Spa 5 sao cực chill 💆‍♀️✨ #spa #relax',
      viewCount: 1500
    }
  });

  await prisma.video.create({
    data: {
      merchantId: merchant.id,
      dealId: deal2.id,
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      caption: 'Thư giãn cuối tuần cùng thiên nhiên 🌸 #chill',
      viewCount: 3200
    }
  });

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

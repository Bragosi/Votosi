import { PrismaClient, AdminRole, Sex, MaritalStatus, EducationLevel } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';


const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');


  await prisma.voter.deleteMany({});
  await prisma.admin.deleteMany({});

  const defaultPassword = 'Password123!';
  const hashedSuperAdminPassword = await bcrypt.hash(defaultPassword, 10);
  const dummyHashedPin = await bcrypt.hash('1234', 10);


  const superAdmin = await prisma.admin.create({
    data: {
      firstName: 'John',
      surname: 'Doe',
      email: 'admin@votosi.com',
      profilePicture: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      DOB: '1985-05-15',
      sex: Sex.MALE,
      maritalStatus: MaritalStatus.MARRIED,
      state: 'Lagos',
      LGA: 'Ikeja',
      education: EducationLevel.TERTIARY,
      residentialAddress: '123 Main Admin Street, Lagos',
      role: AdminRole.ADMIN,
      adminId: 'ADM-2026-0001',
      activationPin: dummyHashedPin,
      isActivated: true, 
      password: hashedSuperAdminPassword, 
    },
  });

  console.log(`Super Admin seeded: ${superAdmin.email} (${superAdmin.adminId})`);
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(' Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
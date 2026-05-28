import { PrismaClient } from "@prisma/client"; // Clean import
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import pg from "pg";

// ... rest of your prisma.ts setup stays exactly the same!
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  // 1. Create the native PG pool
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // 2. Instantiate the driver adapter
  const adapter = new PrismaPg(pool);

  // 3. Pass the adapter straight to Prisma Client
  prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

export { prisma };

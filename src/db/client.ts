import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const client = global.prisma || new PrismaClient({ log: ["query"] });

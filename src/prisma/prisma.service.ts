import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // extend PrismaClient to add a constructor that configures the PrismaClient instance to use the DATABASE_URL environment variable
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
          // url: process.env.DATABASE_URL,
        },
      },
    });
  }
}

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // global makes the PrismaService available everywhere in our application
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

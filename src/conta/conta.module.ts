import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContaRepository } from './repositories/conta.repository';

@Module({
  controllers: [ContaController],
  providers: [ContaService, PrismaService, ContaRepository],
  exports: [ContaService],
})
export class ContaModule {}

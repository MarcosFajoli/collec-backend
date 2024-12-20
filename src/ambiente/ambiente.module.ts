import { Module } from '@nestjs/common';
import { AmbienteController } from './ambiente.controller';
import { AmbienteService } from './ambiente.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AmbienteRepository } from './repositories/ambiente.repository';
import { ListaAmbienteRepository } from './repositories/lista-ambiente.repository';
import { AmbienteGuard } from './guards/ambiente.guard';

@Module({
  controllers: [AmbienteController],
  providers: [
    AmbienteService,
    PrismaService,
    AmbienteRepository,
    ListaAmbienteRepository,
    AmbienteGuard,
  ],
  exports: [AmbienteGuard],
})
export class AmbienteModule {}

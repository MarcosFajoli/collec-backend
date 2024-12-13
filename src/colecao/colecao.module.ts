import { Module } from '@nestjs/common';
import { ColecaoService } from './colecao.service';
import { ColecaoController } from './colecao.controller';
import { ColecaoRepository } from './repositories/colecao.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AmbienteGuard } from 'src/ambiente/guards/ambiente.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AmbienteService } from 'src/ambiente/ambiente.service';
import { AmbienteRepository } from 'src/ambiente/repositories/ambiente.repository';
import { ListaAmbienteRepository } from 'src/ambiente/repositories/lista-ambiente.repository';

@Module({
  controllers: [ColecaoController],
  providers: [
    ColecaoService,
    ColecaoRepository,
    PrismaService,
    AmbienteGuard,
    AuthGuard,
    AmbienteService,
    AmbienteRepository,
    ListaAmbienteRepository,
  ],
})
export class ColecaoModule {}

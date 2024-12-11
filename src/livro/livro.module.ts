import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { AmbienteGuard } from 'src/ambiente/guards/ambiente.guard';
import { LivroRepository } from './repositories/livro.repository';
import { AmbienteService } from 'src/ambiente/ambiente.service';
import { AmbienteRepository } from 'src/ambiente/repositories/ambiente.repository';
import { ListaAmbienteRepository } from 'src/ambiente/repositories/lista-ambiente.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LivroController],
  // não deixa eu rodar sem esses providers. Imagino ser um problema mas não consegui resolver
  providers: [
    LivroService,
    PrismaService,
    AmbienteGuard,
    LivroRepository,
    AmbienteService,
    AmbienteRepository,
    ListaAmbienteRepository,
  ],
})
export class LivroModule {}

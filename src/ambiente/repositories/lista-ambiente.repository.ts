import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListaAmbienteRepository {
  constructor(private prisma: PrismaService) {}

  async create(ambienteId: number, contaId: number) {
    return this.prisma.listaContasAmbiente.create({
      data: {
        ambienteId,
        contaId,
      },
    });
  }

  async addContaInList(ambienteId: number, contaId: number) {
    return this.prisma.listaContasAmbiente.create({
      data: {
        ambienteId,
        contaId,
      },
    });
  }

  async findAllInList(ambienteId: number) {
    return this.prisma.listaContasAmbiente.findMany({
      where: {
        ambienteId,
      },
    });
  }

  async findListsInConta(contaId: number) {
    return this.prisma.listaContasAmbiente.findMany({
      where: {
        contaId,
      },
    });
  }
}

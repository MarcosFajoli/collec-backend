import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AmbienteEntity } from '../entities/ambiente.entity';

@Injectable()
export class AmbienteRepository {
  constructor(private prisma: PrismaService) {}

  async create(nome: string, contaId: number): Promise<AmbienteEntity> {
    return this.prisma.ambiente.create({
      data: {
        nome,
        contaId,
      },
    });
  }

  async findOne(id: number): Promise<AmbienteEntity> {
    return this.prisma.ambiente.findUnique({
      where: {
        id: id * 1,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContaDto } from '../dto/create-conta.dto';
import { UpdateContaDto } from '../dto/update-conta.dto';
import { ContaEntity } from '../entities/conta.entity';

@Injectable()
export class ContaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContaDto: CreateContaDto): Promise<ContaEntity> {
    return this.prisma.conta.create({ data: createContaDto });
  }

  async findAll(): Promise<ContaEntity[]> {
    return this.prisma.conta.findMany();
  }

  async findOne(id: number): Promise<ContaEntity> {
    return this.prisma.conta.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<ContaEntity> {
    return this.prisma.conta.findUnique({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateContaDto: UpdateContaDto): Promise<ContaEntity> {
    return this.prisma.conta.update({
      where: {
        id,
      },
      data: updateContaDto,
    });
  }

  remove(id: number) {
    return this.prisma.conta.delete({
      where: {
        id,
      },
    });
  }

  addPhoto(id, filePath) {
    return this.prisma.conta.update({
      where: { id },
      data: { fotoPerfil: filePath },
    });
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColecaoDto } from '../dto/create-colecao.dto';

@Injectable()
export class ColecaoRepository {
  constructor(private prisma: PrismaService) {}

  async create(createColecaoDto: CreateColecaoDto) {
    return this.prisma.colecao.create({
      data: createColecaoDto,
    });
  }

  async addPhoto(colecaoId: number, filePath: string) {
    return this.prisma.colecao.update({
      where: { id: colecaoId },
      data: { capa: filePath },
    });
  }

  async update(id: number, nome: string) {
    const colecao = await this.prisma.colecao.findUnique({
      where: { id },
    });

    if (!colecao) {
      throw new NotFoundException(`Coleção com ID ${id} não encontrada.`);
    }

    return this.prisma.colecao.update({
      where: {
        id,
      },
      data: {
        nome,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.colecao.findUnique({
      where: {
        id,
      },
      include: {
        LivrosColecao: {
          include: {
            livro: true,
          },
        },
      },
    });
  }

  async findAll(ambienteId: number) {
    return this.prisma.colecao.findMany({
      where: {
        ambienteId,
      },
    });
  }

  async vincularLivro(livroId: number, colecaoId: number) {
    const livro = await this.prisma.livro.findUnique({
      where: { id: livroId },
    });

    const colecao = await this.prisma.colecao.findUnique({
      where: { id: colecaoId },
    });

    if (!livro) {
      throw new NotFoundException(`Livro com ID ${livroId} não encontrado.`);
    }

    if (!colecao) {
      throw new NotFoundException(
        `Coleção com ID ${colecaoId} não encontrada.`,
      );
    }

    const jaVinculado = await this.prisma.livrosColecao.findUnique({
      where: {
        colecaoId_livroId: { colecaoId, livroId },
      },
    });

    if (jaVinculado) {
      throw new ConflictException('O livro já está vinculado a esta coleção.');
    }

    return this.prisma.livrosColecao.create({
      data: {
        livroId,
        colecaoId,
      },
    });
  }

  async desvincularLivro(livroId: number, colecaoId: number) {
    const relacao = await this.prisma.livrosColecao.findUnique({
      where: {
        colecaoId_livroId: {
          colecaoId,
          livroId,
        },
      },
    });

    if (!relacao) {
      throw new ConflictException('A relação não existe.');
    }

    return this.prisma.livrosColecao.delete({
      where: {
        colecaoId_livroId: {
          colecaoId,
          livroId,
        },
      },
    });
  }

  async delete(id: number) {
    const colecao = await this.prisma.colecao.findUnique({
      where: { id },
    });

    if (!colecao) {
      throw new NotFoundException(`Coleção com ID ${id} não encontrada.`);
    }

    return this.prisma.colecao.delete({
      where: { id },
    });
  }
}

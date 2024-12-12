import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from '../dto/create-livro.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AmbienteService } from 'src/ambiente/ambiente.service';
import { UpdateLivroDto } from '../dto/update-livro.dto';

@Injectable()
export class LivroRepository {
  constructor(
    private prisma: PrismaService,
    private ambienteService: AmbienteService,
  ) {}

  async create(livroReq: CreateLivroDto) {
    const ambiente = await this.ambienteService.findOne(livroReq.ambienteId);

    if (!ambiente) {
      throw new NotFoundException(
        `Ambiente com ID ${livroReq.ambienteId} não encontrado.`,
      );
    }

    const estilo = await this.prisma.estilo.upsert({
      where: { nome: livroReq.estiloNome },
      update: {},
      create: {
        nome: livroReq.estiloNome,
        descricao: `Descrição para ${livroReq.estiloNome}`,
      },
    });

    const categoriasCriadas = await Promise.all(
      livroReq.categorias.map(categoriaNome =>
        this.prisma.categoria.upsert({
          where: { nome: categoriaNome },
          update: {},
          create: {
            nome: categoriaNome,
            descricao: `Descrição para ${categoriaNome}`,
          },
        }),
      ),
    );

    const livro = await this.prisma.livro.create({
      data: {
        nome: livroReq.nome,
        estiloId: estilo.id,
        ambienteId: ambiente.id,
        Categorias: {
          create: categoriasCriadas.map(categoria => ({
            categoriaId: categoria.id,
          })),
        },
      },
      include: {
        Categorias: {
          select: {
            categoria: true,
          },
        },
      },
    });

    return livro;
  }

  async findOne(id: number) {
    return this.prisma.livro.findUnique({
      where: { id },
      include: {
        Categorias: {
          select: {
            categoria: true,
          },
        },
      },
    });
  }

  async findAll(ambienteId: number) {
    return this.prisma.livro.findMany({
      where: {
        ambienteId,
      },
      include: {
        Categorias: {
          select: {
            categoria: true,
          },
        },
      },
    });
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const estilo = await this.prisma.estilo.upsert({
      where: { nome: updateLivroDto.estiloNome },
      update: {},
      create: {
        nome: updateLivroDto.estiloNome,
        descricao: `Descrição para ${updateLivroDto.estiloNome}`,
      },
    });

    const categoriasCriadas = await Promise.all(
      updateLivroDto.categorias.map(categoriaNome =>
        this.prisma.categoria.upsert({
          where: { nome: categoriaNome },
          update: {},
          create: {
            nome: categoriaNome,
            descricao: `Descrição para ${categoriaNome}`,
          },
        }),
      ),
    );

    const livroAtualizado = await this.prisma.livro.update({
      where: { id },
      data: {
        nome: updateLivroDto.nome,
        estiloId: estilo.id,
        Categorias: {
          deleteMany: {},
          create: categoriasCriadas.map(categoria => ({
            categoriaId: categoria.id,
          })),
        },
      },
      include: {
        Categorias: {
          select: {
            categoria: true,
          },
        },
      },
    });

    return livroAtualizado;
  }

  remove(id: number) {
    return this.prisma.livro.delete({
      where: {
        id,
      },
    });
  }
}

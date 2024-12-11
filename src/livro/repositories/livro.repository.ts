import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from '../dto/create-livro.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AmbienteService } from 'src/ambiente/ambiente.service';

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
    });

    return livro;
  }
}

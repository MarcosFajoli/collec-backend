import { Livro } from '@prisma/client';

export class LivroEntity implements Livro {
  capa: string;
  id: number;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  estiloId: number;
  ambienteId: number;
}

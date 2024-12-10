import { Livro } from '@prisma/client';

export class LivroEntity implements Livro {
  id: number;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  estiloId: number;
}

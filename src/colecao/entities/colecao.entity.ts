import { Colecao } from '@prisma/client';

export class ColecaoEntity implements Colecao {
  ambienteId: number;
  id: number;
  nome: string;
}

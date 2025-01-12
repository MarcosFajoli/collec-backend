import { Colecao } from '@prisma/client';

export class ColecaoEntity implements Colecao {
  capa: string;
  ambienteId: number;
  id: number;
  nome: string;
}

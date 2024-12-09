import { Ambiente } from '@prisma/client';

export class AmbienteEntity implements Ambiente {
  id: number;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  contaId: number;
}

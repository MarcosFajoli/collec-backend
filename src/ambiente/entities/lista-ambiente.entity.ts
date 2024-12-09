import { ListaContasAmbiente } from '@prisma/client';

export class ListaAmbienteEntity implements ListaContasAmbiente {
  ambienteId: number;
  contaId: number;
}

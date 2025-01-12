import { Conta } from '@prisma/client';

export class ContaEntity implements Conta {
  fotoPerfil: string;
  id: number;
  email: string;
  password: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Conta } from '@prisma/client';

export class ContaEntity implements Conta {
  id: number;
  email: string;
  password: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

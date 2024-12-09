import { Injectable } from '@nestjs/common';
import { AmbienteRepository } from './repositories/ambiente.repository';
import { ListaAmbienteRepository } from './repositories/lista-ambiente.repository';

@Injectable()
export class AmbienteService {
  constructor(
    private ambienteRepository: AmbienteRepository,
    private listaAmbienteRepository: ListaAmbienteRepository,
  ) {}

  async createAmbiente(nome: string, contaId: number) {
    const novoAmbiente = await this.ambienteRepository.create(nome, contaId);
    const novoAmbienteLista = await this.listaAmbienteRepository.create(
      novoAmbiente.id,
      contaId,
    );

    return {
      ambiente: novoAmbiente,
      lista: novoAmbienteLista,
    };
  }
}

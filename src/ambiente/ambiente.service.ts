import { Injectable } from '@nestjs/common';
import { AmbienteRepository } from './repositories/ambiente.repository';
import { ListaAmbienteRepository } from './repositories/lista-ambiente.repository';
import { AmbienteEntity } from './entities/ambiente.entity';

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

  async findOne(id: number): Promise<AmbienteEntity> {
    return this.ambienteRepository.findOne(id);
  }

  async addContaInList(ambienteId: number, contaId: number) {
    return this.listaAmbienteRepository.addContaInList(ambienteId, contaId);
  }

  async findAllInList(ambienteId: number) {
    return this.listaAmbienteRepository.findAllInList(ambienteId);
  }

  async existsInList(contaId: number, ambienteId: number) {
    const ambientesEncontrados =
      await this.listaAmbienteRepository.findListsInConta(contaId);

    const encontrado = ambientesEncontrados.some(
      ambiente => ambiente.ambienteId === ambienteId,
    );

    return encontrado;
  }
}

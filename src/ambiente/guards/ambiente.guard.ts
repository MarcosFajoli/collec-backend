import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AmbienteService } from '../ambiente.service';

@Injectable()
export class AmbienteGuard implements CanActivate {
  constructor(
    private readonly ambienteService: AmbienteService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userContaId = request.conta?.id;
    const ambienteId = request.params.ambienteId || request.body?.ambienteId;

    if (!ambienteId) {
      throw new UnauthorizedException('Ambiente ID não fornecido.');
    }

    const ambienteSolicitado = await this.ambienteService.findOne(ambienteId);

    if (!ambienteSolicitado || ambienteSolicitado.contaId !== userContaId) {
      throw new UnauthorizedException('Acesso negado ao ambiente solicitado.');
    }

    return true;
  }
}

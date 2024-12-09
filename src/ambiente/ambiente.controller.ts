import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAmbienteDto } from './dto/create-ambiente.dto';
import { AmbienteService } from './ambiente.service';

@Controller('ambiente')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAmbienteDto: CreateAmbienteDto, @Request() req) {
    const contaId = req.conta.id;
    return this.ambienteService.createAmbiente(createAmbienteDto.nome, contaId);
  }

  @UseGuards(AuthGuard)
  @Post('addConta')
  async addContaInList(@Body() { contaId, ambienteId }, @Request() req) {
    const requestContaId = req.conta.id;
    const ambienteSolicitado = await this.ambienteService.findOne(ambienteId);

    if (requestContaId != ambienteSolicitado?.contaId) {
      throw new UnauthorizedException();
    }

    return this.ambienteService.addContaInList(ambienteId, contaId);
  }

  @UseGuards(AuthGuard)
  @Get('list/:ambienteId')
  async findAllInList(@Param('ambienteId') ambienteId: number, @Request() req) {
    const requestContaId = req.conta.id;
    const ambienteSolicitado = await this.ambienteService.findOne(ambienteId);

    if (ambienteSolicitado == undefined) {
      throw new UnauthorizedException();
    }

    const isAllowed = await this.ambienteService.existsInList(
      requestContaId,
      ambienteId,
    );

    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return this.ambienteService.findAllInList(ambienteId);
  }
}

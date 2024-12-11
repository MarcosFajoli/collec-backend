import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateAmbienteDto } from './dto/create-ambiente.dto';
import { AmbienteService } from './ambiente.service';
import { AmbienteGuard } from './guards/ambiente.guard';

@Controller('ambiente')
export class AmbienteController {
  constructor(private ambienteService: AmbienteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAmbienteDto: CreateAmbienteDto, @Request() req) {
    const contaId = req.conta.id;
    return this.ambienteService.createAmbiente(createAmbienteDto.nome, contaId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post('addConta')
  async addContaInList(@Body() { contaId, ambienteId }) {
    return this.ambienteService.addContaInList(ambienteId, contaId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('list/:ambienteId')
  async findAllInList(@Param('ambienteId') ambienteId: number) {
    return this.ambienteService.findAllInList(ambienteId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('conta/:ambienteId')
  async IsContaInList(@Param('ambienteId') ambienteId: number, @Request() req) {
    const requestContaId = req.conta.id;
    const isAllowed = await this.ambienteService.existsInList(
      requestContaId,
      ambienteId,
    );

    return isAllowed;
  }
}

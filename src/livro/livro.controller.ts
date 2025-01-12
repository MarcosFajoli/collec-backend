import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LivroService } from './livro.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { AmbienteGuard } from 'src/ambiente/guards/ambiente.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UploadService } from 'src/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/upload/multer.config';

@Controller('livro')
export class LivroController {
  constructor(
    private readonly livroService: LivroService,
    private readonly uploadService: UploadService,
  ) {}

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post('/:ambienteId/:id/capa')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadCover(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = await this.uploadService.uploadFile(file, 'livros');
    const livro = await this.livroService.addPhoto(id, filePath);
    return { message: 'Capa do livro atualizada com sucesso!', livro };
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Post()
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livroService.create(createLivroDto);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('/:ambienteId')
  findAll(@Param('ambienteId') ambienteId: number) {
    return this.livroService.findAll(ambienteId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('/:ambienteId/:id')
  findOne(@Param('id') id: number) {
    return this.livroService.findOne(id);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Get('/categoria/:ambienteId/:categoriaId')
  findByCategoria(
    @Param('ambienteId') ambienteId: number,
    @Param('categoriaId') categoriaId: number,
  ) {
    return this.livroService.findByCategoria(ambienteId, categoriaId);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livroService.update(id, updateLivroDto);
  }

  @UseGuards(AuthGuard, AmbienteGuard)
  @Delete('/:ambienteId/:id')
  remove(@Param('id') id: number) {
    return this.livroService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/upload/multer.config';
import { UploadService } from 'src/upload/upload.service';

@Controller('conta')
export class ContaController {
  constructor(
    private readonly contaService: ContaService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  create(@Body() createContaDto: CreateContaDto) {
    return this.contaService.create(createContaDto);
  }

  @Post(':id/foto-perfil')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadProfilePhoto(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = await this.uploadService.uploadFile(file, 'perfil');
    const conta = await this.contaService.addPhoto(id, filePath);
    return { message: 'Foto de perfil atualizada com sucesso!', conta };
  }

  @Get()
  findAll() {
    return this.contaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contaService.update(+id, updateContaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contaService.remove(+id);
  }
}

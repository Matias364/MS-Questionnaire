import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDTO } from './dto/create-questionnaire.dto';
import { AuthGuard } from '../guard/auth.guard';
import { useContainer } from 'class-validator';

@UseGuards(AuthGuard)
@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post('CrearFomulario')
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDTO) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @Get('ObtenerNombreFormularios')
  findAllName() {
    return this.questionnaireService.findAllName();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(id);
  }

}

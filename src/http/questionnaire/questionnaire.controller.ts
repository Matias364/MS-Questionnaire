import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  // Crear un nuevo cuestionario
  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  // Obtener todos los cuestionarios
  @Get()
  findAll() {
    return this.questionnaireService.findAll();
  }

  // Obtener un cuestionario por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOne(id);
  }

}

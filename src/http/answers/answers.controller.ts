import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDTO } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post('guardarRespuesta')
  create(@Body() createAnswerDTO: CreateAnswerDTO) {
    return this.answersService.createAnswer(createAnswerDTO);
  }

  @Get('obtenerR/:userId')
  findAll(@Param('userId') userId: string) {
    return this.answersService.getAnswersByUser(userId);
  }

}

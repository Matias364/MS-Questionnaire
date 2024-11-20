import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Get('info/:userId')
  findAllInfo(@Param('userId') userId: string) {
    return this.answersService.getAnswersByUser(userId);
  }

  @Get('data/:userId')
  findAll(@Param('userId') userId: string) {
    return this.answersService.getAnswersByUserFull(userId);
  }

  @Get('idAnswer/:id')
  findOne(@Param('id') id: string) {
    return this.answersService.getAnswerById(id);
  }
  //Añadido metodo post para guardar imagenes
  @Post('uploadsImages')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Body() body: { image: string; answerId: string }) {
    const imageUrl = await this.answersService.processAndSaveImage(
      body.image,
      body.answerId,
    );
    return { imageUrl };
  }
}

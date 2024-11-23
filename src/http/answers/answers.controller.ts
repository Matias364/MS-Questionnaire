import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
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

//endpoint para subir imágenes
@Post('uploadsImages')
async uploadImages(@Body() body: { images: string[]; answerId: string }) {
	console.log('Imágenes recibidas en el backend:', body.images);
	if (!body.images || body.images.length === 0) {
		throw new BadRequestException('No se proporcionaron imágenes para subir.');
	}

	// Procesar todas las imágenes
	const imageUrls = await Promise.all(
		body.images.map((image) =>
			this.answersService.processAndSaveImage(image, body.answerId),
		),
	);

	return { imageUrls };

}
}

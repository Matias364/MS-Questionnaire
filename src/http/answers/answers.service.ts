import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDTO } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/schemas/answers.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
  ) {}

// Función para crear una respuesta en la base de datos
async createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<Answer> {
  const { questionnaireId, userId, name, data, sections } = createAnswerDTO;

  // Crear una nueva instancia del modelo Answer con el DTO
  const newAnswer = new this.answerModel({
    questionnaireId,
    userId,
    name,
    data,
    sections,
  });

  // Guardar la nueva respuesta en la base de datos
  return newAnswer.save();
}

// Función para obtener todas las respuestas de un usuario
async getAnswersByUser(userId: string): Promise<Answer[]> {
  return this.answerModel.find({ userId }).select('name').exec();
}

// Función para obtener todas las respuestas de un usuario
async getAnswersByUserFull(userId: string): Promise<Answer[]> {
  return this.answerModel.find({ userId }).exec(); 
}

//funcion para obtener respuesta por id
async getAnswerById(id: string): Promise<Answer> {
  const answer = await this.answerModel.findById(id).exec();
  if (!answer) {
    throw new NotFoundException(`Answer with ID ${id} not found`);
  }
  return answer;
}

}


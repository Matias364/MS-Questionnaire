import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/schemas/answers.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
  ) {}

  async create(createAnswerDto: { questionnaireId: string; userId: string; responses: string[] }): Promise<Answer> {
    const newAnswer = new this.answerModel(createAnswerDto);
    return newAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerModel.find().exec();
  }

  async findOne(id: string): Promise<Answer> {
    const answer = await this.answerModel.findById(id).exec();
    if (!answer) {
      throw new NotFoundException(`Respuesta ${id} no encontrada`);
    }
    return answer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const updatedAnswer = await this.answerModel.findByIdAndUpdate(id, updateAnswerDto, { new: true }).exec();
    if (!updatedAnswer) {
      throw new NotFoundException(`Respuesta ${id} no encontrada`);
    }
    return updatedAnswer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.answerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Answer with ID ${id} no encontrada`);
    }
  }
}
